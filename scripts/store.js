const list = document.querySelector('.list');
const orders = document.querySelectorAll('.order');
const aFilters = document.querySelectorAll('.filterscontainer__filter');

let currentOrder = -1;


orders.forEach((value) => {

    value.addEventListener('click', () => {
        currentOrder = value.value;
        change();

    });

});





let productsCollection = db.collection('products');





aFilters.forEach((value) => {
    value.addEventListener('click', () => {
        console.log('hola');
    });
});

const handleCollectionResult = (querySnapshot) => {


    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const product = document.createElement('div');
        product.classList.add("product");
        let img = data.images[0]?.url;
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
          <div class="product__car"><img src="./images/market_bag.png" class="product__bag"></div>
          <div class="product__performance product__performance--${color}">${performance}</div>
        </div>
        </a>
      `;

        const cartBtn = product.querySelector('.product__car');
        cartBtn.addEventListener('click', () => {
            console.log('Hola');
            cart.push(data);
            localStorage.setItem('store__cart', JSON.stringify(cart));

            cartBtnNumber.innerText = cart.length;

            console.log(JSON.stringify(cart));
        });
        list.appendChild(product);


    });




}

const filters = document.querySelector('.filters');

filters.addEventListener('change', change);

function change(argument) {
    // bodylet productsCollection = db.collection('products');


    let productsCollection = db.collection('products');



    if (filters.year.value) {
        productsCollection = productsCollection.where('year', '==', filters.year.value);

    }



    if (filters.price.value) {

        switch (filters.price.value) {
            case '1':

                productsCollection = productsCollection.where('priceReal', '<', 6);
                break;
            case '2':

                productsCollection = productsCollection.where('priceReal', '>=', 6).where('priceReal', '<', 16);
                break;
            case '3':

                productsCollection = productsCollection.where('priceReal', '>=', 16).where('priceReal', '<', 31);
                break;
            case '4':

                productsCollection = productsCollection.where('priceReal', '>=', 31).where('priceReal', '<', 61);
                break;
            case '5':

                productsCollection = productsCollection.where('priceReal', '>', 60);
                break;

        }
    }

    if (currentOrder != -1) {

        switch (currentOrder) {

            case 'popularity':

                if (filters.price.value) productsCollection = productsCollection.orderBy('priceReal', 'asc');


                console.log('popularity-');
                productsCollection = productsCollection.orderBy('popularity', 'dsc');

                break;


            case 'year':

                if (filters.price.value) productsCollection = productsCollection.orderBy('priceReal', 'asc');
                console.log('year-');
                productsCollection = productsCollection.orderBy('year', 'asc');

                break;

            case 'price_asc':


                productsCollection = productsCollection.orderBy('priceReal', 'asc');

                break;


            case 'price_desc':


                productsCollection = productsCollection.orderBy('priceReal', 'dsc');

                break;
        }
    }


    if (filters.os.value) {
        switch (filters.os.value) {
            case '0':

                productsCollection = productsCollection.where('os', '==', 0);
                break;
            case '1':

                productsCollection = productsCollection.where('os', '==', 1);
                break;
            case '2':

                productsCollection = productsCollection.where('os', '==', 2);
                break;

        }
    }

    if (filters.performance.value) {
        switch (filters.performance.value) {
            case '1':
                productsCollection = productsCollection.where('performance', '==', 'LOW');
                console.log('LOW');
                break;
            case '2':
                productsCollection = productsCollection.where('performance', '==', 'MOD');
                console.log('MOD');
                break;
            case '3':
                productsCollection = productsCollection.where('performance', '==', 'HIGH');
                console.log('HIGH');
                break;

        }
    }


    productsCollection.get().then(handleCollectionResult);
}




let params = new URLSearchParams(location.search);
if (params.get('type')) {
    productsCollection = productsCollection.where('type', '==', params.get('type'));
    let filter = document.querySelector('.' + params.get('type'));
    let border = document.querySelector('.' + params.get('type') + '--border')
    filter.classList.add('filterscontainer__filter--selected');
    border.classList.add('filterscontainer__visible');
}

productsCollection.get().then(handleCollectionResult);