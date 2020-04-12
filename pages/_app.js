import React from 'react'
import '../styles/styles.css'
import Header from '../components/header'
import Footer from '../components/footer'

const App = ({ Component, pageProps }) => {
    return (
        <div>
            <Header />
            <div className='min-h-screen container mx-auto'>
                <Component {...pageProps} />
            </div>
            <Footer />
        </div>
    )
}

export default App