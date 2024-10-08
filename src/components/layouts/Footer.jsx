import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
import Logo from "../../img/logo.png";
import "../../styles/footer.css";

export default function Footeer() {
  return (
    <Footer bgDark>
      <div className="main w-full bg-[#f7002f]">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-5">
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
          <div className="flex flex-col">
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

          <div className="w-full">
            <h2 className="font-semibold text-black mb-2">UBICACION</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157412.8284305135!2d-76.1221598293124!3d4.570868331598196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e43f1bdf1a2c21f%3A0x12345abcde!2sColombia!5e0!3m2!1ses!2sus!4v1638390405723!5m2!1ses!2sus"
              width="100%"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
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
