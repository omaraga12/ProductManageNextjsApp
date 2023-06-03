import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: "./public/images", // Carpeta donde se guardarán las imágenes
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split(".").pop();
    cb(null, `${uniqueSuffix}.${extension}`);
  },
});

// Middleware de multer para manejar el almacenamiento de imágenes
const upload = multer({ storage }).single("image");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: "Error al subir la imagen" });
      } else {
        const imageUrl = `/images/${req.file.filename}`;
        res.status(200).json({ imageUrl });
      }
    });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
