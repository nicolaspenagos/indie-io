function userLoggedIn() {

    logOut.innerHTML = 'Log out';

    const showLoggedIn = document.querySelectorAll('.showLoggedIn');
    const showLoggedInOs = document.querySelectorAll('.image__os');

    showLoggedInOs.forEach((elem) => {
        elem.classList.add('showLoggedInOs');
    });



    showLoggedIn.forEach((elem) => {

        elem.classList.remove('hidden');
    });

    if (loggedUser.admin) {
        const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
        showLoggedAdmin.forEach((elem) => {
            elem.classList.remove('hidden');
        });
    }
}

function userLoggedOut() {
    if (logOut)
        logOut.innerHTML = 'Log in';

    const showLoggedIn = document.querySelectorAll('.showLoggedIn');


    showLoggedIn.forEach((elem) => {
        elem.classList.add('hidden');
    });

    const showLoggedInOs = document.querySelectorAll('.image__os');

    showLoggedInOs.forEach((elem) => {
        elem.classList.remove('showLoggedInOs');
    });



    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
    showLoggedAdmin.forEach((elem) => {
        elem.classList.add('hidden');
    });
}