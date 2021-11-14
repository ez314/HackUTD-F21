import admin from "firebase-admin";
import serviceAccount from '../../firebase.json';

// const creds = {
//     project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
// };

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

export const db = admin.firestore();