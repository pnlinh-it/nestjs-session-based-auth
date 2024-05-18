import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    /**
     * @see ./node_modules/passport/lib/http/request.js#isAuthenticated
     */
    return context.switchToHttp().getRequest().isAuthenticated();
  }
}
