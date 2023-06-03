import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import { useState } from "react";

import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState({
    identifier: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    router.push("/category");
  };
  return (
    <>
      <Head>
        <title>Ingresa a la Plataforma</title>
      </Head>

      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <div className=" md:w-1/2 ">
          <div className=" flex items-center justify-end p-5 ">
            <Image
              src="/loguin.webp"
              alt="Imagen 4"
              width={600}
              height={600}
              priority={true}
              // className="w-full object-contain md:object-cover"
            />
          </div>
        </div>
        <div className=" md:w-1/2 pb-3">
          <div className="max-w-md w-full  mx-auto p-8 bg-white shadow-lg rounded-lg  ">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">PLATAFORMA</h1>
              <p className="text-gray-700">INICIAR SESIÓN</p>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
            <div className="mb-4">
              <label
                htmlFor="identifier"
                className="block mb-2 text-gray-800 font-bold"
              >
                CORREO ELECTRÓNICO:
              </label>
              <input
                name="identifier"
                id="identifier"
                onChange={handleChange}
                className="block w-full border-gray-700 rounded-lg px-4 py-2  bg-blue-100"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-gray-800 font-bold"
              >
                CONTRASEÑA:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                className="block w-full border-gray-700 rounded-lg px-4 py-2 bg-blue-100"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  INGRESAR
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-700">Olvidé mi contraseña</p>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
