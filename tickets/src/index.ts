import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be provide')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be provide')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to mongodb');

  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000 !!!');

  })
}

start();

