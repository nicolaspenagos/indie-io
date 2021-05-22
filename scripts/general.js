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
const bagCounter1 = document.querySelector('.cart__span');

let loggedUser = null;

const CART_COLLECTION = db.collection('cart');

const addToMyCart = (product) => {

    console.log('repedito1');

    let repeated = false;

    cart.forEach(
        element => {
            if (element.id == product.id) {
                repeated = true;
            }
        }
    );

    if (!repeated) {
        cart.push(product);
        CART_COLLECTION.doc(loggedUser.uid).set({ cart });
        cartBtnNumber.innerText = cart.length;
    }







}

const getMyCart = (uid) => {
    CART_COLLECTION.doc(uid).get().then(
        snapshot => {

            const data = snapshot.data();
            if (!data) return;
            if (cartBtnNumber)
                cartBtnNumber.innerText = data.cart.length;
            data.cart.forEach(
                element => {
                    cart.push(element);
                }
            );

            renderCart();
            setCartCounterColor();

        }
    )
}

const setLoggedUser = (info, id) => {
    loggedUser = info;
    loggedUser.uid = id;
    userTag.innerText = loggedUser.email;
    userLoggedIn();
}

if (logOut) {
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

}



firebase.auth().onAuthStateChanged((user) => {
    if (user) {



        db.collection('users').doc(user.uid).get().then(function(doc) {

            if (!doc.data()) return;
            setLoggedUser(doc.data(), user.uid);
            getMyCart(user.uid);
            if (typeof validateAuth === 'function') {
                validateAuth();
            }


        });
    } else {
        // User is signed out
        // ...
        loggedUser = null;

        if (userTag)
            userTag.innerText = '';
        cart = [];
        userLoggedOut();
        if (typeof validateAuth === 'function') {
            validateAuth();
        }
    }


});

const setCartCounterColor = () => {

    if (bagCounter1) {
        if (bagCounter1.innerText == 0) {
            bagCounter1.classList.add('hidden');
        } else {
            bagCounter1.classList.remove('hidden');
        }
    }
}


let cart = [];
const cartFromLS = localStorage.getItem('store__cart');

const cartBtnNumber = document.querySelector('.cart__span');



const ORDERS_COLLECTION = db.collection('orders');