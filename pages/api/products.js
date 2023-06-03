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
      connection.query(
        "SELECT products.*, categories.name AS category_name FROM products inner JOIN categories ON products.category_id = categories.id",
        (error, results) => {
          if (error) {
            res.status(500).json({ message: "Error al obtener los productos" });
          } else {
            res.status(200).json(results);
          }
        }
      );
      break;
    case "POST":
      const { r_name, r_price, r_description, r_category_id } = req.body;

      const insertQuery =
        "INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)";
      connection.query(
        insertQuery,
        [r_name, r_price, r_description, r_category_id],
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
      const { id, name, price, description, category_id } = req.body;

      const updateQuery =
        "UPDATE products SET name = ?, price = ?, description = ?, category_id = ? WHERE id = ?";
      connection.query(
        updateQuery,
        [name, price, description, category_id, id],
        (error, result) => {
          if (error) {
            res.status(500).json({ message: "Error al modificar el producto" });
          } else {
            res
              .status(200)
              .json({ message: "Producto modificado exitosamente" });
          }
        }
      );
      break;

    case "DELETE":
      const productId = req.body.id; // Obtener el ID del producto de req.query.productId
      const deleteQuery = "DELETE FROM products WHERE id = ?";
      connection.query(deleteQuery, [productId], (error, result) => {
        if (error) {
          res.status(500).json({ message: "Error al eliminar el producto" });
        } else {
          res.status(200).json({ message: "Producto eliminado exitosamente" });
        }
      });
      break;

    default:
  }
}
