const { config } = require('dotenv');
config();
const twilio = require('twilio')(process.env.SID, process.env.AUTH);
const admin = require("firebase-admin");
const serviceAccount = require('../../firebase.json');

const creds = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}

if (!admin.apps.length) {
  admin.initializeApp({
      credential: admin.credential.cert(creds)
  });
}

const db = admin.firestore();

db.collection("/stocks").onSnapshot(async (snap) => {
  console.log("STOCKS UPDATED")
  db.collection("/account").listDocuments().then(async (docs) => {
    console.log("FETCHED USERS")
    docs.forEach(async (doc) => {
      console.log(`FETCHING DATA FOR USER ${doc.id}`)
      const data = await doc.get()
      const changes = [];
      snap.docChanges().forEach(change => {
        if (data.data().watchlist.includes(change.doc.id)) {
          changes.push(change.doc.id)
        }
      })
      if (changes.length > 0) {
        console.log(`Sending message to ${data.id}`)
        twilio.messages.create({
          body: `${changes.length} stocks on your watchlist have just been updated (${changes.join(", ")})`,
          from: '+18443681548',
          to: `+1${data.id}`
        })
      }
    })
  })
})