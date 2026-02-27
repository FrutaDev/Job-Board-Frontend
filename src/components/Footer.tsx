export default function Footer() {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-15 gap-8">
                <section className="w-full md:w-1/3">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <img src="/src/assets/uachFooter.png"
                            alt="uachLogo"
                            className="w-48 h-auto md:w-60 md:h-35 cursor-pointer" />
                        <div className="flex flex-col text-center md:text-left">
                            <p className="text-white">Universidad Autonoma de Chihuahua</p>
                            <span className={spanItemsStyle}>C. Escorza 900, Col. Centro 31000</span>
                            <span className={spanItemsStyle}>Tel. +52 (614) 439 1500</span>
                            <span className={spanItemsStyle}>Chihuahua, Chih. México</span>
                        </div>
                    </div>
                </section>
                <section className="w-full md:w-2/3">
                    <div className="border-b-1 border-gray-500/30 mb-4">
                        <p className="font-bold text-gray-300 mb-2 text-center md:text-left">Ligas de interes</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-around gap-8">
                        <div className="text-center sm:text-left">
                            <ul>
                                <li className={listItemsStyle}>
                                    <a href="#">Transparencia</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Sala de presa</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Eventos</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Movilidad estudiantil</a>
                                </li>
                            </ul>
                        </div>
                        <div className="text-center sm:text-left">
                            <ul>
                                <li className={listItemsStyle}>
                                    <a href="#">Bibliotecas universitarias</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Redes sociales</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Contraloría social</a>
                                </li>
                                <li className={listItemsStyle}>
                                    <a href="#">Radio universidad</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <div className="flex items-center justify-center md:justify-end mt-4 mr-0 md:mr-4 p-3 border-t border-white/10 mx-8">
                <p className="text-center text-gray-300 text-sm">2026 © Todos los derechos reservados | <a href="#" className="text-[#D5A521] hover:underline">Privacidad y Políticas</a></p>
            </div>
        </>
    )
}

const listItemsStyle = "text-gray-300 hover:text-white hover:underline cursor-pointer transition-colors duration-300 mb-6"
const spanItemsStyle = "text-[#747775] text-xs"