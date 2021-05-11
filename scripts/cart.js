const list = document.querySelector('.cartList');
const totalSpan = document.querySelector('.checkout__total span');
const checkoutForm = document.querySelector('.checkout__form');

let total = 0;

renderCart = () => {
    cart.forEach((data) => {


        total += data.priceReal;

        const product = document.createElement('div');
        product.classList.add("product");
        let img = data.images[0] ? .url;
        if (!img) {
            img = './images/placeholder-image.png';
        }

        let html = '';
        let tag = '';

        if (data.discount != 1 && data.discount != 0) {
            let p = data.price * data.discount;
            html = '<div class="product__price--whole">$' + p + '</div>' + '<div class="product__discount">$' + data.price + '</div>';
            tag = `<div class="product__tag--label">%${(1-data.discount)*100}</div>`;
        } else {
            html = '<div class="product__price--whole">$' + data.price + '</div>';

            if (data.discount == 0) {
                tag = `<div class="product__tag--label product__tag--label--new">New!</div>`
            }
        }

        let stars = data.popularity;
        let innerStar = '';
        let pressed = true;

        let performance = 'MOD';

        //let color = '#6E7DF8'
        let color = 'purple';
        if (data.performance == 'LOW') {
            performance = 'LOW';
            color = 'green';
            //color = '#53E06A';
        } else if (data.performance == 'HIGH') {
            performance = 'HIGH';
            color = 'red';
            //color = '#EB3F4F';

        }

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


        //<a href = "./product.html?id=${doc.id}&name=${data.name}" >
        product.innerHTML = `
        <a> 
        <img class="product__img" src="${img}" alt="">
        <div class="product__info">
        ${tag}
          <div class="product__rate">
            <div class="product__stars">${innerStar}</div><div class="product__score">${data.popularity}.0</div>
          </div>
          <h1 class="product__title">
            ${data.name}
          </h1>
          <div class="product__price"> ${html}</div>
          
          <div class="product__performance product__performance--${color}">${performance}</div>
        </div>
        </a>
      `;


        list.appendChild(product);


    });

    totalSpan.innerHTML = total;
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productsIds = [];
        cart.forEach(function(data) {
            productsIds.push(data.id);
        });


        const order = {
            ccNumber: checkoutForm.ccnumber.value,
            address: checkoutForm.address.value,
            date: Date.now(),
            productsIds,
            total: total,
            //uid: loggedUser.uid
        }

        ORDERS_COLLECTION.add(order).then(function(docRef) {
            cart = [];
            //Enviar a pagina de agradeciniento
        });
    });

}