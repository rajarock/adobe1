import store from '../Store';
import { Shopping, CartContainer} from '../Component';
import { items } from './fixture.json';
import './index.scss';


function renderApp() {
    store.setShoppingData(items);
    const shopping =  Shopping(store)
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = shopping;
    document.getElementById('app-root').appendChild(tempWrapper.firstChild);
    const addtoCartBtns = document.querySelectorAll('.shopping-item-addtocart');
        addtoCartBtns.forEach(el => el.addEventListener('click', event => {
            const identifier = event.target.getAttribute('identifier');
            store.subscribe(identifier)

            // Dispatch the event.
            if(typeof document !== 'undefined') {
                let event = new Event("renderCart", {bubbles: true}); // (2)
                document.dispatchEvent(event);            }
          }));

}


function cartEventHandler() {

    function eventHandler(event) {
        var identifier = event.target.parentElement.getAttribute('identifier')
        var cartItem = store.cartData[identifier];
        if(event.target.className.includes('plus'))
        cartItem.qty += 1;
        else if(event.target.className.includes('minus'))
        cartItem.qty > 0 ? cartItem.qty -= 1 : cartItem.qty = 0;
        store.updateItem(identifier,cartItem)
        if(cartItem.qty)
        document.getElementById(identifier).value = cartItem.qty
        else {
            delete store.cartData[identifier];
            var event = new Event("renderCart", {bubbles: true}); // (2)
            document.dispatchEvent(event); 
        }
 
    }

    var incrementor = document.querySelectorAll(".cart-items-incrementor");
    incrementor.forEach(el => el.addEventListener('click', eventHandler));


    function deleteHandler(e) {
        var identifier = e.target.getAttribute('identifier')
        delete store.cartData[identifier];
        var event = new Event("renderCart", {bubbles: true}); // (2)
        document.dispatchEvent(event);   

    }
    var removeEle = document.querySelectorAll('.cart-item-remove');
    removeEle.forEach(el => el.addEventListener('click', deleteHandler));
}

// Listen for the event.
document.addEventListener('renderCart', function (e) { 
    console.log('render cart')
    // renderCart()
    var cartDom = CartContainer(store);
    var tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = cartDom;
    document.getElementById('cart-container-id').remove();
    document.getElementById('shopping-page').appendChild(tempWrapper.firstChild);
    cartEventHandler();

}, false);



renderApp()
