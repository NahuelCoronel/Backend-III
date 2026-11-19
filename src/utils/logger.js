import winston from "winston";
import "winston-daily-rotate-file";
import config from "../config/env.config.js";

// 1. Niveles personalizados según la consigna
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red bold",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "magenta",
    debug: "white",
  },
};

winston.addColors(customLevels.colors);

// Formato base para consola con colores
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
  )
);

// Formato limpio para archivos (JSON sin códigos ANSI de color)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json()
);

const isProduction = config.nodeEnv === "production";

// 2. Definición del logger:
// - Consola: 'info' en producción, 'debug' en desarrollo.
// - Archivo rotativo: activo en AMBOS entornos para registrar siempre 'error' y 'fatal'.
export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: isProduction ? "info" : "debug",
      format: consoleFormat,
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      dirname: "logs",
      filename: "errors-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      maxSize: "20m",
      format: fileFormat,
    }),
  ],
});
