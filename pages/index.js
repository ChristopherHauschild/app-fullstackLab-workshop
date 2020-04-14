import React from 'react'

const Index = () => {
    return (
        <div>
            <p className='font-sans text-2xl font-semibold text-pink-800 text-center mt-20'>Mantenha-se protegido.<br/></p>
            <p className='font-sans text-2xl text-black text-center'> Sua comunidade também.</p>  
            <p className='font-sans text-2xl font-semibold text-pink-800 text-center my-16'>Compartilhe
            como você está.</p>  
            <p className='font-sans text-2xl text-black text-center my-16'>Veja como pessoas a seu redor estão.</p>  
            <a href='/api/login' className='py-4 px-2 rounded bg-pink-900 font-bold shadow-xl hover:shadow block w-1/3 text-center mt-32 mx-auto text-white'>Comece por aqui</a>
        </div>
    )
}

export default Index

