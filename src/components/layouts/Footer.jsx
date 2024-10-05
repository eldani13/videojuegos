"use client";

import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

import Logo from "../../img/logo.png";

export default function Footeer() {
  return (
    <Footer bgDark>
      <div className="main w-full bg-[#f7002f]">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Compañia" className="text-black font-bold" />
            <Footer.LinkGroup col>
              <Footer.Link href="/About" className="text-white">
                Sobre nosotros
              </Footer.Link>
              <a href="/">
                <img src={Logo} alt="Logo" className="w-20" />
              </a>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Apoyo" className="text-black font-bold" />
            <Footer.LinkGroup col>
              <Footer.Link href="/Contact" className="text-white">
                Centro de ayuda
              </Footer.Link>
              <Footer.Link href="/Terms" className="text-white">
                Términos de servicio
              </Footer.Link>
              <Footer.Link href="/Privacy" className="text-white">
                Política de privacidad
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Contacto" className="text-black font-bold" />
            <Footer.LinkGroup col>
              <Footer.Link href="/Contact" className="text-white">
                Contacta con nosotros
              </Footer.Link>
              <Footer.Link href="/Contact" className="text-white">
                Chat de soporte
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Siguenos" className="text-black font-bold" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.facebook.com/share/Vsro3jkyHZsnsRLx/?mibextid=LQQJ4d"
                className="text-white"
              >
                Facebook
              </Footer.Link>
              <Footer.Link
                href="https://www.instagram.com/digital__games___?igsh=Z21hY2JsemZhZHA4&utm_source=qr"
                className="text-white"
              >
                Instagram
              </Footer.Link>
              <Footer.Link
                href="https://github.com/eldani13"
                className="text-white"
              >
                GitHub
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-[#f5d8dd] px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="/"
            by=" DigitalGames™"
            year={2024}
            className="text-black"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/share/Vsro3jkyHZsnsRLx/?mibextid=LQQJ4d"
              icon={BsFacebook}
              className="text-[#f7002f] hover:text-black"
            />
            <Footer.Icon
              href="https://www.instagram.com/digital__games___?igsh=Z21hY2JsemZhZHA4&utm_source=qr"
              icon={BsInstagram}
              className="text-[#f7002f] hover:text-black"
            />
            <Footer.Icon
              href="https://github.com/eldani13"
              icon={BsGithub}
              className="text-[#f7002f] hover:text-black"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
