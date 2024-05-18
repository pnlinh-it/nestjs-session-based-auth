import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyType } from './StrategyType';

@Injectable()
export class LocalGuard extends AuthGuard(StrategyType.Local) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    /**
     * @see ./node_modules/@nestjs/passport/dist/auth.guard.js#logIn
     * @see ./node_modules/passport/lib/http/request.js#logIn
     */
    await this.loginUser(context);

    return result;
  }

  private async loginUser(context: ExecutionContext) {
    await super.logIn(context.switchToHttp().getRequest());
  }
}
