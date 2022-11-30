// https://firebase.google.com/docs/auth/web/password-auth#web-version-9
// need to update methods
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  reauthenticateWithCredential, 
  updatePassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  EmailAuthProvider,
  signInWithPopup
} 
from 'firebase/auth';

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: displayName })
}

// https://stackoverflow.com/questions/37811684/how-to-create-credential-object-needed-by-firebase-web-user-reauthenticatewith
async function doChangePassword(email, oldPassword, newPassword) {
  const auth = getAuth()
  const credential = EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await reauthenticateWithCredential(auth.currentUser, credential);
  const user = auth.currentUser
  await updatePassword(user, newPassword);
  await doSignOut(auth);
}

async function doSignInWithEmailAndPassword(email, password) {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === 'google') {
    socialProvider = new GoogleAuthProvider();
  }
  const auth = getAuth()
  await signInWithPopup(auth, socialProvider);
}

// don't know if we're offering this
// async function doPasswordReset(email) {
//   await firebase.auth().sendPasswordResetEmail(email);
// }

async function doPasswordUpdate(password) {
  const auth = getAuth()
  const user = auth.currentUser
  await updatePassword(user, password);
}

async function doSignOut() {
  const auth = getAuth()
  await doSignOut(auth);
}

module.exports = {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
//   doPasswordReset,
  doPasswordUpdate,
  doSignOut,
  doChangePassword
};
