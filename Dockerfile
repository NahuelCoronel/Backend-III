# 1. Imagen base oficial de Node.js (versión LTS liviana en Alpine)
FROM node:20-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar manifiestos de dependencias
COPY package*.json ./

# 4. Instalar solo dependencias de producción para optimizar peso y seguridad
RUN npm ci --only=production

# 5. Copiar el resto del código fuente del proyecto
COPY . .

# 6. Crear directorios para subida de archivos y logs si no existen
RUN mkdir -p uploads/documents uploads/receipts logs

# 7. Exponer el puerto configurado por defecto (8080)
EXPOSE 8080

# 8. Comando de inicio de la aplicación
CMD ["npm", "start"]
