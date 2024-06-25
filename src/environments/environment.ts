export const environment = {
  production: true, 
    firebaseConfig : {
        apiKey: process.env['NG_APP_API_KEY'],
        authDomain: "portfolio-cb13b.firebaseapp.com",
        projectId: "portfolio-cb13b",
        storageBucket: "portfolio-cb13b.appspot.com",
        messagingSenderId: process.env['NG_APP_MSG_SENDER_ID'],
        appId: process.env['NG_APP_APP_ID'],
      }
};
