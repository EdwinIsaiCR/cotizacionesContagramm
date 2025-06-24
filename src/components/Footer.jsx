import React from 'react';

const Footer = () => {
  return (
    <footer className="d-flex justify-between bg-black text-white py-10 px-5 lg:px-10">
        {/* Contenedor principal (mapas y contacto) */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Sección izquierda (Mapas) */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-xl font-bold mb-5 text-center lg:text-left">
              Visítanos
            </h3>
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Mapa 1 */}
              <div className="w-full md:w-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.453532604209!2d-96.75954394925628!3d17.072528053642436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c71948db277631%3A0xe06b3b20f7ca53b2!2sContagramm!5e0!3m2!1ses-419!2smx!4v1736808283375!5m2!1ses-419!2smx"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="mt-3 text-center">
                  Jazmines 20. Fracc. Jardines de las Lomas, Supermanzana Loc,
                  Montoya, Oaxaca de Juárez, Oax.
                </p>
              </div>

              {/* Mapa 2 */}
              <div className="w-full md:w-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.0328437794137!2d-96.73997512565224!3d17.071046083763196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c723b27ed368d1%3A0x3f639a2cd0fc1c08!2sJuan%20de%20La%20Barrera%20102%2C%20Santa%20Mar%C3%ADa%20del%20Marquesado%2C%20Ex-Marquezado%2C%2068034%20Oaxaca%20de%20Ju%C3%A1rez%2C%20Oax.!5e0!3m2!1ses-419!2smx!4v1737563567067!5m2!1ses-419!2smx"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="mt-3 text-center">
                  Juan de La Barrera 102, Santa María del Marquesado, Ex-Marquezado,
                  Oaxaca de Juárez, Oax.
                </p>
              </div>
            </div>
          </div>

          {/* Sección derecha (Contacto) */}
          <aside
            id="contacto"
            className="w-full lg:w-1/3 flex justify-center text-center lg:text-left"
          >
            <div className="w-full max-w-[400px]">
              <h3 className="text-xl font-bold mb-5">Contacto</h3>
              <ul>
                <li className="mb-3">
                  <i className="fa-solid fa-phone mr-2"></i>951 509 59 70
                </li>
                <li className="mb-3">
                  <i className="fa-solid fa-envelope mr-2"></i>
                  <a href="mailto:contacto@contagramm.com">contacto@contagramm.com</a>
                </li>
                <li className="mb-3">
                  <i className="fa-brands fa-whatsapp mr-2"></i>951 509 59 70
                </li>
                <li className="mb-3">
                  <i className="fab fa-facebook mr-2"></i>
                  <a
                    href="https://www.facebook.com/contagramm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    Contagramm
                  </a>
                </li>
                <li className="mb-3">
                  <i className="fab fa-instagram mr-2"></i>
                  <a
                    href="https://www.instagram.com/contagramm_consultoria/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    Contagramm_consultoria
                  </a>
                </li>
                <li className="mb-3">
                  <i className="fa-brands fa-tiktok mr-2"></i>
                  <a
                    href="https://www.tiktok.com/@contagramm_consul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    Contagramm_consul
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Sección inferior (Logo y derechos) */}
        <div className="mt-10 text-center flex flex-col items-center">
          <img
            src="/LOGOTIPO BALNCO-03.svg"
            alt="Logo"
            className="max-w-[200px] mb-5"
          />
          <p>&copy; 2025 Todos los derechos reservados</p>
        </div>
    </footer>
  );
};

export default Footer;