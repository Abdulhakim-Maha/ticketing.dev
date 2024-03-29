import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser'
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/singout'
import { signupRouter } from './routes/signup'
import { errorHandler, NotFoundError } from '@xdticket/common'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false, // diable encryped
    secure: process.env.NODE_ENV !== 'test'   // using https
  })
)


app.use(currentUserRouter);
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)


export { app };
