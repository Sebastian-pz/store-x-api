import { Request } from 'express';

export const fileNamer = (
  req: Request,
  file: Express.Multer.File,
  cb: (errors, fileName: string) => void
) => {
  const fileName = `${file.originalname}`;
  return cb(null, fileName);
};
