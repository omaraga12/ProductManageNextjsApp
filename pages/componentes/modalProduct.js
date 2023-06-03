import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";

const ProductModal = ({
  modalIsOpen,
  setModalIsOpen,
  products,
  setProducts,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  // const [closeModal, setCloseModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setPreviewImage([]);
    setPreviewImages([]);
  };
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al padre
    //onSubmit({ name, price, description, categoryId, images });
    fetch(`/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //r_name, r_price, r_description, r_category_id
      body: JSON.stringify({
        r_name: name,
        r_price: price,
        r_description: description,
        r_category_id: categoryId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Verificar si la eliminación fue exitosa y actualizar la lista de productos
        if (data.message === "Producto registrado exitosamente") {
          // Guardar las imágenes en la carpeta public/images

          router.reload();
        }
      });
    // Restablecer los campos del formulario
    setName("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setImages([]);
  };
  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);

    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewURLs);
    console.log(previewImages);
  };
  const handleMainImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);

    const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImage(previewURLs);
  };
  useEffect(() => {
    // Lógica para obtener la lista de productos desde la API y establecerlos en el estado
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <Modal
      isOpen={modalIsOpen}
      //onRequestClose={closeModal}
      contentLabel="Mi Modal"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: "4px",
          width: 400,
          height: "90%",

          padding: "20px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center ">
        <div className="bg-white rounded-lg shadow-lg p-8  mt-20">
          <button
            className="text-gray-500 hover:text-gray-700 m-5"
            onClick={handleCloseModal}
          >
            X CERRAR
          </button>
          <h2 className="text-2xl font-bold mb-4">Registrar Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-medium mb-1">
                Precio
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1">
                Categoría
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              >
                {/* <option value="">Seleccione una categoría</option> */}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-medium mb-1">
                Imágen Principal
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleMainImageUpload}
                className="mt-1"
                required
              />
              {/* Vista previa de las imágenes */}
              {previewImage.length > 0 && (
                <div className="mt-2 flex">
                  {previewImage.map((previewURL) => (
                    <img
                      key={previewURL}
                      src={previewURL}
                      alt="Vista previa de la imagen"
                      className="w-16 h-16 object-cover mr-2"
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Campo de carga de imágenes */}
            <div className="mb-4">
              <label htmlFor="images" className="block font-medium mb-1">
                Imágenes
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageUpload}
                className="mt-1"
              />
              {/* Vista previa de las imágenes */}
              {previewImages.length > 0 && (
                <div className="mt-2 flex">
                  {previewImages.map((previewURL) => (
                    <img
                      key={previewURL}
                      src={previewURL}
                      alt="Vista previa de la imagen"
                      className="w-16 h-16 object-cover mr-2"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 font-medium"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
