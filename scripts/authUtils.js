function userLoggedIn() {
    logOut.innerHTML = 'Log out';

    if (loggedUser.admin) {
        const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
        showLoggedAdmin.forEach((elem) => {
            elem.classList.remove('hidden');
        });
    }
}

function userLoggedOut() {
    logOut.innerHTML = 'Log in';
    const showLoggedAdmin = document.querySelectorAll('.showLoggedAdmin');
    showLoggedAdmin.forEach((elem) => {
        elem.classList.add('hidden');
    });
}