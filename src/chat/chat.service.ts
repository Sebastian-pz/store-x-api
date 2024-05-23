import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

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

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async connectClient(client: Socket, userId: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new UnauthorizedException('Invalid request');
      if (!user.isActive) throw new UnauthorizedException('Invalid request');

      this.connectedClients[user.fullName] = client;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
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
