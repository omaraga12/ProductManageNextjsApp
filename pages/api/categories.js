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
    case "GET":
      connection.query("SELECT * FROM categories", (error, results) => {
        if (error) {
          res.status(500).json({ message: "Error al obtener los categories" });
        } else {
          res.status(200).json(results);
        }
      });
      break;
    case "POST":
      const { r_name, r_description } = req.body;
      console.log(r_name);
      const insertQuery =
        "INSERT INTO categories (name, description) VALUES (?, ?)";
      connection.query(
        insertQuery,
        [r_name, r_description],
        (error, result) => {
          if (error) {
            res.status(500).json({ message: "Error al registrar el producto" });
          } else {
            res
              .status(200)
              .json({ message: "Producto registrado exitosamente" });
          }
        }
      );
      break;
    case "PUT":
      const { id, name, description } = req.body;

      const updateQuery =
        "UPDATE categories SET name = ?, description = ? WHERE id = ?";
      connection.query(
        updateQuery,
        [name, description, id],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error al modificar el producto" });
          } else {
            res
              .status(200)
              .json({ message: "Producto modificado exitosamente" });
          }
        }
      );
      break;

    // case "DELETE":
    //   const { id } = req.body;
    //   console.log(id);
    //   const deleteQuery = "DELETE FROM categories WHERE id = ?";
    //   connection.query(deleteQuery, [id], (error, result) => {
    //     if (error) {
    //       res.status(500).json({ message: "Error al eliminar el producto" });
    //     } else {
    //       res.status(200).json({ message: "Producto eliminado exitosamente" });
    //     }
    //   });
    //   break;

    default:
  }
}
