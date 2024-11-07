import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

useEffect(() => {
  // Configure Google Sign-In with your web client ID
  GoogleSignin.configure({
    webClientId:
      '133917263525-rds6m5umj0g3la9qctl8ot5edl1j8cdb.apps.googleusercontent.com', // Replace with your actual client ID
  });
}, []);
