import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebaseConection";
import * as XLSX from 'xlsx';

const Cotizaciones = () => {
    const [clientes, setClientes] = useState([]);

    const getCotizaciones = async () => {
        const collectionRef = collection(db, "clientes");
        const docsSnapshot = await getDocs(collectionRef);
        const docs = docsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        // Ordenar por fecha (de más reciente a más antigua)
        const sortedDocs = docs.sort((a, b) => {
            // Convertir las fechas de Firestore a timestamps para comparar
            const dateA = a.fecha?.toDate ? a.fecha.toDate().getTime() : 0;
            const dateB = b.fecha?.toDate ? b.fecha.toDate().getTime() : 0;
            return dateB - dateA; // Orden descendente (más reciente primero)
        });
    
        setClientes(sortedDocs);
    };

    const exportarAExcel = (cliente) => {
        // Crear los datos para el Excel
        const datosExcel = [
            ['Campo', 'Valor'],
            ['Fecha', cliente.fecha?.toDate ? cliente.fecha.toDate().toLocaleString("es-MX", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "America/Mexico_City",
            }) : cliente.fecha],
            ['Aceptar Políticas', cliente.aceptoPol ? 'Sí' : 'No'],
            ['Servicios', Array.isArray(cliente.servicios)
                ? cliente.servicios.join(", ")
                : cliente.servicios || ''],
            ['Residencia', cliente.residencia || ''],
            ['Nombre', cliente.nombre || ''],
            ['Teléfono', cliente.telefono || ''],
            ['Email', cliente.email || ''],
            ['Persona', cliente.persona === 'fisica' ? "Persona física" : "Persona Moral"],
            ['Representante Legal', cliente.persona === 'moral' ? cliente.representanteLegal : '/'],
            ['Domicilio', cliente.domicilio || '/'],
            ['Empresa', cliente.empresa || ''],
            ['RFC', cliente.rfc || ''],
            ['Giro de la Empresa', cliente.giroEmpresa || ''],
            ['Cuentas Aperturadas', cliente.cuentasAperturadas || ''],
            ['Tarjetas de Crédito', cliente.tarjetasCredito || ''],
            ['Número de Tarjetas', cliente.tarjetasCredito == 'si' ? cliente.numeroTarjetas : '/'],
            ['Créditos Bancarios', Array.isArray(cliente.creditosBancarios)
                ? cliente.creditosBancarios.join(", ")
                : cliente.creditosBancarios || ''],
            ['Facturas Ingresos', cliente.facturasIngresos || ''],
            ['Facturas Proveedores', cliente.facturasProveedores || ''],
            ['Pago Oportunamente', cliente.pagoOportunamente || ''],
            ['Obligaciones Fiscales', Array.isArray(cliente.obligacionesFiscales)
                ? cliente.obligacionesFiscales.join(", ")
                : cliente.obligacionesFiscales || ''],
            ['Auditorías Por Autoridades', Array.isArray(cliente.auditoriasPorAutoridades)
                ? cliente.auditoriasPorAutoridades.join(", ")
                : cliente.auditoriasPorAutoridades || ''],
            ['Manejar Contabilidad', cliente.manejarContabilidad || ''],
            ['Sistema Contabilidad', cliente.sistemaContabilidad == 'otro' ? cliente.otroSistema : cliente.sistemaContabilidad || ''],
            ['Sistema Facturación', cliente.sistemaFacturacion == 'otro' ? cliente.otroSistemaFacturacion : cliente.sistemaFacturacion || ''],
            ['Papeles Trabajo', cliente.papelesTrabajo || ''],
            ['Área Recursos Humanos', cliente.areaRecursosHumanos || ''],
            ['Todo el personal inscrito en IMSS', cliente.todoPersonalIMSS || ''],
            ['N° Empleados IMSS inscritos', cliente.numeroEmpleadosIMS || ''],
            ['Pagos de nómina', cliente.pagos || ''],
            ['Registro FONACOT', cliente.registradaFONACOT || ''],
            ['Créditos Fiscales', cliente.creditoFiscal || ''],
            ['Demanda de algún trabajador', cliente.demandasTrabajadores || ''],
            ['Actividades Vulnerables', cliente.actividadesVulnerables || ''],
            ['Comentarios o dudas', cliente.comentarios || '']
        ];

        // Crear el libro de Excel
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(datosExcel);

        // Ajustar el ancho de las columnas
        ws['!cols'] = [
            { width: 30 }, // Columna Campo
            { width: 50 }  // Columna Valor
        ];

        // Agregar la hoja al libro
        XLSX.utils.book_append_sheet(wb, ws, "Cotización");

        // Generar el nombre del archivo
        const nombreCliente = cliente.nombre || 'Cliente';
        const fechaFormateada = cliente.fecha?.toDate ? 
            cliente.fecha.toDate().toLocaleDateString("es-MX").replace(/\//g, '-') : 
            'sin-fecha';
        const nombreArchivo = `Cotizacion_${nombreCliente}_${fechaFormateada}.xlsx`;

        // Descargar el archivo
        XLSX.writeFile(wb, nombreArchivo);
    };

    useEffect(() => {
        getCotizaciones();
    }, []);

    return (
        <main className="p-8 flex flex-col gap-8 text-center">
            <div
                className="w-full absolute top-0 left-0 md:h-full h-[400px] bg-top bg-no-repeat bg-cover -z-10"
                style={{
                    backgroundImage: "url('./img/fondo.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <h1 className='text-2xl font-bold'
                style={{
                    background: 'linear-gradient(to right, #202282, #47C9FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                Lista de cotizaciones:
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Acciones</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Fecha</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Aceptar Políticas</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Servicios</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Residencia</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Nombre</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Telefono</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Email</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Persona</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Representante Legal</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Domicilio</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Empresa</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">RFC</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Giro de la Empresa</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cuentas Aperturadas</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tarjetas de Credito</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Numero de Tarjetas</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Creditos Bancarios</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Facturas Ingresos</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Facturas Proveedores</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Pago Oportunamente</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Obligaciones Fiscales</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Auditorias Por Autoridades</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Manejar Contabilidad</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sistema Contabilidad</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Sistema Facturacion</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Papeles Trabajo</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Area Recursos Humanos</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tiene todo el personal inscritos en el IMSS</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">N° Empleados IMSS inscritos</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Pagos de nomina</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Registro FONACOT</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Creditos Fiscales</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Demanda de algun trabajador</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Actividades Vulnerables</th>
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Comentarios o dudas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={cliente.id || index} className="hover:bg-gray-50 transition-colors">
                                <td className="border border-gray-300 px-4 py-3">
                                    <button
                                        onClick={() => exportarAExcel(cliente)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                                        title="Exportar a Excel"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Excel
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-3 font-mono text-sm">
                                    {cliente.fecha?.toDate
                                        ? cliente.fecha.toDate().toLocaleString("es-MX", {
                                            dateStyle: "long",
                                            timeStyle: "short",
                                            timeZone: "America/Mexico_City", // ajusta si es necesario
                                        })
                                        : cliente.fecha}
                                </td>
                                <td className="border border-gray-300 px-4 py-3 font-medium">{cliente.aceptoPol ? 'Sí' : 'No'}</td>
                                <td className="border border-gray-300 px-4 py-3">{Array.isArray(cliente.servicios)
                                    ? cliente.servicios.join(", ")
                                    : cliente.servicios}</td>
                                <td className="border border-gray-300 px-4 py-3 font-medium">{cliente.residencia}</td>
                                <td className="border border-gray-300 px-4 py-3 font-medium">{cliente.nombre}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.telefono}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.email}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.persona === 'fisica' ? "Persona fisica" : "Persona Moral"}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.persona === 'moral' ? cliente.representanteLegal : "/"}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.domicilio ? cliente.domicilio : "/"}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.empresa}</td>
                                <td className="border border-gray-300 px-4 py-3 font-mono text-sm">{cliente.rfc}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.giroEmpresa}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.cuentasAperturadas}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.tarjetasCredito}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.tarjetasCredito == 'si' ? cliente.numeroTarjetas : '/'}</td>
                                <td className="border border-gray-300 px-4 py-3">{Array.isArray(cliente.creditosBancarios)
                                    ? cliente.creditosBancarios.join(", ")
                                    : cliente.creditosBancarios}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.facturasIngresos}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.facturasProveedores}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.pagoOportunamente}</td>
                                <td className="border border-gray-300 px-4 py-3">{Array.isArray(cliente.obligacionesFiscales)
                                    ? cliente.obligacionesFiscales.join(", ")
                                    : cliente.obligacionesFiscales}</td>
                                <td className="border border-gray-300 px-4 py-3">{Array.isArray(cliente.auditoriasPorAutoridades)
                                    ? cliente.auditoriasPorAutoridades.join(", ")
                                    : cliente.auditoriasPorAutoridades}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.manejarContabilidad}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.sistemaContabilidad == 'otro' ? cliente.otroSistema : cliente.sistemaContabilidad}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.sistemaFacturacion == 'otro' ? cliente.otroSistemaFacturacion : cliente.sistemaFacturacion}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.papelesTrabajo}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.areaRecursosHumanos}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.todoPersonalIMSS}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.numeroEmpleadosIMS}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.pagos}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.registradaFONACOT}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.creditoFiscal}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.demandasTrabajadores}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.actividadesVulnerables}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.comentarios}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {clientes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <p>No hay cotizaciones disponibles</p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Cotizaciones