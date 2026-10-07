import dotenv from 'dotenv';

dotenv.config();

// 1. Validamos las variables obligatorias
const requiredEnvs = ['MONGODB_URI', 'PORT', 'NODE_ENV'];

requiredEnvs.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Falta la variable de entorno obligatoria: ${envVar}`);
  }
});

// 2. Validamos que el puerto sea numérico
const portNumber = Number(process.env.PORT);
if (isNaN(portNumber)) {
  throw new Error('La variable de entorno PORT debe ser un número válido');
}

// 3. Exportamos la configuración
const config = {
  port: portNumber,
  mongodbUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET || null,
};

export default config;
