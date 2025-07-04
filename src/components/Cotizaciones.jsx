import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebaseConection";

const Cotizaciones = () => {
    const [clientes, setClientes] = useState([]);

    const getCotizaciones = async () => {
        const collectionRef = collection(db, "clientes");
        const docsSnapshot = await getDocs(collectionRef);
        const docs = docsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(docs)
        setClientes(docs);
    };

    useEffect(() => {
        getCotizaciones();
    }, []);

    return (
        <main className="p-8 flex flex-col gap-8 text-center">
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
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente, index) => (
                            <tr key={cliente.id || index} className="hover:bg-gray-50 transition-colors">
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
                                <td className="border border-gray-300 px-4 py-3 font-medium">{cliente.servicios}</td>
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
                                <td className="border border-gray-300 px-4 py-3">{cliente.creditosBancarios}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.facturasIngresos}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.facturasProveedores}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.pagoOportunamente}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.obligacionesFiscales}</td>
                                <td className="border border-gray-300 px-4 py-3">{cliente.auditoriasPorAutoridades}</td>
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