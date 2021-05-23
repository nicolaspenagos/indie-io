function userLoggedIn() {
    console.log(' =====>>>>>>>>');
    logOut.innerHTML = 'Log out';

    const showLoggedIn = document.querySelectorAll('.showLoggedIn');
    const showLoggedInOs = document.querySelectorAll('.image__os');

    showLoggedInOs.forEach((elem) => {
        elem.classList.add('showLoggedInOs');
    });



    console.log(showLoggedIn.length + ' >>>>>>>>');
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

    console.log('jdksdsk1111');
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