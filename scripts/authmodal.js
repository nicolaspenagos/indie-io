const authModal = document.createElement('section');
authModal.classList.add('modal');
authModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <article class="modal__content modal__content--login">
      <button class="modal__close modal__close--login">X</button>
      <img src="./images/logo_black.png" class="image__loginlogo">
      <form class="authform modal__form">
        <input class="productForm__input modal__input authform__regfield" type="text" name="firstname" placeholder="Firstname">
        <input class="productForm__input modal__input authform__regfield" type="text" name="lastname" placeholder="Lastname">
        <input class="productForm__input modal__input" type="email" name="email" placeholder="Email">
        <input class="productForm__input modal__input" type="password" name="password" placeholder="Password">
        <p class="modal__Error"></p>
        <div class="modal__bottomcontainer">
          <button type="submit" class="modal__button send">Send</button>
          <div class="modal__sepcontainer">
            <div class="modal__sepline"></div><p class="modal__septext">Or</p><div class="modal__sepline"></div>
          </div>
          <button type="button" class="authform__register modal__button modal__button--alt">Go to register</button>
          <button type="button" class="authform__login modal__button modal__button--alt">Go to login</button>
        </div>
      </form>
    </article>
`;

document.body.appendChild(authModal);

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content--login');

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
const modalError = authForm.querySelector('.modal__Error');
const send = authForm.querySelector('.send');
const closeModalBtn = document.querySelector('.modal__close--login');

let isLogin = true;



function handleGoToLogin() {
    regFields.forEach(function(elem) {
        elem.classList.add('hidden');
    });
    loginBtn.classList.add('hidden');
    send.innerHTML = 'Log In';
    registerBtn.classList.remove('hidden');
    isLogin = true;
}

loginBtn.addEventListener('click', handleGoToLogin);

registerBtn.addEventListener('click', function() {
    regFields.forEach(function(elem) {
        elem.classList.remove('hidden');
    });
    send.innerHTML = 'Sign Up';
    loginBtn.classList.remove('hidden');
    registerBtn.classList.add('hidden');
    isLogin = false;
});

handleGoToLogin();

closeModalBtn.addEventListener('click', handleCloseModal);

authForm.addEventListener('submit', function(event) {
    event.preventDefault();


    const firstname = authForm.firstname.value;
    const lastname = authForm.lastname.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    if (isLogin) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(

            () => {
                handleCloseModal();
            }
        )


        .catch((error => {
            modalError.innerText = error.message;
        }));


    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user);

                const userDoc = {
                    firstname,
                    lastname: lastname,
                    email: email,
                }

                setLoggedUser(userDoc, user.uid);

                db.collection('users').doc(user.uid).set({
                    userDoc
                }).then(() => {
                    authForm.firstname.value = '';
                    authForm.lastname.value = '';
                    authForm.email.value = '';
                    authForm.password.value = '';
                });




                handleCloseModal();
            })
            .catch((error) => {
                modalError.innerText = error.message;
            });
    }
});

function handleOpenModal() {


    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';

    setTimeout(handleModalAppear, 15);


}


function handleCloseModal() {

    modal.style.opacity = 0;
    modalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    document.body.style.overflowX = 'hidden';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
}


function handleModalAppear() {
    console.log('ModalAppear');
    modal.style.opacity = 1;
    modalContent.style.transform = 'translate(0px, 0px)';


}

handleCloseModal();