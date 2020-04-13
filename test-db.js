const admin = require('firebase-admin')
const secret = require('./firebase-secret.json')
const { GeoFirestore } = require('geofirestore')

admin.initializeApp({
    credential: admin.credential.cert(secret)
})

const firestore = admin.firestore()
const db = new GeoFirestore(firestore)

db
    .collection('test')
    .add({
        test: 1,
        coordinates: new admin.firestore.GeoPoint(-20.21890, -45.93900)
    })
    .then(() => {
        console.log('ok')
    })