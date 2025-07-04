import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className='principal'>
            <Header/>
            <main className="py-8 md:px-96 px-6 flex flex-col gap-8 text-center">
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'
                        style={{
                            background: 'linear-gradient(to right, #202282, #47C9FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                        ¿NECESITAS PONER EN ORDEN TU CONTABILIDAD?
                    </h1>
                    <p className='text-lg'>Regístrate para una asesoría y una cotización personalizada</p>
                </div>
                <div>
                    <p className='text-lg p-6 rounded-3xl shadow-lg border border-gray-200 bg-white'>
                        En Contagramm analizamos tu situación fiscal y te orientamos sobre la mejor solución contable para tu negocio, ya seas emprendedor, pyme o profesionista independiente.
                    </p>
                </div>

                <div className="relative w-full max-w-[1200px] mx-auto -mt-20 -mb-12">
                    <img 
                        src="./img/imagenInicio.png" 
                        alt="Imagen 1" 
                        className="w-full h-auto object-cover"
                    />
                </div>
                
                <div className="flex justify-center">
                    <button 
                        onClick={() => navigate('/asesorias')} 
                        className='text-white text-2xl p-5 rounded-2xl w-80 hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-3' 
                        style={{
                            background: 'linear-gradient(45deg, #202282, #47C9FF 50%, #202282)',
                        }}
                    >
                        REGISTRARSE
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </main>
            
            <Footer/>
        </div>
    )
}

export default Home