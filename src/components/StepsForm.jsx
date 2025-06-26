import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronLeft, ChevronRight, Check, AlertCircle, CheckCircle } from 'lucide-react'
import { db } from '../db/firebaseConection'
import { collection, addDoc } from "firebase/firestore"
import { motion, AnimatePresence } from 'framer-motion'

const SuccessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Formulario Enviado!
                    </h1>
                    <p className="text-gray-600">
                        Su formulario ha sido enviado correctamente. Nos pondremos en contacto pronto.
                    </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700">
                        Gracias por confiar en nosotros. Revisaremos su información y nos comunicaremos con usted a la brevedad.
                    </p>
                </div>
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

const StepsForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccessPage, setShowSuccessPage] = useState(false)
    const [alert, setAlert] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
        setValue,
        reset
    } = useForm()

    const formRef = useRef(null)

    const steps = [
        { id: 0, name: 'Personal', title: 'Información Personal' },
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

    const nextStep = async (e) => {
        e?.preventDefault()
        const isValid = await trigger(getFieldsForStep(currentStep))
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
            scrollToForm()
        }
    }

    const prevStep = (e) => {
        e?.preventDefault()
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            scrollToForm()
        }
    }

    const scrollToForm = () => {
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }, 100)
    }

    const getFieldsForStep = (step) => {
        switch (step) {
            case 0: return ['nombre', 'telefono', 'servicio', 'residencia']
            case 1: return ['empresa', 'comercial', 'nombreRepresentanteLegal', 'domicilio', 'telefonoempresa', 'objetoCompania', 'rfc']
            case 2: return ['cuentasAperturadas', 'tarjetasCredito', 'creditosBancarios', 'clientes', 'proveedores', 'transferencias', 'facturasIngresos', 'facturasProveedores', 'auditado', 'pagosProvisionalesISR', 'pagosProvisionalesIVA', 'pagosProvisionalesInfonavit', 'pagosProvisionalesErogaciones', 'sistemaContabilidad', 'papelesTrabajo', 'personalContabilidad', 'archivoFiscal', 'estadosFinancieros', 'auxiliaresCuentas', 'registroOperaciones', 'sistemaFacturacion']
            case 3: return ['areaRecursosHumanos', 'numeroEmpleadosIMS', 'pagos', 'registroPatronal', 'expedienteParticular', 'tarjetaControlGeneral', 'expedienteIMSS', 'todoPersonalIMSS', 'registradaFONACOT']
            case 4: return ['creditoFiscal', 'demandasTrabajadores', 'actividadesVulnerables']
            default: return []
        }
    }


    const saveDataToFirebase = async () => {
        const formData = getValues()

        try {
            const docRef = await addDoc(collection(db, "clientes"), formData)
            return { success: true, id: docRef.id }
        } catch (error) {
            console.error("Error saving document: ", error)
            throw new Error('Error al guardar en la base de datos')
        }
    }

    const onSubmit = async () => {
        if (isSubmitting) return

        setIsSubmitting(true)
        showAlert('info', 'Enviando formulario...', 'Por favor espere...', 0)

        try {
            // Validación final de todos los campos
            const isValid = await trigger()
            if (!isValid) {
                throw new Error('Por favor complete todos los campos requeridos')
            }

            const result = await saveDataToFirebase()


            setShowSuccessPage(true)


            // Resetear formulario después de éxito
            reset()
            setCurrentStep(0)

        } catch (error) {
            console.error('Submission error:', error)
            showAlert('error',
                'Error',
                error.message || 'Ocurrió un error al enviar el formulario. Por favor intente nuevamente.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    // Si se debe mostrar la página de éxito, renderizarla
    if (showSuccessPage) {
        return <SuccessPage />
    }

    const renderStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre Completo: *
                                </label>
                                <input
                                    {...register('nombre', { required: 'El nombre es requerido' })}
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
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
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                                />
                                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Servicio a cotizar (Puedes marcar más de una) *
                                </label>
                                <select
                                    {...register('servicio', { required: 'Selecciona un servicio' })}
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="curp">CURP</option>
                                    <option value="rfc">RFC</option>
                                    <option value="ine">INE</option>
                                    <option value="pasaporte">Pasaporte</option>
                                </select>
                                {errors.servicio && <p className="text-red-500 text-sm mt-1">{errors.servicio.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lugar de Residencia Actual (Estado) *
                                </label>
                                <select
                                    {...register('residencia', { required: 'Selecciona un servicio' })}
                                    className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="curp">Oaxaca</option>
                                    <option value="rfc">Veracruz</option>
                                    <option value="ine">Tabasco</option>
                                    <option value="pasaporte">Chiapas</option>
                                </select>
                                {errors.residencia && <p className="text-red-500 text-sm mt-1">{errors.residencia.message}</p>}
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Datos de Identificación</h3>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Nombre o Razon social de la empresa: *
                            </label>
                            <input
                                {...register('empresa', { required: 'El nombre de la empresa es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.empresa && <p className="text-red-500 text-sm mt-1">{errors.empresa.message}</p>}
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Nombre Comercial: *
                            </label>
                            <input
                                {...register('comercial', { required: 'El nombre comercial es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.comercial && <p className="text-red-500 text-sm mt-1">{errors.comercial.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de Representante Legal *
                            </label>
                            <input
                                {...register('nombreRepresentanteLegal', { required: 'El nombre del representante legal es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.nombreRepresentanteLegal && <p className="text-red-500 text-sm mt-1">{errors.nombreRepresentanteLegal.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Domicilio *
                            </label>
                            <input
                                {...register('domicilio', { required: 'El domicilio es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.domicilio && <p className="text-red-500 text-sm mt-1">{errors.domicilio.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teléfono *
                            </label>
                            <input
                                {...register('telefonoempresa', { required: 'El teléfono es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.telefonoempresa && <p className="text-red-500 text-sm mt-1">{errors.telefonoempresa.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Objeto de la compañía
                            </label>
                            <select
                                {...register('objetoCompania', { required: 'Selecciona un objeto de la compania' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="curp">CURP</option>
                                <option value="rfc">RFC</option>
                                <option value="ine">INE</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                            {errors.objetoCompania && <p className="text-red-500 text-sm mt-1">{errors.objetoCompania.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                RFC: *
                            </label>
                            <input
                                {...register('rfc', { required: 'El RFC es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.rfc && <p className="text-red-500 text-sm mt-1">{errors.rfc.message}</p>}
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
                            <input
                                type="number"
                                min={0}
                                {...register('cuentasAperturadas', { required: 'El número de cuentas es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.cuentasAperturadas && <p className="text-red-500 text-sm mt-1">{errors.cuentasAperturadas.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Manejan Tarjetas de crédito?:*
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('tarjetasCredito', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('tarjetasCredito')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.tarjetasCredito && <p className="text-red-500 text-sm mt-1">{errors.tarjetasCredito.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cuenta la empresa con créditos bancarios, hipotecarios, etc: *
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('creditosBancarios', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('creditosBancarios')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.creditosBancarios && <p className="text-red-500 text-sm mt-1">{errors.creditosBancarios.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Señale el número apróximado de clientes con que cuenta la empresa:
                            </label>
                            <input
                                type="number"
                                min={0}
                                {...register('clientes', { required: 'El numero de clientes es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.clientes && <p className="text-red-500 text-sm mt-1">{errors.clientes.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Indique el número aproximado de los proveedores:
                            </label>
                            <input
                                type="number"
                                min={0}
                                {...register('proveedores', { required: 'El numero de proveedores es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.proveedores && <p className="text-red-500 text-sm mt-1">{errors.proveedores.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Señale aproximadamente, movimientos mensuales de: <strong>Transferencias</strong>
                            </label>
                            <input
                                {...register('transferencias', { required: 'El numero de transferencias es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.transferencias && <p className="text-red-500 text-sm mt-1">{errors.transferencias.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Señale aproximadamente, movimientos mensuales de: <strong>Facturas de Ingresos</strong>
                            </label>
                            <input
                                {...register('facturasIngresos', { required: 'El numero de facturas de ingresos es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.facturasIngresos && <p className="text-red-500 text-sm mt-1">{errors.facturasIngresos.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Señale aproximadamente, movimientos mensuales de: <strong>Facturas de Proveedores</strong>
                            </label>
                            <input
                                {...register('facturasProveedores', { required: 'El numero de facturas de proveedores es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.facturasProveedores && <p className="text-red-500 text-sm mt-1">{errors.facturasProveedores.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿La empresa se ha auditado en ejercicios anteriores?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('auditado', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('auditado')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.auditado && <p className="text-red-500 text-sm mt-1">{errors.auditado.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                La empresa presenta oportunamente los pagos provisionales del I.S.R.
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('pagosProvisionalesISR', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('pagosProvisionalesISR')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.pagosProvisionalesISR && <p className="text-red-500 text-sm mt-1">{errors.pagosProvisionalesISR.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                La empresa presenta oportunamente los pagos provisionales del I.V.A.
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('pagosProvisionalesIVA', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('pagosProvisionalesIVA')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.pagosProvisionalesIVA && <p className="text-red-500 text-sm mt-1">{errors.pagosProvisionalesIVA.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                La empresa presenta oportunamente los pagos provisionales del INFONAVIT E I.M.S.S.
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('pagosProvisionalesInfonavit', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('pagosProvisionalesInfonavit')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.pagosProvisionalesInfonavit && <p className="text-red-500 text-sm mt-1">{errors.pagosProvisionalesInfonavit.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                La empresa presenta oportunamente los pagos provisionales de Erogaciones
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('pagosProvisionalesErogaciones', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('pagosProvisionalesErogaciones')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.pagosProvisionalesErogaciones && <p className="text-red-500 text-sm mt-1">{errors.pagosProvisionalesErogaciones.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Qué sistema de contabilidad utiliza?
                            </label>
                            <input
                                {...register('sistemaContabilidad', { required: 'El sistema de contabilidad es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.sistemaContabilidad && <p className="text-red-500 text-sm mt-1">{errors.sistemaContabilidad.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Se cuenta con los papeles de trabajo en los que constan los cálculos mensuales o bimestrales de las contribuciones citadas en el punto anterior?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('papelesTrabajo', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('papelesTrabajo')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.papelesTrabajo && <p className="text-red-500 text-sm mt-1">{errors.papelesTrabajo.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cómo está integrado el personal que maneja la contabilidad?
                            </label>
                            <input
                                {...register('personalContabilidad', { required: 'El personal de contabilidad es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.personalContabilidad && <p className="text-red-500 text-sm mt-1">{errors.personalContabilidad.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cuenta con un archivo fiscal en el que se conserven las declaraciones de los 5 últimos ejercicios?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('archivoFiscal', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('archivoFiscal')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.archivoFiscal && <p className="text-red-500 text-sm mt-1">{errors.archivoFiscal.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Se preparan periódicamente estados financieros y sus relaciones analíticas?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('estadosFinancieros', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('estadosFinancieros')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.estadosFinancieros && <p className="text-red-500 text-sm mt-1">{errors.estadosFinancieros.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Se cuenta con los auxiliares de cuentas de balance y de resultados?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('auxiliaresCuentas', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('auxiliaresCuentas')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.auxiliaresCuentas && <p className="text-red-500 text-sm mt-1">{errors.auxiliaresCuentas.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿El registro de operaciones se realiza dentro de la empresa o en el despacho que presta el servicio?
                            </label>
                            <input
                                {...register('registroOperaciones', { required: 'El registro de operaciones es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.registroOperaciones && <p className="text-red-500 text-sm mt-1">{errors.registroOperaciones.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Qué sistema de facturación opera la empresa?
                            </label>
                            <input
                                {...register('sistemaFacturacion', { required: 'El sistema de facturación es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.sistemaFacturacion && <p className="text-red-500 text-sm mt-1">{errors.sistemaFacturacion.message}</p>}
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
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('areaRecursosHumanos', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('areaRecursosHumanos')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.areaRecursosHumanos && <p className="text-red-500 text-sm mt-1">{errors.areaRecursosHumanos.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de empleados inscritos en el I.M.S.S.
                            </label>
                            <input
                                type="number"
                                min="0"
                                {...register('numeroEmpleadosIMS', { required: 'El número de empleados es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.numeroEmpleadosIMS && <p className="text-red-500 text-sm mt-1">{errors.numeroEmpleadosIMS.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Los pagos por concepto de sueldos y salarios se realizan semanalmente o quincenalmente
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="semanalmente"
                                        {...register('pagos', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Semanalmente</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="quincenalmente"
                                        {...register('pagos')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Quincenalmente</span>
                                </label>
                            </div>
                            {errors.pagos && <p className="text-red-500 text-sm mt-1">{errors.pagos.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Registro (s) Patronal (es)
                            </label>
                            <input
                                type="number"
                                min="0"
                                {...register('registroPatronal', { required: 'El registro patronal es requerido' })}
                                className="w-full px-0 pb-2 border-0 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 focus:ring-0"
                            />
                            {errors.registroPatronal && <p className="text-red-500 text-sm mt-1">{errors.registroPatronal.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Se cuenta con expediente particular de los trabajadores?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('expedienteParticular', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('expedienteParticular')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.expedienteParticular && <p className="text-red-500 text-sm mt-1">{errors.expedienteParticular.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Se cuenta con alguna tarjeta de control general que permita identificar la antigüedad de cada uno de los trabajadores?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('tarjetaControlGeneral', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('tarjetaControlGeneral')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.tarjetaControlGeneral && <p className="text-red-500 text-sm mt-1">{errors.tarjetaControlGeneral.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                La empresa cuenta con expediente del IMSS que contenga liquidaciones mensuales, bimestrales, sipares, comprobantes de pago de cuotas, incapacidades, etc.
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('expedienteIMSS', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('expedienteIMSS')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.expedienteIMSS && <p className="text-red-500 text-sm mt-1">{errors.expedienteIMSS.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Todo el personal se encuentra inscrito en el IMSS
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('todoPersonalIMSS', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('todoPersonalIMSS')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.todoPersonalIMSS && <p className="text-red-500 text-sm mt-1">{errors.todoPersonalIMSS.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Se encuentra la empresa registrada en el FONACOT
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('registradaFONACOT', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('registradaFONACOT')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Actualmente la empresa tiene créditos fiscales o revisiones por parte de alguna autoridad o dependencia? (IMSS, INFONAVIT, SECRETARIA DE FINANZAS, ETC)
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('creditoFiscal', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('creditoFiscal')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.creditoFiscal && <p className="text-red-500 text-sm mt-1">{errors.creditoFiscal.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ¿Cuenta con alguna demanda de algún trabajador?
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('demandasTrabajadores', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Si</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('demandasTrabajadores')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.demandasTrabajadores && <p className="text-red-500 text-sm mt-1">{errors.demandasTrabajadores.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Realiza Actividades consideradas como vulnerables según la LFPIORPI
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="si"
                                        {...register('actividadesVulnerables', { required: 'Esta selección es requerida' })}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">Sí</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="no"
                                        {...register('actividadesVulnerables')}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-700">No</span>
                                </label>
                            </div>
                            {errors.actividadesVulnerables && <p className="text-red-500 text-sm mt-1">{errors.actividadesVulnerables.message}</p>}
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
                <p className="text-gray-600">Completa todos los pasos para obtener tu cotización personalizada</p>
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