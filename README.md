# Reddit-Clone(Redesign)

A Reddit Clone built using TypeScript React, Tailwind CSS, SASS, NextJS, RecoilJS, and Firebase.

# How to Run

## Setup

```
# Clone this repository
$ git clone https://github.com/godkingjay/reddit-clone.git

# Go into the repository
$ cd reddit-clone

# Install dependencies
$ yarn install
```

## Configure Firebase

1. Go to [Firebase](https://firebase.google.com/) and create an account.
2. Go to Console.
3. Add a Project.
4. Name your project and proceed.
5. Go to Authentication tab -> Sign-in Method, and add new provider, select Email/Password and Google.
6. Go to Firestore Database and create database, select Test Mode.
7. Go to Storage and create storage, select Test Mode.
8. In your project, add an application, select web.
9. Name your app, and click Next.
10. Get the configuration, it should be like this:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "API_KEY",
	authDomain: "APP_NAME.firebaseapp.com",
	projectId: "APP_NAME",
	storageBucket: "APP_NAME.appspot.com",
	messagingSenderId: "MESSAGING_SENDER_ID",
	appId: "APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

8. Go to your cloned repo and rename ".env.example" to ".env.local".
9. Add the configuration given by Firebase.

```
NEXT_PUBLIC_API_KEY=#FIREBASE_API_KEY
NEXT_PUBLIC_AUTH_DOMAIN=#FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_PROJECT_ID=#FIREBASE_PROJECT_ID
NEXT_PUBLIC_STORAGE_BUCKET=#FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_MESSAGING_SENDER_ID=#FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_APP_ID=#FIREBASE_APP_ID
```

10. Your good to go!

```
$ yarn dev
```

**NOTE: After running the app, check your devtools for logs from Firebase. These logs should be a link which will take you to Firebase where it will will ask you to create indices for the queries.**
