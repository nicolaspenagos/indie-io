/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

// -------------------------------------
// REFERENCES
// -------------------------------------
const currentImage = document.querySelector('.productDetail__currentImage');
const addItemBtn = document.querySelector('.addItemBtn');
const subtractItemBtn = document.querySelector('.subtractItemBtn');
const labelItemCounter = document.querySelector('.itemCounter');
const gameTitleLbl = document.querySelector('.gameName');
const starsArray = document.querySelectorAll('.star');
const starLabel = document.querySelector('.starLabel');
const priceLabel = document.querySelector('.gamePrice');
const priceDiscount = document.querySelector('.gameDiscount');
const cpuLabel = document.querySelector('.cpu');
const ramLabel = document.querySelector('.ram');
const yearLabel = document.querySelector('.year');
const osLabel = document.querySelector('.os');
const descriptionLabel = document.querySelector('.description');
const osImage = document.querySelector('.osImage');
const containerLeft = document.querySelector('.productDetail__container--left');
const addToCartBtn = document.querySelector('.productDetail__button--add');

// -------------------------------------
// GLOBAL VARIABLES
// -------------------------------------
let itemCounter = 1;
let currentProduct;
let currentId;

// -------------------------------------
// FUNCTIONS
// -------------------------------------

addToCartBtn.addEventListener('click', () => {




    addToCartBtn.classList.add('product__car__pressed');

    setTimeout(() => {
        addToCartBtn.classList.remove('product__car__pressed');
    }, 200);
    addToMyCart({
        ...currentProduct,
        id: currentId,
    });
    //localStorage.setItem('store__cart', JSON.stringify(cart));
    if (cart.length > 0) {

        bagCounter1.classList.remove('hidden');
    }
    bagCounter1.innerText = cart.length;
});

/*
addItemBtn.addEventListener('click', () => {
    itemCounter++;
    labelItemCounter.innerHTML = itemCounter;
});

subtractItemBtn.addEventListener('click', () => {
    if (itemCounter > 1) {
        itemCounter--;
        labelItemCounter.innerHTML = itemCounter;
    }
});
*/







const params = new URLSearchParams(location.search);
const id = params.get('id');
if (!id) {
    location.href = './404.html';
}

db.collection('products').doc(id).get().then(
    function(doc) {


        const data = doc.data();
        currentProduct = data;
        currentId = doc.id;
        let images = data.images;
        let thumbsHtml = '';

        currentImage.setAttribute('src', images[0].url);

        for (let i = 0; i < images.length; i++) {
            thumbsHtml += `
            <div class="productDetail__image--div">
                <img src="${images[i].url}" class="productDetail__image thumb">
            </div>`;
        }

        containerLeft.innerHTML = thumbsHtml;

        const thumbs = document.querySelectorAll('.thumb');

        thumbs.forEach(
            (value) => {

                function handleThumbClick() {
                    const src = value.getAttribute('src');
                    currentImage.setAttribute('src', src);
                }

                value.addEventListener('click', handleThumbClick);
            }
        );


        if (!data) {
            location.href = './404.html';
        }

        gameTitleLbl.innerHTML = data.name;
        starLabel.innerHTML = data.popularity + '.0';
        priceLabel.innerHTML = '$' + data.priceReal;

        switch (data.cpu) {
            case 3:
                cpuLabel.innerHTML = 'Intel i3';
                break;
            case 5:
                cpuLabel.innerHTML = 'Intel i5';
                break;
            case 7:
                cpuLabel.innerHTML = 'Intel i7';
                break;
        }

        switch (data.ram) {
            case 2:
                ramLabel.innerHTML = '2gb';
                break;
            case 4:
                ramLabel.innerHTML = '4gb';
                break;
            case 8:
                ramLabel.innerHTML = '8gb';
                break;
        }

        yearLabel.innerHTML = data.year;

        switch (data.os) {
            case 1:
                osLabel.innerHTML = 'MacOS';
                osImage.setAttribute('src', './images/mac_black.png');
                break;
            case 2:
                osLabel.innerHTML = 'Windows';
                osImage.setAttribute('src', './images/windows_black.png');
                break;
            case 3:
                osLabel.innerHTML = 'Both';
                osImage.setAttribute('src', './images/windows_and_mac_black.png');
                break;
        }


        descriptionLabel.innerHTML = data.description;

        if (data.price != data.priceReal) {
            priceDiscount.innerHTML = '$' + data.price;
        }

        let counter = 0;
        starsArray.forEach(
            (val) => {
                if (counter < data.popularity) {
                    val.setAttribute('src', './images/red_star.png');
                    counter++;
                }
            }
        );





    }
);