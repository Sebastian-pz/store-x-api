import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {
    // Getting custom info from connection -> Client.handshake.{}
    const { authentication } = client.handshake.headers;
    console.log(authentication);

    this.chatService.connectClient(client);

    this.wss.emit('clients-online', this.chatService.getOnlineIds());
  }
  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected ${client.id}`);
    this.chatService.disconnectClient(client);
    this.wss.emit('clients-online', this.chatService.getOnlineIds());
  }

  @SubscribeMessage('client-message')
  handleClientMessage(client: Socket, payload: string | any) {
    // Maybe save in db

    this.chatService.insetMessage({ author: client.id, message: payload });

    // Only to the client who sent the initial event
    // client.emit('server-message', () => this.chatService.getMessages());

    // Emit events to other clients
    // client.broadcast.emit('server-message', () =>
    //   this.chatService.getMessages()
    // );

    // Emit events to everyone
    this.wss.emit('server-message', this.chatService.getMessages());
  }
}
