import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

/* FirebaseAuth es la instancia de la clase de autenticacion */
/* googleProvider es el proveedor para el cual abrir el popup de autenticacion */

export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        // console.log({ credentials });

        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorMessage
        }
    }


}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}

export const loginWithEmailPassword = async ({ email, password }) => {
    
    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user

        return {
           ok: true,
           uid, photoURL, email, displayName
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}
