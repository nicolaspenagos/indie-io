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
        let osImage = '';

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

        let adminLogged = 'hidden';
        let loggerU = 'hidden';
        let os = '';

        if (loggedUser) {
            loggerU = '';
            os = 'marketOs';

            if (loggedUser.admin) {
                adminLogged = '';
            }

        }

        if (data.os == 1) {
            osImage = `<img src="./images/mac.png" class="image__os ${os}" >`;
        } else if (data.os == 2) {
            osImage = `<img src="./images/windows.png" class="image__os ${os}">`;
        } else {
            osImage = `<img src="./images/windows_and_mac.png" class="image__os ${os}">`;
        }






        //<a href = "./product.html?id=${doc.id}&name=${data.name}" >
        product.innerHTML = `
        <div> 
        <img class="product__img" src="${img}" alt="">
        <div class="product__info">
        ${tag}
          <div class="product__rate">
            <div class="product__stars">${innerStar}</div><div class="product__score">${data.popularity}.0</div>
          </div>
          <h1 class="product__title">
            ${data.name} (${data.year})
          </h1>
          <a href="./productDetail.html?id=${doc.id}&name=${data.name}" class="product__link">See details</a>

          <div class="product__price"> ${html}</div>
          <div class="product__car showLoggedIn ${loggerU}"><img src="./images/market_bag.png" class="product__bag"></div>
          ${osImage}
          <div class="product__performance product__performance--${color}">${performance}</div>
        </div>
            <div class="product__delete showLoggedAdmin ${adminLogged} delete">
                Delete
            </div>
        </div>
      `;

        const cartBtn = product.querySelector('.product__car');
        const deleteBtn = product.querySelector('.delete');




        deleteBtn.addEventListener('click', () => {


            let stringId = data.id;


            if (stringId == 'gVbjOBci5jsTJpmX4Pfi') {
                console.log('Oe');
            }

            db.collection('products').doc(stringId).delete().then(() => {
                location.reload();
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        });

        cartBtn.addEventListener('click', () => {




            cartBtn.classList.add('product__car__pressed');
        

       

            setTimeout(() => {
                cartBtn.classList.remove('product__car__pressed');

            }, 200);
            addToMyCart({
                ...data,
                id: doc.id,


            });
            //localStorage.setItem('store__cart', JSON.stringify(cart));
     if(cart.length>0){
                console.log('hola');
                bagCounter1.classList.remove('hidden');
            }
            bagCounter1.innerText = cart.length;



        });
        list.appendChild(product);


    });




}

const filters = document.querySelector('.filters');

filters.addEventListener('change', change);

function change(argument) {
    // bodylet productsCollection = db.collection('products');

    let productsCollection = db.collection('products');


    if (params.get('type')) {
        productsCollection = productsCollection.where('type', '==', params.get('type'));

    }

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

                if (filters.price.value && filters.price.value != 'Select a type') {
                    productsCollection = productsCollection.orderBy('priceReal', 'asc')
                    console.log(filters.price.value);
                };



                productsCollection = productsCollection.orderBy('popularity', 'desc');

                break;


            case 'alpha_desc':



                if (filters.price.value && filters.price.value != 'Select a type') {
                    productsCollection = productsCollection.orderBy('priceReal', 'asc')
                    console.log(filters.price.value);
                };
                productsCollection = productsCollection.orderBy('name');

                break;

            case 'price_asc':


                productsCollection = productsCollection.orderBy('priceReal', 'asc');

                break;


            case 'price_desc':


                productsCollection = productsCollection.orderBy('priceReal', 'desc');

                break;
        }
    }


    if (filters.os.value) {
        switch (filters.os.value) {
            case '0':

                productsCollection = productsCollection.where('os', '==', 1);
                break;
            case '1':

                productsCollection = productsCollection.where('os', '==', 2);
                break;
            case '2':

                productsCollection = productsCollection.where('os', '==', 3);
                break;

        }
    }

    if (filters.performance.value) {
        switch (filters.performance.value) {
            case '1':
                productsCollection = productsCollection.where('performance', '==', 'LOW');

                break;
            case '2':
                productsCollection = productsCollection.where('performance', '==', 'MOD');

                break;
            case '3':
                productsCollection = productsCollection.where('performance', '==', 'HIGH');

                break;

        }
    }


    productsCollection.get().then(handleCollectionResult);
}



console.log(loggedUser);
if (loggedUser) {
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

renderProducts = () => {
    productsCollection.get().then(handleCollectionResult);
}


window.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
}, false);