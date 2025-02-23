import { verifyIdToken } from "../services/firebaseService.js";
export const authenticateFirebaseUser = async (req , res , next) => {
    const idToken = req.headers.authorization?.split(' ')[1]
    console.log(req.body , idToken);

  if (!idToken) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decodedToken = await verifyIdToken(idToken);
    console.log(decodedToken);
    req.body.user = decodedToken; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    console.log(error);
    return;
  }
}
