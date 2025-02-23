import admin from "firebase-admin";
import fs from "fs";  
import { Buffer } from "buffer";

const firebaseAdminSdkBase64 = process.env.FIREBASE_ADMIN_SDK;
const firebaseAdminSdkJson = Buffer.from(firebaseAdminSdkBase64, 'base64').toString('utf-8');
fs.writeFileSync('./firebase-admin-sdk.json', firebaseAdminSdkJson);

admin.initializeApp({
  credential: admin.credential.cert("../firebase-admin-sdk.json"),
});
export const verifyIdToken = async (idToken) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("decodedToken", decodedToken);
    return decodedToken;
  } catch (error) {
    console.log("Error in verifying token: ", error);
    throw new Error("Token verification failed");
  }
};
