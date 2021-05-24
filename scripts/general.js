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
const goback = document.querySelector('.goBackToStoreBtn');
const bagCounter = document.querySelector('.cart__span');
let path = window.location.href;
let currentFile = path.split('/');

if (goback) {
    goback.addEventListener('click', () => {
        window.location.href = './store.html';
    });
}

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



            if (currentFile[currentFile.length - 1] == 'cart.html')
                renderCart();
            setCartCounterColor();

        }
    )
}

const setLoggedUser = (info, id) => {


    if (info.userDoc) {
        loggedUser = info.userDoc;
    } else {
        loggedUser = info;
    }

    loggedUser.uid = id;


    userTag.innerText = loggedUser.email;


    let currentPath = currentFile[currentFile.length - 1];

    if (currentPath == 'store.html' || currentPath == 'store.html?type=handheld-videogames' || currentPath == 'store.html?type=computer-videogames' || currentPath == 'store.html?type=console-videogames') {
        renderProducts();
    } else if (currentPath == 'orders.html') {
        loadOrders();
    }


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

            userLoggedIn();
            getMyCart(user.uid);
            if (typeof validateAuth === 'function') {
                validateAuth();
            }


        });
    } else {
        // User is signed out
        // ...
        loggedUser = null;
        if (typeof renderProducts === 'function') {
            renderProducts();
        }


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