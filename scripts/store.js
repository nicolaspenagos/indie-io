const list = document.querySelector('.list');

const aFilters = document.querySelectorAll('.filterscontainer__filter');



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



        product.innerHTML = `
        <a href="./product.html?id=${doc.id}&name=${data.name}"> 
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
        </div>
        </a>
      `;

        list.appendChild(product);


    });




}

let productsCollection = db.collection('products');


let params = new URLSearchParams(location.search);
if (params.get('type')) {
    productsCollection = productsCollection.where('type', '==', params.get('type'));
    let filter = document.querySelector('.' + params.get('type'));
    let border = document.querySelector('.' + params.get('type') + '--border')
    filter.classList.add('filterscontainer__filter--selected');
    border.classList.add('filterscontainer__visible');
}

productsCollection.get().then(handleCollectionResult);