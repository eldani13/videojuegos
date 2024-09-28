import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import about from '../img/about.webp';
import daniel from '../img/person.jpg';

function About() {
  return (
    <div className="bg-gray-100">
      <Header />

      <section className="bg-cover bg-center h-screen relative" style={{ backgroundImage: `url(${about})` }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-60 px-4 animate-fade-in">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold animate-slide-up">Sobre Nosotros</h1>
            <p className="text-lg md:text-xl max-w-lg mx-auto animate-slide-up-delay">
              Bienvenido a nuestra tienda de videojuegos. Nos dedicamos a brindarte las mejores experiencias en entretenimiento digital.
            </p>
            <a href="#team" className="mt-6 inline-block bg-red-600 px-4 md:px-6 py-3 text-base md:text-lg font-bold text-white rounded-lg hover:bg-red-700 transition-all">
              Conócenos
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white animate-fade-in-on-scroll">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Nuestra Misión</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Nos esforzamos por ofrecer una amplia selección de videojuegos para todas las edades y gustos. Nuestro compromiso es con la calidad, la innovación y la satisfacción del cliente.
          </p>
        </div>
      </section>

      <section id="team" className="py-12 md:py-16 bg-gray-50 animate-fade-in-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Conoce a Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              <img src={daniel} alt="CEO" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4" style={{
                objectFit: 'cover',
                objectPosition: 'top',
              }}/>
              <h3 className="text-lg md:text-xl font-bold text-gray-700">Jean Pier</h3>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              <img src={daniel} alt="Team" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4" 
              style={{
                objectFit: 'cover',
                objectPosition: 'top',
              }}/>
              <h3 className="text-lg md:text-xl font-bold text-gray-700">Luis Cantillo</h3>
              <p className="text-gray-600">FRONT - BACK</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
              <img src={daniel} alt="Team" className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full mb-4" 
              style={{
                objectFit: 'cover',
                objectPosition: 'top',
              }}/>
              <h3 className="text-lg md:text-xl font-bold text-gray-700">Emily Machuca</h3>
              <p className="text-gray-600">FRONT</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
