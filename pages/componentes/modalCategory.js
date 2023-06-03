import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";

const ModalCategory = ({
  modalIsOpen,
  setModalIsOpen,
  products,
  setProducts,
}) => {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario al padre
    //onSubmit({ name, price, description, categoryId, images });
    fetch(`/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //r_name, r_price, r_description, r_category_id
      body: JSON.stringify({
        r_name: name,

        r_description: description,
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

    setDescription("");
  };

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
          width: 300,
          height: "70%",

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
          <h2 className="text-2xl font-bold mb-4">Registrar Categoria</h2>
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

export default ModalCategory;
