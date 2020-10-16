import store from '../Store';
import { Shopping, Cart } from '../Component';
// import Cart from '../Component/Cart'
import './index.scss';


function renderApp() {
    const shopping =  Shopping()
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


const cartEventHandler = () => {

    const eventHandler = (event) => {
        const identifier = event.target.parentElement.getAttribute('identifier')
        const cartItem = store.cartData[identifier];
        if(event.target.className.includes('plus'))
        cartItem.qty += 1;
        else if(event.target.className.includes('minus'))
        cartItem.qty > 0 ? cartItem.qty -= 1 : cartItem.qty = 0;
        store.updateItem(identifier,cartItem)
        if(cartItem.qty)
        document.getElementById(identifier).value = cartItem.qty
        else {
            delete store.cartData[identifier];
            let event = new Event("renderCart", {bubbles: true}); // (2)
            document.dispatchEvent(event); 
        }
 
    }

    const incrementor = document.querySelectorAll(".cart-items-incrementor");
    incrementor.forEach(el => el.addEventListener('click', eventHandler));


    const deleteHandler = (e) => {
        const identifier = e.target.getAttribute('identifier')
        delete store.cartData[identifier];
        let event = new Event("renderCart", {bubbles: true}); // (2)
        document.dispatchEvent(event);   

    }
    const removeEle = document.querySelectorAll('.cart-item-remove');
    removeEle.forEach(el => el.addEventListener('click', deleteHandler));
}
async function renderCart(){
    // const Cart = await import('../Component/Cart')
    // const cartDom = Cart.default()
    const cartDom = Cart()
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = cartDom;
    document.getElementById('cart-container-id').remove();
    document.getElementById('shopping-page').appendChild(tempWrapper.firstChild);
    cartEventHandler();
}
// Listen for the event.
document.addEventListener('renderCart', function (e) { 
    console.log('render cart')
    renderCart()
}, false);



renderApp()
