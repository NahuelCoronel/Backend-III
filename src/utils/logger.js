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

// Formato base para consola
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
  )
);

// Formato limpio para archivos (sin códigos de colores ANSI)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.json()
);

const isProduction = config.nodeEnv === "production";

// 2. Definición del logger según entorno
export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: isProduction
    ? [
        // Producción: consola desde info
        new winston.transports.Console({
          level: "info",
          format: consoleFormat,
        }),
        // Producción: archivo rotativo solo para error y fatal
        new winston.transports.DailyRotateFile({
          level: "error",
          dirname: "logs",
          filename: "errors-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
          maxSize: "20m",
          format: fileFormat,
        }),
      ]
    : [
        // Desarrollo: consola desde debug (todo)
        new winston.transports.Console({
          level: "debug",
          format: consoleFormat,
        }),
      ],
});
