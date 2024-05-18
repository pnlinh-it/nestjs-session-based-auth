import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { StrategyType } from './StrategyType';
import { AppService } from './app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  StrategyType.Local,
) {
  constructor(private readonly appService: AppService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    console.log({ email, password });
    return this.appService.getUser(1);
  }
}
