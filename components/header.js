import React from 'react'
import NavBar from './navBar'

const Header = () => {
    return(
        <div className='bg-gray-200'>
                <h1>
                    <img className='h-24 mx-auto py-3' src='/logo.png' alt='Logotipo' height='60' />
                </h1>
            <NavBar />    
            </div>
    )
}

export default Header