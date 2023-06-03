import { useState, useEffect } from "react";
import ProductModal from "./componentes/modalProduct";
import Navbar_main from "./componentes/menu";
import { useRouter } from "next/router";
import Image from "next/image";
// Componente de producto individual
const ITEMS_PER_PAGE = 9;
// Paginación

// Página de productos
const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  var currentProducts = products.slice(start, end);

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  useEffect(() => {
    // Lógica para obtener la lista de productos desde la API y establecerlos en el estado
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = (productId) => {
    // Lógica para eliminar un producto utilizando la API
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (confirmDelete) {
      console.log(productId);

      fetch(`/api/productsd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Verificar si la eliminación fue exitosa y actualizar la lista de productos
          if (data.message === "Producto eliminado exitosamente") {
            setProducts(products.filter((product) => product.id !== productId));
          }
        });
    }
  };

  const handleUpdateProduct = (id) => {
    // Lógica para actualizar un producto utilizando la API
    console.log(currentProduct);
    console.log(JSON.stringify(currentProduct));
    fetch(`/api/products/`, {
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
      fetch("/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
      currentProducts = products;
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <ProductModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setmodalIsOpen}
        products={products}
        setProducts={setProducts}
      />
      <Navbar_main />
      <div className="justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">PRODUCTOS</h1>
      </div>
      <div className="flex flex-col md:flex-row mb-4 justify-center items-center">
        <input
          type="text"
          placeholder="Buscar producto"
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
          REGISTRAR NUEVO PRODUCTO
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Imagenes</th>
              <th className="py-2 px-4 border-b">Categoria</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Fecha de Creacion</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                {isEditing && currentProduct.id === product.id ? (
                  <>
                    <td className="flex justify-between">
                      <Image src="/abarrotes.webp" width={100} height={100} />
                      <Image src="/images2.png" width={100} height={100} />
                      <Image src="/images.gif" width={100} height={100} />
                    </td>
                    <td className="py-2 px-4 border-b">
                      {/* <input
                      className="block w-full border-gray-700 rounded-lg px-4 py-2  bg-blue-100"
                        defaultValue={product.category_name}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            category_name: e.target.value,
                          })
                        }
                      /> */}
                      {product.category_name}
                    </td>
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
                        defaultValue={product.price}
                        className="block w-full border-gray-700 rounded-lg px-4 py-2  bg-blue-100"
                        type="number"
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            price: e.target.value,
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
                    <td className="flex justify-between">
                      <Image src="/abarrotes.webp" width={100} height={100} />
                      <Image src="/images2.png" width={100} height={100} />
                      <Image src="/images.gif" width={100} height={100} />
                    </td>
                    <td className="py-2 px-4 border-b">
                      {product.category_name}
                    </td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">S/ {product.price}</td>
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

export default ProductsPage;
