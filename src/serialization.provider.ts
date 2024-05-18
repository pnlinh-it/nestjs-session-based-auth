import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from './User';
import { AppService } from './app.service';

interface UserPayload {
  id: number;
  name: string;
}
@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly appService: AppService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: UserPayload) => void) {
    done(null, { id: user.id, name: user.name });
  }

  deserializeUser(
    payload: UserPayload,
    done: (err: Error, user: User) => void,
  ) {
    const user = this.appService.getUser(payload.id);
    done(null, user);
  }
}
