const fullname = document.querySelector('.fullname');
const id = document.querySelector('.id');
const address = document.querySelector('.address');
const ccnumber = document.querySelector('.ccnumber');
const title = document.querySelector('.title');
const orderContainer = document.querySelector('.orders__container');


loadOrders = () => {

    let counter = 0;
    let firstOne = false;
    ORDERS_COLLECTION.doc(loggedUser.uid).get().then((data) => {

        let finalHtml = '';
        const orders = data.data();



        if (data.data() == undefined) {

            title.innerText = 'NO ODERS YET';
        } else {
            orders.orders.forEach(element => {

                counter++;

                if (!firstOne) {
                    firstOne = true;
                    id.innerText = element.id;
                    address.innerText = element.address;
                    ccnumber.innerText = element.ccNumber;
                    title.innerText = 'YOUR ORDERS';
                }


                let date = new Date(element.date);

                let dateString = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

                let games = '';


                for (let i = 0; i < element.productsIds.length; i++) {


                    games += `
                    <p class="order__gametitle">${element.productsNames[i]}</p>
                    <p class="order__gametext">Id:${element.productsIds[i]}</p>
                `;
                }

                let counterString = '';
                if (counter < 9) {
                    counterString = '0' + counter;
                } else {
                    counterString = '' + counter;
                }


                let lastOneClass = '';

                if (counter == (orders.orders.length)) {
                    lastOneClass = 'order--lastone';
                }


                let orderHtml = `
                 <div class="order ${lastOneClass}">
                    <div class="order__left">
                        <div class="order__counter">${counterString}</div>

                        <div class="order__info">
                            <p class="order__gametitle">Address</p>
                            <p class="order__gametext">${element.address}</p>
                            <p class="order__gametitle">CC Number</p>
                            <p class="order__gametext">${element.ccNumber}</p>
                            <p class="order__gametitle">Total</p>
                            <p class="order__gametext">$${element.total}</p>
                            <p class="order__gametitle">Date</p>
                            <p class="order__gametext">${dateString}</p>

                        </div>
                    </div>

                    <div class="order__gameinfo">
                        ${games}
                    </div>

                </div>
            
            
            `;

                finalHtml += orderHtml;

            });

        }


        orderContainer.innerHTML = finalHtml;
    });
}


const validateAuth = () => {

    if (!loggedUser) {
        window.location.href = './store.html';

    } else {
        fullname.innerText = loggedUser.firstname + ' ' + loggedUser.lastname;

    }

}