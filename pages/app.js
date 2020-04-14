import React, { useEffect } from 'react'
import auth0 from '../lib/auth0'
import router from 'next/router'
import { db } from '../lib/db'
import { distance } from '../lib/geo'



const App = (props) => {
    useEffect(() => {
        if (!props.isAuth) {
            router.push('/')
        } else if (props.forceCreate) {
            router.push('/create-status')
        }
    })
    if (!props.isAuth || props.forceCreate) {
        return null
    }
    return (
        <div>
            <h1 className='font-sans text-2xl text-black my-12 block text-center'> Status próximos a você</h1>
            <table className='block text-center'>
                {
                    props.checkins.map(checkin => {
                        return (
                            <tr className='font-sans text-2xl text-black block text-center'>
                                <td className='block text-center text-pink-800 font-semibold'>{checkin.id === props.user.sub && 'Seu status: '}</td><br/>
                                <td className='block text-center'>{checkin.status}</td>
                                <td className='block text-center'>{JSON.stringify(checkin.coords)}</td>
                                <td className='block text-center'>{' Distância: ' + checkin.distance}</td>
                            </tr>
                        )
                    })
                }
            </table>
            <a href='/create-status' className='py-4 px-2 rounded bg-pink-900 font-bold shadow-xl hover:shadow block w-1/4 text-center block mx-auto mt-12 text-white'>Atualizar informações</a>
            <a href='https://mydailystatus.christopherhauschild.now.sh/' className='py-4 px-2 rounded bg-pink-900 font-bold shadow-xl hover:shadow block w-1/4 text-center block mx-auto my-20 mt-8 text-white'>Sair</a>
        </div>
    )
}

export default App

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if (session) {
        const today = new Date()
        const currentDate =
            today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        const todaysCheckin = await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()

        const todaysData = todaysCheckin.data()
        let forceCreate = true

        if (todaysData) {
            forceCreate = false
            const checkins = await db.collection('markers')
                .doc(currentDate)
                .collection('checks')
                .near({
                    center: todaysData.coordinates,
                    radius: 1000
                })
                .get()
            const checkinsList = []
            checkins.docs.forEach(doc => {
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longitude
                    },
                    distance: distance(
                        todaysData.coordinates.latitude,
                        todaysData.coordinates.longitude,
                        doc.data().coordinates.latitude,
                        doc.data().coordinates.longitude
                    ).toFixed(2)
                })
            })
            return {
                props: {
                    isAuth: true,
                    user: session.user,
                    forceCreate: false,
                    checkins: checkinsList
                }
            }
        }

        return {
            props: {
                isAuth: true,
                user: session.user,
                forceCreate
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
