import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className='principal'>
        <Header/>
        <main className="p-8 flex flex-col gap-8 text-center">
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
                <p className='text-lg'>En Contagramm analizamos tu situación fiscal y te orientamos sobre la mejor solución contable para tu negocio, ya seas emprendedor, pyme o profesionista independiente.</p>
            </div>
            <div>
                <button 
                    onClick={() => navigate('/asesorias')} 
                    className='text-white text-2xl p-5 rounded-2xl w-80 hover:opacity-90 transition-opacity cursor-pointer' 
                    style={{
                        background: 'linear-gradient(45deg, #202282, #47C9FF 50%, #202282)',
                    }}
                >
                    REGISTRARSE
                </button>
            </div>
            <div>
                <div className="flex flex-col justify-center gap-4">
                    <img src="./img/con-1.jpg" alt="Imagen 1" className=" bg-gray-200 rounded" />
                    <img src="./img/con-2.webp" alt="Imagen 2" className=" bg-gray-200 rounded" />
                    <img src="./img/con-3.jpg" alt="Imagen 3" className=" bg-gray-200 rounded" />
                </div>
            </div>
        </main>
        <Footer/>
        </div>
    )
}

export default Home