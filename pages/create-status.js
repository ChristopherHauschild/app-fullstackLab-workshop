import React, { useState } from 'react'
import auth0 from '../lib/auth0'
import axios from 'axios'

const CreateStatus = () => {
    const [dados, setDados] = useState({
        status: 'bem',
        coords: {
            lat: null,
            long: null
        }
    })
    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                setDados(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    }
    const onStatusChange = evt => {
        const value = evt.target.value
        setDados(old => {
            return {
                ...old,
                status: value
            }
        })
    }
    const save = async () => {
        await axios.post('/api/save-status', dados)
    }

    return (
        <div className='font-sans text-2xl text-black mt-12'>
            <h1 className='text-center'>Criar Status</h1>
            <label className='block ml-32 mt-12'>
                <input type='radio' name='status' value='Bem' onClick={onStatusChange} /> Estou bem e sem sintomas.
        </label>
            <label className='block ml-32 my-4'>
                <input type='radio' name='status' value='Gripe ou resfriado' onClick={onStatusChange} /> Estou com sintomas de gripe / resfriado.
        </label>
            <label className='block ml-32 my-4'>
                <input type='radio' name='status' value='Covid' onClick={onStatusChange} /> Estou com sintomas da Covid-19.
        </label>
            <div className='font-sans text-2xl text-black text-center block mx-auto mt-16' >Sua posição atual: {JSON.stringify(dados)}</div>
            <br />
            <button className='py-4 px-12 rounded bg-pink-900 shadow-xl hover:shadow block w-1/8 text-center mt-8 mx-auto text-white text-xl' onClick={getMyLocation}>Pegar minha localização</button>
            <button className='py-4 px-4 rounded bg-pink-900 shadow-xl hover:shadow block w-1/4 text-center mt-4 mx-auto text-white text-xl' onClick={save}>Salvar meu status</button>
            <a href='/app' className='mt-8 my-20 text-gray-800 underline text-center block mx-auto text-xl'> Verificar Status </a>
        </div>
    )
}

export default CreateStatus

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if (session) {
        return {
            props: {
                isAuth: true,
                user: session.user
            }
        }
    }
    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}