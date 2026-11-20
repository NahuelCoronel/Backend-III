import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import config from '../src/config/env.config.js';

before(async function () {
  this.timeout(15000);
  
  // Leemos MONGODB_URI_TEST desde process.env o el objeto config
  const testDbUrl = process.env.MONGODB_URI_TEST || config?.mongoUrlTest || config?.mongoUrl;
  
  if (!testDbUrl) {
    throw new Error('No se encontró la variable MONGODB_URI_TEST en el archivo .env');
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(testDbUrl);
  }
});

afterEach(async function () {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

after(async function () {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
