import React from "react";
import playstation from '../img/playstation.webp'
import playstationIcon  from '../assets/playstation.svg'
import xbox from '../img/xbox.webp'
import xboxIcon from '../assets/xbox.svg'
import nintendo from '../img/nintendo.webp'
import nintendoIcon from '../assets/nintendo.svg'

import '../styles/buy.css'

function Buy() {
  const categories = [
  {
    id: 1,
    title: "PlayStation",
    description: (
      <span className="">
        Juegos y suscripciones de PlayStation ﾠ<img src={playstationIcon} alt="PlayStation Logo" className="inline w-6 h-6" />
      </span>
    ),
    image: playstation,
  },
    {
      id: 2,
      title: "Xbox",
      description: (
        <span>
            Juegos y suscripciones de Xbox ﾠ<img src={xboxIcon} alt="Xbox Logo" className="inline w-6 h-6" />
        </span>
      ),
      image: xbox, 
    },                              
    {
      id: 3,
      title: "Nintendo",
      description: (
        <span>
            Juegos y suscripciones de Nintendo ﾠ<img src={nintendoIcon} alt="Nintengo Logo" className="inline w-6 h-6" />
        </span>
      ),
      image: nintendo, 
    },
  ];

  return (
    <div className="text-center py-8">
      <h1 className="title text-4xl font-semibold uppercase text-black">
        Compra tus juegos digitales de <span className="text-[#f7002f]">forma segura y al mejor precio</span> 
      </h1>
      <p className="text-gray-500 mt-2">
        Obtén una experiencia de compra confiable y de calidad en  <span className="text-[#f7002f]">DIGITAL GAMES</span>. Tu destino para los mejores juegos digitales.
      </p>

      <div className="flex flex-wrap justify-center mt-10 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative w-80 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-[#f7002f]">
              <h3 className="text-lg font-semibold text-white uppercase">
                {category.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buy;
