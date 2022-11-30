// https://firebase.google.com/docs/auth/web/password-auth#web-version-9
// need to update methods
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  reauthenticateWithCredential, 
  updatePassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile
} 
from 'firebase/auth';

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: displayName })
}

async function doChangePassword(email, oldPassword, newPassword) {
  let credential = firebase.auth.EmailAuthProvider.credential(
    email,
    oldPassword
  );
  await firebase.auth().currentUser.reauthenticateWithCredential(credential);
  await firebase.auth().currentUser.updatePassword(newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function doSocialSignIn(provider) {
  let socialProvider = null;
  if (provider === 'google') {
    socialProvider = new firebase.auth.GoogleAuthProvider();
  }
  await firebase.auth().signInWithPopup(socialProvider);
}

// don't know if we're offering this
// async function doPasswordReset(email) {
//   await firebase.auth().sendPasswordResetEmail(email);
// }

async function doPasswordUpdate(password) {
  await firebase.auth().updatePassword(password);
}

async function doSignOut() {
  await firebase.auth().signOut();
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
