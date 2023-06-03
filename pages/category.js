import { useState, useEffect } from "react";
import ModalCategory from "./componentes/modalCategory";
import Navbar_main from "./componentes/menu";
import { useRouter } from "next/router";
const ITEMS_PER_PAGE = 8;
const CategoryPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  var currentProducts = categories.slice(start, end);
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const [modalIsOpen, setmodalIsOpen] = useState(false);

  useEffect(() => {
    // Lógica para obtener la lista de productos desde la API y establecerlos en el estado
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDeleteProduct = (productId) => {
    // Lógica para eliminar un producto utilizando la API
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta Categoria?"
    );

    if (confirmDelete) {
      console.log(productId);

      fetch(`/api/categoriesd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          id: productId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Verificar si la eliminación fue exitosa y actualizar la lista de productos
          if (data.message === "Producto eliminado exitosamente") {
            setCategories(
              categories.filter((category) => category.id !== productId)
            );
          } else {
            alert(
              "La categoria seleccionada esta vinculada a un producto por lo que no se puede eliminar"
            );
          }
        });
    }
  };

  const handleUpdateProduct = (id) => {
    // Lógica para actualizar un producto utilizando la API
    console.log(currentProduct);
    console.log(JSON.stringify(currentProduct));
    fetch(`/api/categories/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(currentProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la modificación fue exitosa y actualizar el producto en la lista
        if (data.message === "Producto modificado exitosamente") {
          router.reload();

          setIsEditing(false);
          setCurrentProduct(null);
        }
      });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      fetch("/api/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
    } else {
      const filtered = categories.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCategories(filtered);
      currentProducts = categories;
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <ModalCategory
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setmodalIsOpen}
        products={categories}
        setProducts={setCategories}
      />
      <Navbar_main />{" "}
      <div className="justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">CATEGORIAS</h1>
      </div>
      <div className="flex flex-col md:flex-row mb-4 justify-center items-center">
        <input
          type="text"
          placeholder="Buscar categoria"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 mb-2 md:mb-0 md:mr-2 w-full md:w-64"
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          className="bg-blue-500 text-white rounded px-4 py-1"
        >
          Buscar
        </button>
      </div>
      <div className="p-3">
        <button
          onClick={() => setmodalIsOpen(true)}
          className="bg-blue-600 text-white rounded px-2 py-1"
        >
          REGISTRAR NUEVA CATEGORIA
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Fecha de Creacion</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                {isEditing && currentProduct.id === product.id ? (
                  <>
                    <td className="py-2 px-4 border-b">
                      <input
                        defaultValue={product.name}
                        className="block w-full border-gray-700 rounded-lg px-4 py-2  bg-blue-100"
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        defaultValue={product.description}
                        className="block w-full border-gray-700 rounded-lg px-4 py-2  bg-blue-100"
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.created_at}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleUpdateProduct(product.id)}
                        className="bg-green-500 text-white rounded px-2 py-1"
                      >
                        Guardar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">
                      {product.description}
                    </td>
                    <td className="py-2 px-4 border-b">{product.created_at}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white rounded px-2 py-1"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination flex justify-center space-x-4 mt-4 pb-5">
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={currentPage === 0}
          >
            Anterior
          </button>
          <button
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages - 1))
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={currentPage >= totalPages - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
