import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

function Privacy() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />

            <div className="flex-grow container mx-auto px-4 py-12">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                        Política de Privacidad
                    </h1>
                    
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        En <span className="font-bold text-gray-900">DigitalGames™</span>, valoramos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros. Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos tu información cuando accedes y utilizas nuestra plataforma.
                    </p>
                    
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Información que Recopilamos</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Recopilamos la información que nos proporcionas directamente cuando te registras en nuestra plataforma, realizas compras o interactúas con nuestros servicios. Esto puede incluir tu nombre, dirección de correo electrónico, información de pago y otra información relevante para completar tu pedido.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Uso de la Información</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Utilizamos la información que recopilamos para procesar tus pedidos, ofrecer soporte técnico, mejorar nuestra plataforma, y enviarte actualizaciones o promociones que puedan interesarte. No compartimos tu información con terceros sin tu consentimiento, excepto cuando sea necesario para completar transacciones o cumplir con la ley.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Seguridad de los Datos</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Implementamos medidas de seguridad adecuadas para proteger tu información contra accesos no autorizados, alteraciones o divulgaciones. Sin embargo, debes ser consciente de que ningún método de transmisión a través de Internet o almacenamiento electrónico es completamente seguro.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Cookies</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Utilizamos cookies para mejorar tu experiencia en nuestra plataforma, personalizar el contenido y analizar el tráfico. Puedes optar por deshabilitar las cookies en tu navegador, pero esto podría afectar el funcionamiento de algunas características de nuestro sitio.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Derechos del Usuario</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Tienes derecho a acceder, rectificar o eliminar la información personal que tenemos sobre ti. Si deseas ejercer estos derechos o tienes preguntas sobre cómo manejamos tus datos, no dudes en contactarnos.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Cambios en la Política de Privacidad</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Te notificaremos de cualquier cambio significativo publicando una nueva versión en nuestro sitio web. Te recomendamos que revises esta página periódicamente para estar al tanto de nuestras políticas actuales.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Contacto</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Si tienes alguna pregunta sobre nuestra política de privacidad o deseas ejercer tus derechos de privacidad, puedes contactarnos en <a href="mailto:soporte@digitalgames.com" className="text-[#f7002f] hover:underline">soporte@digitalgames.com</a>.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Privacy;
