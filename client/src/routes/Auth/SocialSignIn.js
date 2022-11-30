import React from 'react';
import FirebaseFunctions from '../../firebase/FirebaseFunctions'

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await FirebaseFunctions.doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn('google')}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      />
    </div>
  );
};

export default SocialSignIn;
