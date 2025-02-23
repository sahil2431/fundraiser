import admin from "firebase-admin";
import serviceAccount from "../firebase-admin-sdk.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
