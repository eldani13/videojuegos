import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../img/logo.png";
import CartModal from "../CartModal";
import { BiSearch } from "react-icons/bi";
import { BsInstagram, BsFacebook, BsCart, BsPerson } from "react-icons/bs";
import GameResults from "../GamesResults";

const menuItems = [
  { name: "Inicio", url: "/" },
  { name: "Juegos", url: "/Games" },
  { name: "Nosotros", url: "/About" },
  { name: "Contacto", url: "/Contact" },
];

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = () => window.innerWidth < 768;


  useEffect(() => {
    AOS.init();
    const fetchGames = async () => {
      try {
        const response = await fetch("https://backend-videojuegos.onrender.com//api/products/");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchGames();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/Search?q=${searchTerm}`);
    }
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="bg-[#f7002f] shadow-lg">
        <section className="mx-auto p-4 flex items-center justify-between">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-white hover:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a href="/">
              <img src={logo} alt="Logo" className="w-16" />
            </a>
          </div>

          <div className="hidden md:flex md:w-1/3">
            <div className="relative w-full">
              <BiSearch className="absolute top-2 left-3 text-gray-500 w-6 h-6" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex gap-5">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    onClick={() => isMobile() && toggleMenu()}
                    className={`block text-lg font-semibold ${
                      pathname === item.url ? "text-white" : "text-black"
                    } hover:text-white`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex justify-around p-4 gap-6">
            <a
              href="https://www.instagram.com/digital__games___?igsh=Z21hY2JsemZhZHA4&utm_source=qr"
              aria-label="Instagram"
            >
              <BsInstagram className="text-white hover:text-black w-7 h-7" />
            </a>

            <a
              href="https://www.facebook.com/share/Vsro3jkyHZsnsRLx/?mibextid=LQQJ4d"
              aria-label="Facebook"
            >
              <BsFacebook className="text-white hover:text-black w-7 h-7" />
            </a>

            <a href="/login" aria-label="Login">
              <BsPerson className="text-white hover:text-black w-7 h-7" />
            </a>

            <button onClick={toggleCart} aria-label="Carrito de compras">
              <BsCart className="text-white hover:text-black w-7 h-7" />
            </button>
            <CartModal isOpen={isCartOpen} onClose={toggleCart} />
          </div>
        </section>

        <div
          className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 focus:outline-none text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="mt-16">
            <ul className="space-y-6 p-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    onClick={toggleMenu}
                    className={`block text-lg font-semibold ${
                      pathname === item.url ? "text-red-600" : "text-gray-800"
                    } hover:text-red-600`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4">
            <div className="relative w-full">
              <BiSearch className="absolute top-2 left-3 text-gray-500 w-6 h-6" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="flex justify-around mt-8">
            <a
              href="https://www.instagram.com/digital__games___?igsh=Z21hY2JsemZhZHA4&utm_source=qr"
              aria-label="Instagram"
            >
              <BsInstagram className="text-gray-800 hover:text-gray-600 w-7 h-7" />
            </a>

            <a
              href="https://www.facebook.com/share/Vsro3jkyHZsnsRLx/?mibextid=LQQJ4d"
              aria-label="Facebook"
            >
              <BsFacebook className="text-gray-800 hover:text-gray-600 w-7 h-7" />
            </a>

            <a href="/login" aria-label="Login">
              <BsPerson className="text-gray-800 hover:text-gray-600 w-7 h-7" />
            </a>

            <button onClick={toggleCart} aria-label="Carrito de compras">
              <BsCart className="text-gray-800 hover:text-gray-600 w-7 h-7" />
            </button>
            <CartModal isOpen={isCartOpen} onClose={toggleCart} />
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          />
        )}
      </header>

      {/* {searchTerm && <GameResults games={filteredGames} />} */}
    </>
  );
}

export default Header;
