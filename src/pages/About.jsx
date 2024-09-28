import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

function About() {
  return (
    <div className="bg-gray-100">
      <Header />

      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/path/to/your-image.jpg)' }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white space-y-4">
            <h1 className="text-5xl font-bold">Sobre Nosotros</h1>
            <p className="text-xl max-w-xl mx-auto">
              Bienvenido a nuestra tienda de videojuegos. Nos dedicamos a brindarte las mejores experiencias en entretenimiento digital.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Nuestra Misión</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos esforzamos por ofrecer una amplia selección de videojuegos para todas las edades y gustos. Nuestro compromiso es con la calidad, la innovación y la satisfacción del cliente.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Conoce a Nuestro Equipo</h2>
          <div className="flex flex-wrap justify-center space-x-8">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <img src="/path/to/image1.jpg" alt="Team member" className="w-32 h-32 mx-auto rounded-full mb-4"/>
              <h3 className="text-xl font-bold text-gray-700">Nombre 1</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <img src="/path/to/image2.jpg" alt="Team member" className="w-32 h-32 mx-auto rounded-full mb-4"/>
              <h3 className="text-xl font-bold text-gray-700">Nombre 2</h3>
              <p className="text-gray-600">Diseñador</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
