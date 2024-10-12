// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT9VEI61Wk5U4iI6L4n8jnOq5NlT4-zE8",
    authDomain: "resume-builder-76556.firebaseapp.com",
    projectId: "resume-builder-76556",
    storageBucket: "resume-builder-76556.appspot.com",
    messagingSenderId: "786103950532",
    appId: "1:786103950532:web:f85f2a8afb32e546a6fd91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Initialize Auth
const db = getFirestore(); // Initialize Firestore

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

// Sign In Functionality
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('sign-out-btn');

    if (signOutButton) {
        console.log("Sign Out button found!");

        signOutButton.addEventListener('click', () => {
            console.log("Sign Out button clicked!");

            // Clear local storage
            localStorage.removeItem('loggedInUserId');
            localStorage.removeItem('userToken');

            alert('You have been successfully signed out.');

            // Debugging before redirection
            console.log("Redirecting to login page...");

            // Redirect to the login page
            window.location.replace('index.html');
        });
    } else {
        console.error("Sign Out button not found!");
    }
});




