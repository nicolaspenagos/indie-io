var firebaseConfig = {
    apiKey: "AIzaSyCEWyRiWe8hhyAwv0zzpNpqD3ZxhVj4SXw",
    authDomain: "indieio.firebaseapp.com",
    projectId: "indieio",
    storageBucket: "indieio.appspot.com",
    messagingSenderId: "800349591671",
    appId: "1:800349591671:web:98d6b27809c4d3244c0e72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const logOut = document.querySelector('.button__logout');
const auth = firebase.auth();
const userTag = document.querySelector('.usertag');

let loggedUser = null;


logOut.addEventListener('click', () => {


    if (loggedUser != null) {
        auth.signOut().then(
            () => {

            }
        ).catch(
            (error) => {
                alert(error.message);
            }
        );
    } else {

        handleOpenModal();
    }

});



firebase.auth().onAuthStateChanged((user) => {
    if (user) {



        db.collection('users').doc(user.uid).get().then(function(doc) {

            loggedUser = doc.data();
            loggedUser.uid = user.uid;
            userTag.innerText = loggedUser.email;
            userLoggedIn();
        });
    } else {
        // User is signed out
        // ...
        loggedUser = null;
        userTag.innerText = '';
        userLoggedOut();
    }
});


let cart = [];
const cartFromLS = localStorage.getItem('store__cart');

const cartBtnNumber = document.querySelector('.cart__span');

if (cartFromLS) {
    cart = JSON.parse(cartFromLS);
    if (cartBtnNumber) {
        cartBtnNumber.innerText = cart.length;
    }
}

const ORDERS_COLLECTION = db.collection('orders');