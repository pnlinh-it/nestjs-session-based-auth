import { Injectable } from '@nestjs/common';
import { User } from './User';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUser(id: number): User {
    return { id: id, name: 'Linh', email: 'linh@gmail.com', age: 30 };
  }
}
