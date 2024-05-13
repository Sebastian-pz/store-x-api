import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (errors, bool) => void
) => {
  if (!file) return cb(null, false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'webp'];

  if (!validExtensions.includes(fileExtension)) return cb(null, false);

  cb(null, true);
};
