import mysql from "mysql";

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "examen2",
});

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { id } = req.body;
      console.log(id);

      const insertQuery = "delete from categories where id= ?";
      connection.query(insertQuery, [id], (error, result) => {
        if (error) {
          console.log(error);
          console.log(error.message);
          res.status(500).json({ message: "Error al eliminar el producto" });
        } else {
          res.status(200).json({ message: "Producto eliminado exitosamente" });
        }
      });
      break;

    default:
  }
}
