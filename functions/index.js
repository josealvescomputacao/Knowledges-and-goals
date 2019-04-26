const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.token = functions.https.onRequest((request, response) => {   
    const idToken = request.query.token
    admin.auth().verifyIdToken(idToken)
    .then( decodedToken => {
        response.header("Access-Control-Allow-Origin", "*");
        response.send(decodedToken.uid)  
        return 
    }).catch( error => {
        response.send(error.errorInfo.code)
        return
    })  
}) 