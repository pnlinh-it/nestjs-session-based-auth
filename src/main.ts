import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
// import * as SessionFileStore from 'session-file-store';
// import * as passport from 'passport';

// const FileStore = SessionFileStore(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://github.com/valery-barysok/session-file-store
  // app.use(
  //   // This will return an expressjs middleware
  //   // It will obtain session id from request, decrypt and encrypt it
  //   session({
  //     name: 'connect.sid',
  //     store: new FileStore({
  //       fileExtension: '.json',
  //     }),
  //     saveUninitialized: false,
  //     secret: 'sup3rs3cr3t',
  //     resave: false,
  //     cookie: {
  //       sameSite: true,
  //       httpOnly: true,
  //       maxAge: 60000,
  //     },
  //   }),
  //
  //   // A middleware that register passport session manager
  //   passport.initialize(),
  //
  //   // A middleware that get user from session id
  //   // If user is existed assign that user to request
  //   // Later we can check user is login or not by check request.user
  //   // See LoggedInGuard
  //   passport.session(),
  // );

  await app.listen(3000);
}
bootstrap();
