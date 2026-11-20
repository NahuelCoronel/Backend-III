import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegurar que las carpetas de destino existan
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/users';

    // Si la ruta o petición corresponde a comprobantes de entrega
    if (req.originalUrl.includes('deliveries') || req.originalUrl.includes('orders')) {
      folder = 'uploads/deliveries';
    }

    ensureDirectoryExists(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp-random-nombreLimpio
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const cleanOriginalName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${uniqueSuffix}-${cleanOriginalName}`);
  }
});

// Filtro de tipos de archivo permitidos (PDF, JPG, JPEG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Adjuntamos un flag o error para que el controlador/middleware lo gestione
    cb(new Error('INVALID_FILE_TYPE'), false);
  }
};

export const uploader = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5 MB
  }
});
