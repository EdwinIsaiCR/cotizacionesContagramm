import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronLeft, ChevronRight, Check, AlertCircle, CheckCircle } from 'lucide-react'
import { db } from '../db/firebaseConection'
import { collection, addDoc } from "firebase/firestore"
import { motion, AnimatePresence } from 'framer-motion'
import estados from '../db/estados.json'
import { FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useWatch } from "react-hook-form";

const SuccessPage = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '529515095970';
        const message = encodeURIComponent('Hola, me gustaría recibir más información sobre sus servicios de asesoría.');
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="relative min-h-screen flex flex-col gap-6 items-center justify-center p-4 overflow-hidden">
            <div
                className="w-full absolute top-0 left-0 md:h-full h-[400px] bg-top bg-no-repeat bg-cover -z-10"
                style={{
                    backgroundImage: "url('./img/fondo.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Contenido principal con márgenes en pantallas grandes */}
            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />

                <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <h1 className='text-2xl sm:text-3xl font-bold uppercase'
                        style={{
                            background: 'linear-gradient(to right, #202282, #47C9FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        TU SOLICITUD DE ASESORÍA Y COTIZACIÓN HA SIDO ENVIADA
                    </h1>
                </div>

                <div className="text-center mt-6 max-w-xl">
                    <p className="text-gray-700 italic text-lg">
                        Uno de nuestros asesores se pondrá en contacto contigo.
                    </p>
                </div>

                <button
                    onClick={handleWhatsAppClick}
                    className=' text-xl sm:text-2xl rounded-2xl py-3 px-6 border-2 border-green-500 w-full sm:w-64 cursor-pointer flex items-center justify-center gap-3 hover:bg-green-50 transition-colors mt-8'
                >
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                    Contactar
                </button>
            </div>
        </div>
    )
}

// Componente de alerta mejorado
const Alert = ({ type = 'info', title, message }) => {
    const alertConfig = {
        success: {
            bg: 'bg-green-50 border-green-200',
            icon: 'text-green-400',
            title: 'text-green-800',
            message: 'text-green-700',
            IconComponent: CheckCircle
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            icon: 'text-red-400',
            title: 'text-red-800',
            message: 'text-red-700',
            IconComponent: AlertCircle
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            icon: 'text-yellow-400',
            title: 'text-yellow-800',
            message: 'text-yellow-700',
            IconComponent: AlertCircle
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            icon: 'text-blue-400',
            title: 'text-blue-800',
            message: 'text-blue-700',
            IconComponent: AlertCircle
        }
    }

    const { bg, icon, title: titleStyle, message: messageStyle, IconComponent } = alertConfig[type]

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-4 left-4 right-4 sm:w-full sm:right-4 sm:left-auto z-50 max-w-md  sm:mx-0 ${bg} border rounded-lg p-4 shadow-lg`}
            >
                <div className="flex">
                    <div className="flex-shrink-0">
                        <IconComponent className={`h-5 w-5 ${icon}`} />
                    </div>
                    <div className="ml-3 flex-1">
                        <h3 className={`text-sm font-medium ${titleStyle}`}>{title}</h3>
                        <div className={`mt-1 text-sm ${messageStyle}`}>{message}</div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

const politicasPrivacidad = `
<div style="font-family: 'Arial', sans-serif; color: #333;">
  
  <p class="mb-6 text-justify">
      En cumplimiento al deber de resguardo de información y de datos personales
      y con fundamento en los dispuesto por los artículos 3 fracción I, 8, 12,
      15, 16 y demás relativos de la Ley Federal de Protección de Datos
      Personales en Posesión de Particulares, CONSULTING & MANAGEMENT RESOURCE
      S.C pone a su disposición el presente Aviso de Privacidad.
    </p>
    <strong class="block mb-2 mt-6"
      >IDENTIDAD Y DOMICILIO DEL RESPONSABLE DE LA PROTECCIÓN DE DATOS
      PERSONALES</strong
    >
    <p class="mb-6 text-justify">
      CONSULTING & MANAGEMENT RESOURCE S.C, con nombre comercial CONTAGRAMM,
      ubicado en Jazmines 20. Fracc. Jardines de las Lomas, Loc. Montoya, Oaxaca
      de Juárez, México, Oaxaca de Juárez, México, es el responsable del uso y
      protección de los datos personales que nos proporcione.
    </p>
    <strong class="block mb-2 mt-6">DATOS PERSONALES UTILIZADOS</strong>
    <p class="mb-6 text-justify">
      Para llevar a cabo las finalidades descritas en este Aviso de Privacidad,
      haremos uso de los siguientes datos personales:
    </p>
    <ul class="custom-list mb-6 text-justify list-disc list-inside ml-6">
      <li>
        Datos de contacto (número telefónico, correo electrónico y nombre
        completo)
      </li>
      <li>Datos de identificación</li>
      <li>Datos de facturación</li>
      <li>Datos fiscales</li>
    </ul>
    <strong class="block mb-2 mt-6"
      >FINALIDADES DEL TRATAMIENTO DE DATOS PERSONALES</strong
    >
    <p class="mb-6 text-justify">
      Utilizaremos los datos recabados para las siguientes finalidades, que son
      necesarias para el servicio solicitado:
    </p>
    <ul class="custom-list mb-6 text-justify list-disc list-inside ml-6">
      <li>Finalidad de contacto, aclaraciones y comunicación</li>
      <li>Finalidad de facturación y cobro</li>
      <li>Finalidad de entrega de servicios</li>
      <li>Finalidad de establecer una relación comercial</li>
    </ul>
    <p class="mb-6 text-justify">
      De manera adicional, utilizaremos su información personal para las
      siguientes finalidades, que no son necesarias para el servicio solicitado,
      pero que nos permite y facilitan brindarle una mejor atención:
    </p>
    <ul class="custom-list mb-6 text-justify list-disc list-inside ml-6">
      <li>Finalidad de enviar información promocional</li>
      <li>Finalidad de realizar encuestas de satisfacción</li>
    </ul>
    <strong class="block mb-2 mt-6"
      >TRANFERENCIAS DE DATOS QUE SE EFECTÚEN</strong
    >
    <p class="mb-6 text-justify">
      No compartiremos sus datos personales con terceros, salvo por
      requerimientos legales. Los datos serán utilizados exclusivamente para los
      fines señalados en este Aviso de Privacidad.
    </p>
    <strong class="block mb-2 mt-6"
      >MEDIOS PARA EJERCER LOS DERECHOS DE ACCESO, RECTIFICACIÓN, CANCELACIÓN U
      OPOSICIÓN (ARCO)</strong
    >
    <ol class="custom-list-number mb-6 text-justify list-decimal list-inside ml-6">
      <li>
        Acceso: Usted tiene derecho a solicitar y obtener información sobre sus
        datos personales que tenemos almacenados. Puede pedir una copia de los
        datos que hemos recopilado sobre usted.
      </li>
      <li>
        Rectificación: Si considera que su información personal es incorrecta o
        incompleta, puede solicitar la corrección de sus datos. Nos
        comprometemos a corregir cualquier información incorrecta o a completar
        cualquier dato que esté incompleto.
      </li>
      <li>
        Cancelación: En ciertos casos, puede solicitar la eliminación de sus
        datos personales cuando considere que no son necesarios para los fines
        para los que fueron recopilados. Cumpliremos con su solicitud en los
        términos establecidos por la ley, excepto cuando sea necesario conservar
        la información por obligaciones legales.
      </li>
      <li>
        Oposición: Usted puede oponerse al tratamiento de sus datos personales
        por motivos legítimos. Si se opone, dejaremos de procesar sus datos,
        salvo que existan razones legales para continuar con el tratamiento.
      </li>
    </ol>

    <p class="mb-6 text-justify">
      A continuación, proporcionaremos los datos de contacto del departamento
      encargado de gestionar las solicitudes relacionadas con los derechos ARCO:
    </p>
    <p class="mb-6 text-justify">
      Nombre: Departamento de Ventas y comercialización<br />
      Domicilio: Jazmines 20. Fracc. Jardines de las Lomas, Loc. Montoya, Oaxaca
      de Juárez, México, Oaxaca de Juárez, México<br />
      Teléfono: 951 509 59 70<br />
      Correo electrónico: <a
        href="mailto:contacto@contagramm.com"
        class="text-blue-500">contacto@contagramm.com</a
      >
    </p>
    <p class="mb-6 text-justify">
      Si desea ejercer los derechos de acceso, rectificación, cancelación u
      oposición del tratamiento de sus datos personales o limitar su
      divulgación, puede presentar la solicitud respectiva a través del
      siguiente correo electrónico:
    </p>
    <a href="mailto:contacto@contagramm.com" class="block mb-6 text-blue-500"
      >contacto@contagramm.com</a
    >
    <p class="mb-6 text-justify">
      La respuesta a su solicitud será comunicada de la siguiente manera: correo
      electrónico, llamada telefónica y/o mensaje de texto.
    </p>
    <p class="mb-6 text-justify">
      El plazo para brindar respuesta a su solicitud será el siguiente: 5 días.
    </p>
    <strong class="block mb-2 mt-6"
      >OPCIONES Y MEDIOS QUE EL RESPONSABLE OFREZCA A LOS TITULARES PARA LIMITAR
      EL USO O DIVULGACIÓN DE LOS DATOS</strong
    >
    <p class="mb-6 text-justify">
      Si desea revocar el consentimiento otorgado para el tratamiento de sus
      datos personales o limitar su divulgación, puede presentar la solicitud
      respectiva a través del siguiente correo electrónico:
    </p>
    <a href="mailto:contacto@contagramm.com" class="block mb-6 text-blue-500"
      >contacto@contagramm.com</a
    >
    <p class="mb-6 text-justify">
      La comunicación de la respuesta a la solicitud de revocación o limitación
      de divulgación de sus datos se llevará a cabo de la siguiente forma:
      correo electrónico, llamada telefónica y/o mensaje de texto.
    </p>
    <p class="mb-6 text-justify">
      La respuesta a la solicitud de revocación o limitación de divulgación de
      sus datos se proporcionará en un plazo máximo de 5 días.
    </p>
    <strong class="block mb-2 mt-6">CAMBIOS AL AVISO DE PRIVACIDAD</strong>
    <p class="mb-6 text-justify">
      Nos reservamos el derecho de actualizar esta Política de Privacidad en
      cualquier momento. Cualquier cambio significativo será notificado a través
      de:
    </p>
    <p class="mb-6 text-justify">
      • Nuestro sitio web (<a
        href="https://contagramm.net/"
        class="text-blue-500">https://contagramm.net/</a
      >)
    </p>
    <p class="mb-6 text-justify">
      Usted puede solicitar información sobre si el mismo ha sufrido algún
      cambio a través del siguiente correo electrónico:
    </p>
    <a href="mailto:contacto@contagramm.com" class="block mb-6 text-blue-500"
      >contacto@contagramm.com</a
    >
    <p class="mb-6 text-right">Ultima actualización: 15 de Marzo de 2025.</p>
</div>
`;

const StepsForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessPage, setShowSuccessPage] = useState(false)
    const [alert, setAlert] = useState(null)
    const [skip, setSkip] = useState(false)
    const [appear1, setAppear1] = useState(false)
    const [appear2, setAppear2] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
        setValue,
        watch,
        reset,
        control
    } = useForm()

    const formRef = useRef(null)

    const steps = [
        { id: 0, name: 'Asesoría', title: 'Información de la Asesoría' },
        { id: 1, name: 'Identificación', title: 'Datos de Identificación' },
        { id: 2, name: 'Contabilidad', title: 'Información Contable' },
        { id: 3, name: 'Laboral', title: 'Información Laboral' },
        { id: 4, name: 'Generales', title: 'Información Generales' }
    ]

    const showAlert = (type, title, message, duration = 5000) => {
        setAlert({ type, title, message })
        if (duration > 0) {
            setTimeout(() => setAlert(null), duration)
        }
    }

    const shouldSkipSteps = (selectedServices) => {
        return (
            (selectedServices?.includes("inventarios") &&
                !selectedServices?.some(s => ["contabilidad", "contabilidad_nomina", "facturacion"].includes(s))) ||
            (selectedServices?.includes("reclutamiento_seleccion_personal") &&
                !selectedServices?.some(s => ["contabilidad", "contabilidad_nomina", "facturacion"].includes(s)))
        );
    };


    const validateCurrentSteps = async () => {
        const selectedServices = getValues("servicios") || [];
        const skipSteps = shouldSkipSteps(selectedServices);

        if (skipSteps) {
            // Solo validar paso 0 y último paso
            const step0Valid = await trigger(["servicios", "residencia"]);
            const step1Valid = await trigger(["nombre", "telefono", "email", "persona", "representanteLegal", "domicilio", "empresa", "rfc", "giroEmpresa"]);
            const lastStepValid = await trigger(["comentarios"]); // Ajusta según tu último paso
            return step0Valid && step1Valid && lastStepValid;
        } else {
            // Validar todos los campos normalmente
            return await trigger();
        }
    };


    const nextStep = async (e) => {
        e?.preventDefault();

        const selectedServices = getValues("servicios") || [];
        const skipSteps = shouldSkipSteps(selectedServices);

        // Validar solo los campos relevantes
        const fieldsToValidate = getFieldsForStep(currentStep);
        const isValid = await trigger(fieldsToValidate);

        if (!isValid) return;

        if (currentStep === 1 && skipSteps) {
            setCurrentStep(steps.length - 1);
            selectedServices.includes("reclutamiento_seleccion_personal") ? setAppear1(true) : setAppear2(true);
            setSkip(true)
        } else if (currentStep < steps.length - 1) {
            setSkip(false)
            selectedServices.includes("reclutamiento_seleccion_personal") ? setAppear1(false) : setAppear2(false);
            setCurrentStep(currentStep + 1);
        }

        scrollToForm();
    };

    const prevStep = (e) => {
        e?.preventDefault();

        const selectedServices = getValues("servicios") || [];

        // Si estamos en el último paso y se seleccionaron los servicios especiales
        if (currentStep === steps.length - 1 && shouldSkipSteps(selectedServices)) {
            setCurrentStep(1); // Volver directamente al primer paso
        }
        // Si no, comportamiento normal
        else if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }

        scrollToForm();
    };

    const scrollToForm = () => {
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }, 100)
    }

    const getFieldsForStep = (stepIndex) => {
        const selectedServices = getValues("servicios") || [];
        const skipSteps = shouldSkipSteps(selectedServices);

        console.log("datos");


        if (skipSteps) {
            // Solo validar campos del paso 0, 1 y del último paso
            console.log("skipSteps", skipSteps);
            switch (stepIndex) {
                case 0: return ['servicios', 'residencia'];
                case 1: return ['nombre', 'telefono', 'email', 'persona', 'representanteLegal', 'domicilio', 'empresa', 'rfc', 'giroEmpresa'];
                case steps.length - 1: return ['comentarios']; // Ajusta según los campos del último paso
                default: return []; // No validar otros pasos
            }

        } else {
            // Validación normal para todos los pasos
            console.log("skipSteps", skipSteps);

            switch (stepIndex) {
                case 0: return ['servicios', 'residencia'];
                case 1: return ['nombre', 'telefono', 'email', 'persona', 'representanteLegal', 'domicilio', 'empresa', 'rfc', 'giroEmpresa'];
                case 2: return ['cuentasAperturadas', 'tarjetasCredito', 'numeroTarjetas', 'creditosBancarios', 'facturasIngresos', 'facturasProveedores', 'pagoOportunamente', 'obligacionesFiscales', 'auditoriasPorAutoridades', 'manejarContabilidad', 'sistemaContabilidad', 'otroSistema', 'sistemaFacturacion', 'otroSistemaFacturacion', 'papelesTrabajo'];
                case 3: return ['areaRecursosHumanos', 'todoPersonalIMSS', 'numeroEmpleadosIMS', 'pagos', 'registradaFONACOT'];
                case 4: return ['creditoFiscal', 'demandasTrabajadores', 'actividadesVulnerables', 'comentarios'];
                default: return [];
            }
        }
    };


    const handleChange = (e) => {
        const { value, checked } = e.target;
        let currentValues = watchedValues || [];

        console.log("has seleccionado", value, "checked:", checked);

        if (value === "ninguna") {
            if (checked) {
                setValue("auditoriasPorAutoridades", ["ninguna"]);
            } else {
                setValue("auditoriasPorAutoridades", []);
            }
        } else {
            if (checked) {
                // Remover "ninguna" y agregar la nueva opción
                const newValues = currentValues.filter(v => v !== "ninguna");
                newValues.push(value);
                setValue("auditoriasPorAutoridades", newValues);
            } else {
                // Remover la opción deseleccionada
                const newValues = currentValues.filter(v => v !== value);
                setValue("auditoriasPorAutoridades", newValues);
            }
        }
    };

    const showPoliciesModal = async () => {
        const scrollPosition = window.scrollY;
        // Common configuration for both modals with enhanced responsiveness
        const modalConfig = (title, content, defaultWidth) => {
            // Determine width based on screen size - more granular breakpoints
            let width;
            if (window.innerWidth < 480) {
                width = '95%'; // Mobile phones
            } else if (window.innerWidth < 768) {
                width = '90%'; // Tablets
            } else if (window.innerWidth < 1024) {
                width = '80%'; // Small laptops
            } else {
                width = defaultWidth; // Larger screens
            }

            // Adjust font size based on screen width
            const titleFontSize = window.innerWidth < 480 ? '20px' : '24px';
            const contentFontSize = window.innerWidth < 480 ? '14px' : '16px';

            // Adjust max-height based on viewport to ensure it fits on smaller screens
            const maxHeight = window.innerHeight < 600 ? '40vh' : '50vh';

            // Adjust scroll container based on mobile browsers
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const scrollStyle = isMobile ?
                `-webkit-overflow-scrolling: touch; overflow-y: auto; overflow-x: hidden; transform: translateZ(0);` :
                `overflow-y: auto; overflow-x: hidden;`;

            return {
                title: `<span style="color: #29A1EC; font-size: ${titleFontSize};">${title}</span>`,
                html: `
                  <div class="scroll-container" style="
                      max-height: ${maxHeight};
                      ${scrollStyle}
                      padding-right: 10px;
                      text-align: left;
                      position: relative;
                      font-size: ${contentFontSize};
                  ">
                      <div class="content-wrapper">
                          ${content.replace('max-height: 350px; overflow-y: auto;', '')}
                          <div class="end-marker" style="
                              height: 2px;
                              background: transparent;
                              margin: 20px 0;
                          "></div>
                      </div>
                  </div>
              `,
                width: width,
                padding: window.innerWidth < 480 ? '10px' : (window.innerWidth < 768 ? '15px' : '25px'),
                background: '#ffffff',
                showCancelButton: true,
                confirmButtonText: 'Aceptar y Continuar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#29A1EC',
                scrollbarPadding: false, // Evita que SweetAlert ajuste el padding
                focusConfirm: false, // Evita el enfoque automático que puede causar desplazamiento
                cancelButtonColor: '#6c757d',
                allowOutsideClick: false,
                customClass: {
                    popup: 'rounded-modal',
                    title: 'modal-title',
                    confirmButton: 'confirm-btn',
                    cancelButton: 'cancel-btn',
                    actions: window.innerWidth < 480 ? 'stacked-buttons' : '', // Stack buttons on small screens
                    container: 'responsive-container'
                },
                willOpen: () => {
                    // Bloquear el scroll del body temporalmente
                    document.body.style.overflow = 'hidden';
                },
                didOpen: (popup) => {
                    // Fix for Safari and Edge mobile scroll
                    const fixMobileScroll = () => {
                        const scrollContainer = popup.querySelector('.scroll-container');
                        if (scrollContainer) {
                            // Solución múltiple para diferentes versiones de Safari
                            const forceScrollToTop = () => {
                                scrollContainer.scrollTop = 0;
                                scrollContainer.style.overflow = 'hidden';
                                setTimeout(() => {
                                    scrollContainer.style.overflow = 'auto';
                                    scrollContainer.scrollTop = 0;
                                }, 100);
                            };

                            forceScrollToTop();

                            // Agregar event listener para cambios de tamaño (rotación)
                            const resizeObserver = new ResizeObserver(forceScrollToTop);
                            resizeObserver.observe(scrollContainer);

                            // Para Safari en iOS
                            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                                scrollContainer.style.webkitOverflowScrolling = 'touch';
                                setTimeout(forceScrollToTop, 300);
                            }
                        }
                    };

                    // Add CSS for responsive buttons
                    if (window.innerWidth < 480) {
                        const style = document.createElement('style');
                        style.innerHTML = `
                          .stacked-buttons {
                              flex-direction: column !important;
                              gap: 10px !important;
                          }
                          .stacked-buttons .confirm-btn,
                          .stacked-buttons .cancel-btn {
                              margin: 0 !important;
                              width: 100% !important;
                          }
                      `;
                        document.head.appendChild(style);
                    }

                    const confirmBtn = Swal.getConfirmButton();
                    confirmBtn.disabled = true;
                    confirmBtn.style.opacity = '0.5';
                    confirmBtn.style.cursor = 'not-allowed';

                    const scrollContainer = document.querySelector('.scroll-container');
                    const endMarker = document.querySelector('.end-marker');
                    const contentWrapper = document.querySelector('.content-wrapper');

                    // Apply mobile scroll fixes
                    fixMobileScroll();

                    if (scrollContainer && endMarker) {
                        let wasAtBottom = false;

                        const checkScroll = () => {
                            const containerBottom = scrollContainer.getBoundingClientRect().bottom;
                            const endMarkerTop = endMarker.getBoundingClientRect().top;
                            const tolerance = 15;

                            const isAtBottom = endMarkerTop <= containerBottom + tolerance;

                            if (isAtBottom) {
                                confirmBtn.disabled = false;
                                confirmBtn.style.opacity = '1';
                                confirmBtn.style.cursor = 'pointer';
                                wasAtBottom = true;

                                endMarker.style.background = '#29A1EC';
                            } else if (wasAtBottom) {
                                confirmBtn.disabled = true;
                                confirmBtn.style.opacity = '0.5';
                                confirmBtn.style.cursor = 'not-allowed';

                                endMarker.style.background = 'transparent';
                            }
                        };

                        if (contentWrapper.scrollHeight <= scrollContainer.clientHeight) {
                            confirmBtn.disabled = false;
                            confirmBtn.style.opacity = '1';
                            confirmBtn.style.cursor = 'pointer';
                            endMarker.style.background = '#29A1EC';
                        } else {
                            // For iOS and other mobile browsers, we need to use both scroll and touchmove events
                            scrollContainer.addEventListener('scroll', checkScroll);
                            scrollContainer.addEventListener('touchmove', checkScroll);
                            scrollContainer.addEventListener('touchend', checkScroll);

                            // Add resize event listener to handle orientation changes
                            const resizeObserver = new ResizeObserver(() => {
                                checkScroll();
                            });

                            resizeObserver.observe(scrollContainer);

                        }

                        checkScroll();
                    }
                },
                willClose: () => {
                    // Restaurar el scroll del body
                    document.body.style.overflow = '';
                }
            };
        };

        // CSS to ensure policies content is responsive
        const injectResponsiveStyles = () => {
            const style = document.createElement('style');
            style.textContent = `
              @media (max-width: 480px) {
                  /* For mobile phones */
                  .rounded-modal {
                      font-size: 14px !important;
                  }
                  .modal-title {
                      font-size: 18px !important;
                  }
                  
                  /* Make lists more compact on mobile */
                  .scroll-container ul, .scroll-container ol {
                      padding-left: 15px !important;
                  }
                  .scroll-container li {
                      margin-bottom: 5px !important;
                  }
                  
                  /* Mobile scroll fixes */
                  .scroll-container {
                      -webkit-overflow-scrolling: touch !important;
                      overflow-y: auto !important;
                      transform: translateZ(0) !important;
                      touch-action: pan-y !important;
                  }
              }
              
              /* For all screen sizes - ensure content is responsive */
              .responsive-container {
                  max-width: 100vw !important;
              }
              
              /* Ensure tables are responsive if they exist in content */
              .scroll-container table {
                  width: 100% !important;
                  display: block;
                  overflow-x: auto;
              }
              
              /* Additional scrolling fix for iOS */
              html.swal2-shown,
              body.swal2-shown {
                  overflow: hidden !important;
                  position: fixed !important;
                  width: 100% !important;
              }
          `;
            document.head.appendChild(style);
        };

        // Inject responsive styles
        injectResponsiveStyles();

        // Modify the policies content to be more responsive
        const makeContentResponsive = (content) => {
            return content
                // Replace fixed width values with percentages or responsive units
                .replace(/width:\s*\d+px/g, 'width: 100%')
                // Ensure padding is reasonable on mobile
                .replace(/padding:\s*(\d+)px/g, (match, p1) => {
                    const value = parseInt(p1);
                    return `padding: min(${value}px, 5%)`;
                });
        };

        const privacidadResult = await Swal.fire(
            modalConfig('Política de Privacidad', makeContentResponsive(politicasPrivacidad), '800px')
        );

        // Restaurar la posición de scroll después de cerrar los modales
        window.scrollTo(0, scrollPosition);

        return privacidadResult.isConfirmed;
    };


    const saveDataToFirebase = async () => {
        const formData = getValues()
        const fecha = new Date()
        const aceptoPol = true
        formData.fecha = fecha
        formData.aceptoPol = aceptoPol

        console.log("formData", formData);


        try {
            const docRef = await addDoc(collection(db, "clientes"), formData)
            return { success: true, id: docRef.id }
        } catch (error) {
            console.error("Error saving document: ", error)
            throw new Error('Error al guardar en la base de datos')
        }
    }

    const onSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        showAlert('info', 'Enviando formulario...', 'Por favor espere...', 0);

        try {
            const isValid = await validateCurrentSteps();
            if (!isValid) {
                throw new Error('Por favor complete los campos requeridos');
            }

            const policiesAccepted = await showPoliciesModal();
            if (!policiesAccepted) {
                throw new Error('Debes aceptar las políticas para continuar');
            }

            await saveDataToFirebase();
            setShowSuccessPage(true);
            reset();
            setCurrentStep(0);

        } catch (error) {
            showAlert('error', 'Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Si se debe mostrar la página de éxito, renderizarla
    if (showSuccessPage) {
        return <SuccessPage />
    }

    const renderStepContent = (stepIndex) => {
        const selectedServices = getValues("servicios") || [];
        const skipSteps = shouldSkipSteps(selectedServices);

        if (skipSteps && stepIndex > 1 && stepIndex < steps.length - 1) {
            return null; // No renderizar pasos intermedios
        }

        switch (stepIndex) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de la Asesoría</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Servicio a cotizar (Puedes marcar más de una) *
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "contabilidad", label: "Contabilidad" },
                                    { value: "contabilidad_nomina", label: "Contabilidad y Nómina" },
                                    { value: "nomina_insourcing", label: "Nómina (Insourcing)" },
                                    { value: "facturacion", label: "Facturación" },
                                    { value: "auditoria", label: "Auditoría" },
                                    { value: "revision_contable", label: "Revisión Contable" },
                                    { value: "inventarios", label: "Inventarios", skipSteps: true },
                                    { value: "reclutamiento_seleccion_personal", label: "Reclutamiento o selección de personal", skipSteps: true },
                                    { value: "asesoria", label: "Asesoría" },
                                    { value: "otro", label: "Otro" }
                                ].map((servicio) => (
                                    <label key={servicio.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={servicio.value}
                                            {...register("servicios", {
                                                required: "Selecciona al menos un servicio"
                                            })}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">
                                            {servicio.label}
                                            {servicio.skipSteps && (
                                                <span className="text-xs text-gray-500 ml-1">(Solo este servicio)</span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.servicios && (
                                <p className="text-red-500 text-sm mt-1">{errors.servicios.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lugar de Residencia Actual (Estado) *
                            </label>
                            <select
                                {...register('residencia', { required: 'Selecciona un estado' })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Seleccionar...</option>
                                {estados.estados.map((estado) => (
                                    <option key={estado.clave_inegi} value={estado.nombre}>
                                        {estado.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.residencia && <p className="text-red-500 text-sm mt-1">{errors.residencia.message}</p>}
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Datos de Identificación</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del contribuyente: *
                                </label>
                                <input
                                    {...register('nombre', { required: 'El nombre es requerido' })}
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                />
                                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de teléfono: *
                                </label>
                                <input
                                    {...register('telefono', {
                                        required: 'El teléfono es requerido',
                                        pattern: { value: /^[0-9+\-\s()]+$/, message: 'Formato de teléfono inválido' }
                                    })}
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                />
                                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo electrónico: *
                            </label>
                            <input
                                {...register('email', {
                                    required: 'El email es requerido',
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Formato de email inválido' }
                                })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="fisica"
                                        {...register('persona', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-24 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('persona') === 'fisica'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('persona') === 'fisica'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Persona Física
                                        </span>
                                    </div>
                                </label>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="moral"
                                        {...register('persona')}
                                        className="sr-only"
                                    />
                                    <div className={`w-24 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('persona') === 'moral'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('persona') === 'moral'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Persona Moral
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {errors.persona && (
                                <p className="text-red-500 text-sm mt-1">{errors.persona.message}</p>
                            )}

                            {watch('persona') === 'moral' && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Representante Legal:*
                                    </label>
                                    <input
                                        {...register('representanteLegal', { required: 'El nombre del representante legal es requerido' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.representanteLegal && (
                                        <p className="text-red-500 text-sm mt-1">{errors.representanteLegal.message}</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Domicilio
                            </label>
                            <input
                                {...register('domicilio')}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.domicilio && <p className="text-red-500 text-sm mt-1">{errors.domicilio.message}</p>}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Nombre o Razon social de la empresa: *
                            </label>
                            <input
                                {...register('empresa', { required: 'El nombre de la empresa es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.empresa && <p className="text-red-500 text-sm mt-1">{errors.empresa.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                RFC: *
                            </label>
                            <input
                                {...register('rfc', { required: 'El RFC es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.rfc && <p className="text-red-500 text-sm mt-1">{errors.rfc.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giro de la empresa *
                            </label>
                            <input
                                {...register('giroEmpresa', { required: 'El giro de la empresa es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.giroEmpresa && <p className="text-red-500 text-sm mt-1">{errors.giroEmpresa.message}</p>}
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Contable</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cuentas aperturadas a nombre de la empresa: *
                            </label>
                            <select
                                {...register('cuentasAperturadas', { required: 'Selecciona una cantidad' })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="+5">+5</option>
                            </select>
                            {errors.cuentasAperturadas && <p className="text-red-500 text-sm mt-1">{errors.cuentasAperturadas.message}</p>}
                        </div>
                        <div>
                            {/* Campo original: ¿Manejan Tarjetas de crédito? */}
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Manejan Tarjetas de crédito?:*
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('tarjetasCredito', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('tarjetasCredito') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('tarjetasCredito') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('tarjetasCredito')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('tarjetasCredito') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('tarjetasCredito') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.tarjetasCredito && (
                                <p className="text-red-500 text-sm mt-1">{errors.tarjetasCredito.message}</p>
                            )}

                            {/* Campo condicional: Número de tarjetas */}
                            {watch('tarjetasCredito') === 'si' && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Número de tarjetas de crédito:*
                                    </label>
                                    <select
                                        {...register('numeroTarjetas', {
                                            required: watch('tarjetasCredito') === 'si' ? 'Este campo es requerido' : false
                                        })}
                                        className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="+5">+5</option>
                                    </select>
                                    {errors.numeroTarjetas && (
                                        <p className="text-red-500 text-sm mt-1">{errors.numeroTarjetas.message}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cuenta la empresa con alguno de los siguiente créditos:*
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "hipotecario", label: "Hipotecario" },
                                    { value: "refaccionario", label: "Refaccionario" },
                                    { value: "revolvente", label: "Revolvente" },
                                    { value: "ninguno", label: "Ninguno" },
                                ].map((servicio) => (
                                    <label key={servicio.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={servicio.value}
                                            {...register("creditosBancarios", {
                                                required: "Selecciona al menos un servicio"
                                            })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">{servicio.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.creditosBancarios && <p className="text-red-500 text-sm mt-1">{errors.creditosBancarios.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de movimientos mensuales de: <strong>Facturas de Ingresos</strong>
                            </label>
                            <select
                                {...register('facturasIngresos', {
                                    required: 'Este campo es requerido'
                                })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1-30">1-30</option>
                                <option value="31-60">31-60</option>
                                <option value="61-100">61-100</option>
                                <option value="101-150">101-150</option>
                                <option value="+150">+150</option>
                            </select>
                            {errors.facturasIngresos && <p className="text-red-500 text-sm mt-1">{errors.facturasIngresos.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de movimientos mensuales de: <strong>Facturas de Proveedores</strong>
                            </label>
                            <select
                                {...register('facturasProveedores', {
                                    required: 'Este campo es requerido'
                                })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1-30">1-30</option>
                                <option value="31-60">31-60</option>
                                <option value="61-100">61-100</option>
                                <option value="101-150">101-150</option>
                                <option value="+150">+150</option>
                            </select>
                            {errors.facturasProveedores && <p className="text-red-500 text-sm mt-1">{errors.facturasProveedores.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Presenta oportunamente el pago de sus obligaciones <strong>federales y estatales</strong>
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('pagoOportunamente', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('pagoOportunamente') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('pagoOportunamente') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('pagoOportunamente')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('pagoOportunamente') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('pagoOportunamente') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.pagoOportunamente && <p className="text-red-500 text-sm mt-1">{errors.pagoOportunamente.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Conoce cuáles son sus obligaciones fiscales? (Marque las que apliquen) *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { value: "ISR", label: "ISR" },
                                    { value: "IVA", label: "IVA" },
                                    { value: "IEPS", label: "IEPS" },
                                    { value: "IMSS", label: "IMSS" },
                                    { value: "INFONAVIT", label: "INFONAVIT" },
                                    { value: "EROGACIONES", label: "Erogaciones" },
                                    { value: "CEDULAR_ARRENDAMIENTO", label: "Cedular de Arrendamiento" },
                                    { value: "CEDULAR_HOSPEDAJE", label: "Cedular de Hospedaje" },
                                    { value: "RET_ISR", label: "Ret. de ISR" },
                                    { value: "RET_IVA", label: "Ret. de IVA" }
                                ].map((obligacion) => (
                                    <label key={obligacion.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={obligacion.value}
                                            {...register("obligacionesFiscales", {
                                                required: "Seleccione al menos una opción"
                                            })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">{obligacion.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.obligacionesFiscales && (
                                <p className="text-red-500 text-sm mt-1">{errors.obligacionesFiscales.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Ha tenido alguna auditoría por parte de las autoridades?
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "sat", label: "SAT" },
                                    { value: "imss", label: "IMSS" },
                                    { value: "infonavit", label: "INFONAVIT" },
                                    { value: "finanzas", label: "Finanzas" },
                                    { value: "ninguna", label: "Ninguna" },
                                ].map((servicio) => (
                                    <label key={servicio.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={servicio.value}
                                            {...register("auditoriasPorAutoridades", {
                                                required: "Selecciona al menos un servicio"
                                            })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">{servicio.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.auditoriasPorAutoridades && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.auditoriasPorAutoridades.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cómo manejan su contabilidad?*
                            </label>
                            <select
                                {...register('manejarContabilidad', {
                                    required: 'Este campo es requerido'
                                })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="despacho_externo">Despacho externo</option>
                                <option value="departamento_contable_interno">Departamento contable interno</option>
                                <option value="administrador_de_mi_propia_contabilidad">Administrador de mi propia contabilidad</option>
                            </select>
                            {errors.manejarContabilidad && <p className="text-red-500 text-sm mt-1">{errors.manejarContabilidad.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Qué sistema de contabilidad utiliza?
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "contpaqi", label: "CONTPAQi" },
                                    { value: "aspel_coi", label: "Aspel COI" },
                                    { value: "contalink", label: "ContaLink" },
                                ].map((servicio) => (
                                    <label key={servicio.value} className="flex items-center">
                                        <input
                                            type="radio"
                                            value={servicio.value}
                                            {...register("sistemaContabilidad", {
                                                required: "Selecciona al menos un servicio"
                                            })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">{servicio.label}</span>
                                    </label>
                                ))}

                                {/* Opción Otro con input a la derecha */}
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="otro"
                                        {...register("sistemaContabilidad", {
                                            required: "Selecciona al menos un servicio"
                                        })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-gray-700 mr-2">Otro:</span>
                                    <input
                                        type="text"
                                        placeholder="Especifica el sistema"
                                        {...register("otroSistema", {
                                            validate: (value) =>
                                                watch("sistemaContabilidad") === "otro"
                                                    ? value.trim() !== "" || "Especifica el sistema"
                                                    : true,
                                        })}
                                        disabled={watch("sistemaContabilidad") !== "otro"}
                                        className={`ml-2 w-1/2 text-sm bg-transparent border-0 border-b-2 border-blue-200 ${watch("sistemaContabilidad") === "otro"
                                            ? "focus:border-gray-300 focus:outline-none focus:ring-0"
                                            : "border-gray-200 text-gray-400"
                                            }`}
                                    />

                                </label>
                            </div>

                            {errors.sistemaContabilidad && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.sistemaContabilidad.message}
                                </p>
                            )}
                            {errors.otroSistema && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.otroSistema.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Qué sistema de facturación opera la empresa?
                            </label>
                            <div className="space-y-2">
                                {[
                                    { value: "contpaqi", label: "CONTPAQi" },
                                    { value: "aspel_facture", label: "Aspel Facture" },
                                ].map((servicio) => (
                                    <label key={servicio.value} className="flex items-center">
                                        <input
                                            type="radio"
                                            value={servicio.value}
                                            {...register("sistemaFacturacion", {
                                                required: "Selecciona al menos un servicio"
                                            })}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700">{servicio.label}</span>
                                    </label>
                                ))}

                                {/* Opción Otro con input a la derecha */}
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="otro"
                                        {...register("sistemaFacturacion", {
                                            required: "Selecciona al menos un servicio"
                                        })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-gray-700 mr-2">Otro:</span>
                                    <input
                                        type="text"
                                        placeholder="Especifica el sistema"
                                        {...register("otroSistemaFacturacion", {
                                            validate: (value) =>
                                                watch("sistemaFacturacion") === "otro"
                                                    ? value.trim() !== "" || "Especifica el sistema"
                                                    : true,
                                        })}
                                        disabled={watch("sistemaFacturacion") !== "otro"}
                                        className={`ml-2 w-1/2 text-sm bg-transparent border-0 border-b-2 border-blue-200 ${watch("sistemaFacturacion") === "otro"
                                            ? "focus:border-gray-300 focus:outline-none focus:ring-0"
                                            : "border-gray-200 text-gray-400"
                                            }`}
                                    />

                                </label>
                            </div>

                            {errors.sistemaFacturacion && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.sistemaFacturacion.message}
                                </p>
                            )}
                            {errors.otroSistemaFacturacion && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.otroSistemaFacturacion.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tiene papeles de trabajo donde conste los cálculos de las contribuciones a los que se encuentra obligado
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('papelesTrabajo', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('papelesTrabajo') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('papelesTrabajo') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('papelesTrabajo')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('papelesTrabajo') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('papelesTrabajo') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.papelesTrabajo && <p className="text-red-500 text-sm mt-1">{errors.papelesTrabajo.message}</p>}
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Laboral</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cuenta con área de recursos humanos?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('areaRecursosHumanos', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('areaRecursosHumanos') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('areaRecursosHumanos') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('areaRecursosHumanos')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('areaRecursosHumanos') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('areaRecursosHumanos') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                                {errors.areaRecursosHumanos && <p className="text-red-500 text-sm mt-1">{errors.areaRecursosHumanos.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Todo el personal se encuentra inscrito en el IMSS
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('todoPersonalIMSS', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('todoPersonalIMSS') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('todoPersonalIMSS') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('todoPersonalIMSS')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('todoPersonalIMSS') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('todoPersonalIMSS') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.todoPersonalIMSS && <p className="text-red-500 text-sm mt-1">{errors.todoPersonalIMSS.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de empleados inscritos en el I.M.S.S.
                            </label>
                            <select
                                {...register('numeroEmpleadosIMS', {
                                    required: 'Este campo es requerido'
                                })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1-10">1-10</option>
                                <option value="11-20">11-20</option>
                                <option value="21-35">21-35</option>
                                <option value="35-50">35-50</option>
                                <option value="+50">+50</option>
                                <option value="+100">+100</option>
                            </select>
                            {errors.numeroEmpleadosIMS && <p className="text-red-500 text-sm mt-1">{errors.numeroEmpleadosIMS.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Efectúa pagos de nomina
                            </label>
                            <select
                                {...register('pagos', {
                                    required: 'Este campo es requerido'
                                })}
                                className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="semanalmente">Semanalmente</option>
                                <option value="quincenalmente">Quincenalmente</option>
                                <option value="catorcenal">Catorcenal</option>
                            </select>
                            {errors.pagos && <p className="text-red-500 text-sm mt-1">{errors.pagos.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cuénta con registro FONACOT?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('registradaFONACOT', { required: 'Esta selección es requerida' })}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('registradaFONACOT') === 'si'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('registradaFONACOT') === 'si'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            Sí
                                        </span>
                                    </div>
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('registradaFONACOT')}
                                        className="sr-only"
                                    />
                                    <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('registradaFONACOT') === 'no'
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-blue-300'
                                        }`}>
                                        <span className={`text-xs font-medium ${watch('registradaFONACOT') === 'no'
                                            ? 'text-white'
                                            : 'text-gray-700'
                                            }`}>
                                            No
                                        </span>
                                    </div>
                                </label>
                            </div>
                            {errors.registradaFONACOT && <p className="text-red-500 text-sm mt-1">{errors.registradaFONACOT.message}</p>}
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Laboral</h3>
                        {!skip && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Actualmente la empresa tiene créditos fiscales o revisiones por parte de alguna autoridad o dependencia? (IMSS, INFONAVIT, SECRETARIA DE FINANZAS, ETC)
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="si"
                                                {...register('creditoFiscal', { required: 'Esta selección es requerida' })}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('creditoFiscal') === 'si'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('creditoFiscal') === 'si'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    Sí
                                                </span>
                                            </div>
                                        </label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="no"
                                                {...register('creditoFiscal')}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('creditoFiscal') === 'no'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('creditoFiscal') === 'no'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    No
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.creditoFiscal && <p className="text-red-500 text-sm mt-1">{errors.creditoFiscal.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuenta con alguna demanda de algún trabajador?
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="si"
                                                {...register('demandasTrabajadores', { required: 'Esta selección es requerida' })}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('demandasTrabajadores') === 'si'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('demandasTrabajadores') === 'si'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    Sí
                                                </span>
                                            </div>
                                        </label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="no"
                                                {...register('demandasTrabajadores')}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('demandasTrabajadores') === 'no'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('demandasTrabajadores') === 'no'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    No
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.demandasTrabajadores && <p className="text-red-500 text-sm mt-1">{errors.demandasTrabajadores.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Realiza Actividades consideradas como vulnerables según la LFPIORPI
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="si"
                                                {...register('actividadesVulnerables', { required: 'Esta selección es requerida' })}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('actividadesVulnerables') === 'si'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('actividadesVulnerables') === 'si'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    Sí
                                                </span>
                                            </div>
                                        </label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="no"
                                                {...register('actividadesVulnerables')}
                                                className="sr-only"
                                            />
                                            <div className={`w-16 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('actividadesVulnerables') === 'no'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('actividadesVulnerables') === 'no'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    No
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.actividadesVulnerables && <p className="text-red-500 text-sm mt-1">{errors.actividadesVulnerables.message}</p>}
                                </div>
                            </>
                        )}
                        {appear1 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Qué puesto o perfil profesional desea cubrir actualmente en su empresa? (Indique el nombre del cargo y una breve descripción de las funciones principales)
                                    </label>
                                    <input
                                        {...register('puesto', { required: 'Este campo es requerido' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.puesto && <p className="text-red-500 text-sm mt-1">{errors.puesto.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Desde hace cuánto tiempo se encuentra disponible su vacante?
                                    </label>
                                    <select
                                        {...register('tiempoVacante', {
                                            required: 'Este campo es requerido'
                                        })}
                                        className="w-full p-2 rounded-3xl text-center border-2 border-blue-200 focus:outline-none focus:border-gray-500 focus:ring-0"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="una_semana">Una semana</option>
                                        <option value="mas_de_una_semana">Más de una semana</option>
                                        <option value="un_mes">Un Mes</option>
                                        <option value="mas_de_un_mes">Más de un Mes</option>
                                    </select>
                                    {errors.tiempoVacante && <p className="text-red-500 text-sm mt-1">{errors.tiempoVacante.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuál es el rango salarial que ofrece para este puesto?  (Indique el monto neto mensual o semanal)
                                    </label>
                                    <input
                                        {...register('rangoSalarial', { required: 'Este campo es requerido' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.rangoSalarial && <p className="text-red-500 text-sm mt-1">{errors.rangoSalarial.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿La vacante está contemplada como una posición permanente o temporal?
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { value: "permanente", label: "Permanente" }
                                        ].map((servicio) => (
                                            <label key={servicio.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value={servicio.value}
                                                    {...register("posicionVacante", {
                                                        required: "Selecciona al menos un servicio"
                                                    })}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-gray-700">{servicio.label}</span>
                                            </label>
                                        ))}

                                        {/* Opción Otro con input a la derecha */}
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="temporal"
                                                {...register("posicionVacante", {
                                                    required: "Selecciona al menos un servicio"
                                                })}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-gray-700 mr-2">Por período determinado:</span>
                                            <input
                                                type="text"
                                                placeholder="Especifica duracion"
                                                {...register("duracion", {
                                                    validate: (value) =>
                                                        watch("posicionVacante") === "temporal"
                                                            ? value.trim() !== "" || "Especifica duracion"
                                                            : true,
                                                })}
                                                disabled={watch("posicionVacante") !== "temporal"}
                                                className={`ml-2 w-1/2 text-sm bg-transparent border-0 border-b-2 border-blue-200 ${watch("posicionVacante") === "temporal"
                                                    ? "focus:border-gray-300 focus:outline-none focus:ring-0"
                                                    : "border-gray-200 text-gray-400"
                                                    }`}
                                            />

                                        </label>
                                    </div>

                                    {errors.posicionVacante && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.posicionVacante.message}
                                        </p>
                                    )}
                                    {errors.duracion && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.duracion.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        {appear2 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿En qué zona o localidad de Oaxaca se encuentra ubicada su empresa o almacén?
                                    </label>
                                    <input
                                        {...register('zonaLocalidad', { required: 'Este campo es requerido' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.zonaLocalidad && <p className="text-red-500 text-sm mt-1">{errors.zonaLocalidad.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuál es su horario de operación? (Por ejemplo: lunes a viernes de 9:00 a 18:00 hrs)
                                    </label>
                                    <input
                                        {...register('horarioOperacion', { required: 'Este campo es requerido' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.horarioOperacion && <p className="text-red-500 text-sm mt-1">{errors.horarioOperacion.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuál es el tipo de necesidad sobre inventarios que le gustaría cotizar?
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { value: "levantamiento_inicial", label: "Levantamiento inicial de inventario para implementar un nuevo sistema de control" },
                                            { value: "inventario_fisico", label: "Inventario físico por cambio de sistema interno" },
                                            { value: "auditoria_inventario", label: "Auditoría de inventario para confrontar existencias físicas con el sistema actual" },
                                        ].map((servicio) => (
                                            <label key={servicio.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value={servicio.value}
                                                    {...register("tipoNecesidad", {
                                                        required: "Selecciona al menos un servicio"
                                                    })}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="ml-2 text-gray-700">{servicio.label}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {errors.tipoNecesidad && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tipoNecesidad.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuenta actualmente con un sistema de control de inventarios?
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="si"
                                                {...register('sistemaControl', { required: 'Esta selección es requerida' })}
                                                className="sr-only"
                                            />
                                            <div className={`w-24 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('sistemaControl') === 'si'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('sistemaControl') === 'si'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    Sí
                                                </span>
                                            </div>
                                        </label>

                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value="no"
                                                {...register('sistemaControl')}
                                                className="sr-only"
                                            />
                                            <div className={`w-24 h-8 rounded-full border-2 flex items-center justify-center relative transition-colors duration-200 ${watch('sistemaControl') === 'no'
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'border-blue-300'
                                                }`}>
                                                <span className={`text-xs font-medium ${watch('sistemaControl') === 'no'
                                                    ? 'text-white'
                                                    : 'text-gray-700'
                                                    }`}>
                                                    No
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    {errors.sistemaControl && (
                                        <p className="text-red-500 text-sm mt-1">{errors.sistemaControl.message}</p>
                                    )}

                                    {watch('sistemaControl') === 'si' && (
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Indique el nombre del sistema que utiliza:
                                            </label>
                                            <input
                                                {...register('nombreSistema', { required: 'El nombre del sistema es requerido' })}
                                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                            />
                                            {errors.nombreSistema && (
                                                <p className="text-red-500 text-sm mt-1">{errors.nombreSistema.message}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuáles son los principales productos o categorías de artículos que maneja en su almacén?
                                    </label>
                                    <input
                                        {...register('productos', { required: 'Los productos son requeridos' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.productos && <p className="text-red-500 text-sm mt-1">{errors.productos.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ¿Cuántos productos (aproximadamente) conforman su catálogo o inventario?
                                    </label>
                                    <input
                                    type="number"
                                        {...register('cantidadProductos', { required: 'La cantidad de productos es requerida' })}
                                        className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                                    />
                                    {errors.cantidadProductos && <p className="text-red-500 text-sm mt-1">{errors.cantidadProductos.message}</p>}
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comentarios o dudas que desees tratar en la asesoría:
                            </label>
                            <input
                                {...register('comentarios')}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-blue-200 bg-transparent focus:outline-none focus:border-gray-500 focus:ring-0"
                            />
                            {errors.comentarios && <p className="text-red-500 text-sm mt-1">{errors.comentarios.message}</p>}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2"
                    style={{
                        background: 'linear-gradient(to right, #202282, #47C9FF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                    Registro de Asesoría Contable
                </h1>
                <p className="text-gray-600">Completa todos los pasos para obtener tu asesoría y cotización personalizada</p>
            </div>

            {/* Desktop/Tablet View */}
            <div className="hidden sm:block mb-8" ref={formRef}>
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${index < currentStep
                                ? 'bg-green-500 border-green-500 text-white'
                                : index === currentStep
                                    ? 'border-blue-500 text-blue-500 bg-blue-50'
                                    : 'border-gray-300 text-gray-400'
                                }`}>
                                {index < currentStep ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-medium">{index + 1}</span>
                                )}
                            </div>
                            <div className="ml-3 flex-1">
                                <p className={`text-sm font-medium ${index === currentStep ? 'text-blue-600' : 'text-gray-500'
                                    }`}>
                                    {step.name}
                                </p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-4 ${index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                                    }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden mb-8" ref={formRef}>
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Step {currentStep + 1} of {steps.length}</span>
                        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Current Step Info */}
                <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-2 mb-2 ${currentStep < steps.length
                        ? 'border-blue-500 text-blue-500 bg-blue-50'
                        : 'bg-green-500 border-green-500 text-white'
                        }`}>
                        {currentStep >= steps.length ? (
                            <Check className="w-6 h-6" />
                        ) : (
                            <span className="text-lg font-medium">{currentStep + 1}</span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {steps[currentStep]?.name || 'Complete'}
                    </h3>
                </div>

                {/* Mini Steps Indicators */}
                <div className="flex items-center justify-center mt-4 space-x-2">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${index < currentStep
                                ? 'bg-green-500'
                                : index === currentStep
                                    ? 'bg-blue-500'
                                    : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {alert && (
                <Alert
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                />
            )}

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`${currentStep !== index ? 'hidden' : ''}`}
                        >
                            {renderStepContent(index)}
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium ${currentStep === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Anterior
                    </button>

                    {currentStep === steps.length - 1 ? (
                        <button
                            type="submit"
                            className="flex items-center px-8 py-3 rounded-lg font-medium text-white"
                            style={{
                                background: 'linear-gradient(45deg, #202282, #47C9FF 50%, #202282)',
                            }}
                        >
                            Enviar Solicitud
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center px-6 py-3 rounded-lg font-medium text-white"
                            style={{
                                background: 'linear-gradient(45deg, #202282, #47C9FF 50%, #202282)',
                            }}
                        >
                            Siguiente
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default StepsForm