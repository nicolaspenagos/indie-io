const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');
const itemsLabel = document.querySelectorAll('.items');
const subtotal = document.querySelector('.subtotal');
const tax = document.querySelector('.tax');
const creditCard = document.querySelector('.ccnumber');
const fullname = document.querySelector('.fullname');
const address = document.querySelector('.address');
const id = document.querySelector('.id');
const checkOutButton = document.querySelector('.checkoutBtn');
const error = document.querySelector('.error');
let productsCounter = 0;

let total = 0;

const validateAuth = () => {

    if (!loggedUser) {
        window.location.href = './store.html';
    }

}



renderCart = () => {

    total = 0;
    console.log('hola');
    cart.forEach((data) => {


        productsCounter++;

        let lastone = '';
        if (productsCounter == cart.length) {
            lastone = 'cart__product--lastone';
        }



        total += data.priceReal;

        let product = document.createElement('div');

        let img = data.images[0]?.url;
        if (!img) {
            img = './images/placeholder-image.png';
        }

        let stars = data.popularity;
        let innerStar = '';
        let pressed = true;

        for (let i = 1; i <= 5; i++) {

            if (pressed) {

                innerStar += '<img src="./images/red_star.png" class="product__star">';

                if (i == stars) {
                    pressed = false;
                }

            } else {
                innerStar += '<img src="./images/gray_star.png" class="product__star">';
            }


        }

        let discount = '';
        if (data.priceReal == data.price) {
            discount = 'hidden';
        }


        product.innerHTML = `
        
        <div class="cart__product ${lastone}">
                <div class="checkout__one">
                    <img src="${img}" class="cart__image">
                    <div>
                        <h1 class="game__title">${data.name}</h1>
                        <div class="product__rate game__rate">
                            <div class="product__stars">
                              ${innerStar}
                            </div>
                            <div class="product__score">${data.popularity}.0</div>
                        </div>
                            <div class="product__score game__rate">id:${data.id}</div>
                    </div>
                </div>
                <div>

                </div>
                <div class="checkout__two">
                    <div class="game__os">
                        <button class="game__os__button game__os__button--left"><</button>
                        <img src="images/mac.png" class="os">
                        <button class="game__os__button game__os__button--right">></button>
                    </div>
                </div>

                <div class="checkout__three">

                    <div class="productDetail__price game__price">
                        <h1 class="productDetail__price--real gamePrice game__price1">$${data.priceReal}</h1>
                        <h3 class="productDetail__price--discount gameDiscount game__price2 ${discount}">$${data.price}</h3>
                    </div>
                    <button class="game__button delete">X</button>

                </div>
            </div>
        
        
        `;

        const delteBtn = product.querySelector('.delete');
        delteBtn.addEventListener('click', () => {

            let index = searchProduct(data.id);
            if (index != -1) {
                cart.splice(index, 1);
                list.innerHTML = '';
                total = 0;
                productsCounter = 0;
                CART_COLLECTION.doc(loggedUser.uid).set({ cart });
                bagCounter1.innerText = cart.length;
                setCartCounterColor();
                renderCart();

            }


        });

        const osImg = product.querySelector('.os');

        const leftBtn = product.querySelector('.game__os__button--left');
        leftBtn.addEventListener('click', () => {

            changeOs();
        });

        const rightBtn = product.querySelector('.game__os__button--right');
        rightBtn.addEventListener('click', () => {
            changeOs();
        });



        const changeOs = () => {

            let array = osImg.src.split('/');
            let src = array[array.length - 1];


            if (src == 'mac.png') {

                osImg.setAttribute('src', './images/windows.png');

            } else {

                osImg.setAttribute('src', './images/mac.png');

            }

        }





        list.appendChild(product);



    });



    itemsLabel.forEach((elem) => {
        elem.innerText = cart.length + ' items';
    });

    subtotal.innerText = '$' + total;
    tax.innerText = '$' + (total * 0.10).toFixed(2);

    let grandTotal = total + (total * 0.10);
    totalSpan.innerText = '$' + grandTotal.toFixed(2);



    //validateAuth


}


checkOutButton.addEventListener('click', () => {

    error.classList.add('hidden');


    console.log('Holaaa');

    let errorMsg = '';
    error.innerText = '';



    if (creditCard.value.length == 0) {
        errorMsg += 'Please enter your credir card \n';

    }


    if (fullname.value.length == 0) {
        errorMsg += 'Please enter your full name \n';
    }


    if (id.value.length == 0) {
        errorMsg += 'Please enter your ID \n';
    }

    if (address.value.length == 0) {
        errorMsg += 'Please enter your address \n';
    }

    if (cart.length == 0) {
        errorMsg += 'Please add at least one item\n';
    }


    console.log(errorMsg);
    if (errorMsg == '') {
        buy();
    } else {
        error.innerText = errorMsg;
        error.classList.remove('hidden');
    }


});


buy = () => {
    const productsIds = [];
    cart.forEach(function(data) {
        productsIds.push(data.id);
    });


    const order = {
        ccNumber: creditCard.value,
        address: address.value,
        date: Date.now(),
        productsIds,
        total: total,
        //uid: loggedUser.uid
    }

    ORDERS_COLLECTION.add(order).then(function(docRef) {
        cart = [];
        //Enviar a pagina de agradeciniento
    });
}



searchProduct = (id) => {

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) return i;
    }

    return -1;

}

//validateAuth