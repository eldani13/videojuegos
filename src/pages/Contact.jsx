import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import contact from "../img/contact.webp";
import help from "../img/help.webp";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />

      <section
        className="bg-cover bg-center h-screen relative"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: "cover",
        }}
        data-aos="fade-in" 
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50 px-4">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Contáctanos</h1>
            <p className="text-lg md:text-xl max-w-lg mx-auto">
              Estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas
              asistencia, no dudes en ponerte en contacto con nosotros.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto text-center px-4" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg space-x-4" data-aos="zoom-in">
              <FaPhoneAlt className="text-3xl md:text-4xl text-red-500" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700">Teléfono</h3>
                <p className="text-gray-600 text-sm md:text-lg">+57 311 2928194</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg space-x-4" data-aos="zoom-in">
              <FaEnvelope className="text-3xl md:text-4xl text-red-500" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700">Email</h3>
                <p className="text-gray-600 text-sm md:text-lg">soporte@digitalgames.com</p>
              </div>
            </div>
            <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg space-x-4" data-aos="zoom-in">
              <FaMapMarkerAlt className="text-3xl md:text-4xl text-red-500" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700">Dirección</h3>
                <p className="text-gray-600 text-sm md:text-lg">Barranquilla, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="mx-auto px-4" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Envía un Mensaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-semibold mb-2">Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-semibold mb-2">Mensaje</label>
                  <textarea
                    placeholder="Escribe tu mensaje"
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            <div className="relative flex text-center flex-col justify-center bg-white p-6 md:p-8 shadow-lg rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${help})`,
                  opacity: "0.8",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-80"></div>
              </div>
              <h3 className="relative text-2xl font-bold text-white mb-4" data-aos="fade-up">¿Necesitas ayuda inmediata?</h3>
              <p className="relative text-gray-300 mb-4 text-justify" data-aos="fade-up">
                Nuestro equipo está disponible para resolver tus dudas y ofrecerte la asistencia que necesites.
              </p>
              <p className="relative text-gray-300 mb-4 text-justify" data-aos="fade-up">
                Contáctanos a través de los medios que hemos proporcionado.
              </p>
              <p className="relative text-gray-300 mb-4 text-justify" data-aos="fade-up">
                Entendemos que a veces las situaciones pueden ser urgentes, así que no dudes en comunicarte con nosotros para obtener una respuesta rápida.
              </p>
              <p className="relative text-gray-300 mb-4 text-justify" data-aos="fade-up">
                Ya sea que necesites información sobre nuestros productos, asistencia técnica, o simplemente tengas alguna consulta, estamos aquí para ayudarte.
              </p>
              <p className="relative text-gray-300 mb-4 text-justify" data-aos="fade-up">
                Nuestro compromiso es brindarte un servicio excepcional, así que tu satisfacción es nuestra prioridad. Recuerda que cada pregunta es importante para nosotros.
              </p>
              <p className="relative text-gray-300 font-semibold" data-aos="fade-up">
                ¡Esperamos saber de ti pronto!
              </p>

              <a
                href="https://wa.me/573112928194"
                className="relative mt-4 inline-flex items-center justify-center bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="mr-2" />
                Chat en WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
