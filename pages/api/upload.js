import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./"; //carpeta temporal donde se almacenarán los archivos
  form.keepExtensions = true; //mantén las extensiones de archivo originales

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const oldpath = files.file.path;
    console.log(files);
    const newpath = path.join(process.cwd(), "/public", files.file.name);

    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.status(200).json({ message: "File uploaded successfully" });
    });
  });
}
