import React from "react";
import Header from "../components/layouts/Header";
import Footeer from "../components/layouts/Footer";

function Terms() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Términos y Condiciones</h1>
                    <p className="text-gray-600 mb-4">
                        Bienvenido a <span className="font-semibold text-black">DigitalGames™</span>. Al utilizar nuestro sitio web y adquirir videojuegos digitales a través de nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos detenidamente antes de realizar cualquier compra.
                    </p>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">1. Aceptación de los Términos</h2>
                        <p className="text-gray-600 mb-6">
                            Al acceder y utilizar este sitio web, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, no debes utilizar este sitio web ni adquirir productos de nuestra plataforma.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">2. Descripción del Servicio</h2>
                        <p className="text-gray-600 mb-6">
                            <span className="font-semibold">DigitalGames™</span> proporciona acceso a una amplia gama de videojuegos digitales a través de su plataforma de comercio electrónico. Todos los juegos se entregan en formato digital a través de claves de activación o descarga directa. No enviamos productos físicos.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">3. Licencia de Uso</h2>
                        <p className="text-gray-600 mb-6">
                            Al comprar un videojuego en <span className="font-semibold">DigitalGames™</span>, adquieres una licencia de uso limitada, no transferible y no exclusiva para descargar y jugar el videojuego en tu dispositivo personal. No se permite la reventa, distribución o cualquier otra forma de transferencia de la licencia sin el consentimiento explícito del proveedor.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">4. Pagos y Facturación</h2>
                        <p className="text-gray-600 mb-6">
                            Todas las compras deben realizarse mediante los métodos de pago aceptados por la plataforma. Nos reservamos el derecho de modificar los precios en cualquier momento sin previo aviso. Todos los pagos son finales y no se permiten devoluciones, excepto cuando lo exija la ley.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">5. Política de Reembolso</h2>
                        <p className="text-gray-600 mb-6">
                            Debido a la naturaleza digital de nuestros productos, no ofrecemos reembolsos por productos ya entregados. Si tienes problemas con tu compra, puedes contactar con nuestro equipo de soporte para evaluar posibles soluciones.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">6. Limitación de Responsabilidad</h2>
                        <p className="text-gray-600 mb-6">
                            DigitalGames™ no se hace responsable por cualquier daño directo, indirecto, incidental, especial o consecuente que surja del uso o la incapacidad de utilizar nuestros productos, incluso si hemos sido advertidos de la posibilidad de tales daños.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">7. Modificaciones de los Términos</h2>
                        <p className="text-gray-600 mb-6">
                            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Te notificaremos cualquier cambio importante a través de nuestro sitio web. Al continuar utilizando nuestro sitio después de que las modificaciones entren en vigor, aceptas los nuevos términos.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">8. Ley Aplicable</h2>
                        <p className="text-gray-600 mb-6">
                            Estos términos y condiciones se rigen por las leyes del país en el que operamos. Cualquier disputa relacionada con estos términos se resolverá ante los tribunales competentes de dicha jurisdicción.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-black mb-4">9. Contacto</h2>
                        <p className="text-gray-600 mb-6">
                            Si tienes alguna pregunta sobre estos términos y condiciones, por favor contáctanos en <a href="mailto:soporte@digitalgames.com" className="text-[#f7002f] hover:underline">soporte@digitalgames.com</a>.
                        </p>
                    </div>

                    <div className="flex justify-center mt-8">
                        <a href="/" className="bg-[#f7002f] text-white px-6 py-2 rounded hover:bg-black transition duration-300">
                            Acepto los Términos
                        </a>
                    </div>
                </div>
            </div>
            <Footeer />
        </div>
    );
}

export default Terms;
