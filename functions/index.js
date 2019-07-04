const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
/**------------------------------------------------ */
/**-------------display from database--------------- */
/**------------------------------------------------ */

app.get('/abc', (req, res) => {
    admin.firestore().collection('screams').get()
    .then(data => {
        let screams=[];
        data.forEach(doc => {
            screams.push(doc.data());
        });
        return res.json(screams);
    })
    .catch(err => console.error(err));
});


/**------------------------------------------------ */
/**-------------insert into database--------------- */
/**------------------------------------------------ */


 exports.createScream = functions.https.onRequest((req, res) => {
     if(req.method !=='POST'){
         return res.status(400).json({ error: 'Method not allowd'});
     }
   const newScream = {
       p_name: req.body.p_name,
       p_type: req.body.p_type,
       o_country: req.body.o_country,
       u_name: req.body.u_name,
       u_phone: req.body.u_phone,
       u_email: req.body.u_email,
       u_website: req.body.u_website,
       u_business: req.body.u_business
      
   };
   admin.firestore()
   .collection('screams')
   .add(newScream)
   .then(doc => {
       if(doc || doc.exists){
       return res.json({ message: `document created sucess`})
       }
       else{
        throw new Error("Profile doesn't exist")
       }
       
   })
   .catch(err => {
       res.status(500).json({ error: 'something wrong'});
       console.error(err);
   })

 });


 /**----------------POST method route------------------------ */
app.post('/mypost', (req, res) => {
   const newScream = {       
       email: req.body.email,
       password: req.body.password     
   };

   
   admin.firestore()
   .collection('user')
   .add(newScream)
   .then(doc => {
       if(doc || doc.exists){
       return res.json({ message: `document ${doc.id} created sucessfully post method used`})
       }
       else{
        throw new Error("Profile doesn't exist")
       }
       
   })
   .catch(err => {
       res.status(500).json({ error: 'something wrong'});
       console.error(err);
   });
  });
 





 exports.api = functions.https.onRequest(app);