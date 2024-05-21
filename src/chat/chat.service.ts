import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
  [id: string]: Socket;
}

interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  private connectedClients: ConnectedClients = {};
  private messages: Message[] = [];

  connectClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  disconnectClient(client: Socket) {
    delete this.connectedClients[client.id];
  }

  getOnlineChats() {
    const n = Object.keys(this.connectedClients).length;
    return n;
  }

  getOnlineIds() {
    return Object.keys(this.connectedClients);
  }

  insetMessage(message: Message) {
    this.messages.push(message);
    return this.messages;
  }

  getMessages() {
    return this.messages;
  }
}
