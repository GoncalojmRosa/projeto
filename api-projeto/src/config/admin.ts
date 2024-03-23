import * as admin from "firebase-admin";
import serviceAccount from "../admin.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://crossafe-e5e36-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();
export { admin, db };
