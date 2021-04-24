/*const authModal = document.createElement('section');
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
        <p class="modalError"></p>
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

const authForm = authModal.querySelector('.authform');
const regFields = authForm.querySelectorAll('.authform__regfield');
const registerBtn = authForm.querySelector('.authform__register');
const loginBtn = authForm.querySelector('.authform__login');
const modalError = authForm.querySelector('.modalError');
const send = authForm.querySelector('.send');

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

authForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('submit');

    const firstname = authForm.firstname.value;
    const lastname = authForm.lastname.value;
    const email = authForm.email.value;
    const password = authForm.password.value;

    if (isLogin) {

    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                console.log(user);

                db.collection('users').doc(user.uid).set({
                    firstname,
                    lastname: lastname,
                    email: email,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
});*/