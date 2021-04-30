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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('onAuthStateChanged', user);

        db.collection('users').doc(user.uid).get().then(function(doc) {
            console.log(doc.data());
        });
    } else {
        // User is signed out
        // ...
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