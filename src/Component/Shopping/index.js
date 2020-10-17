import './Shopping.scss'
import './style.scss';
import { items } from './fixture.json'
// import store from '../../Store'

const renderItems = (data) => {
    let retStr = ''
    Object.values(data).forEach(item => {
        retStr += 
         `<div class="shopping-item">
            <div class="shopping-left-container">
                <div class="shopping-item-discount">${item.discount}% off</div>
                 <img class="shopping-item-image" src=${item.image}></img> 
            </div>
            <div class="shopping-right-container">
                <div class="shopping-items-name-price">
                    <div class="shopping-item-name">${item.name}</div>
                    <div class="shopping-item-price-container"> 
                        <div class="shopping-item-actual">$${item.price.actual}</div>
                        <div class="shopping-item-display"> $${item.price.display} </div>
                        <button class="shopping-item-addtocart" identifier=${item.identifier}> Add to cart </button>
                    </div>
                </div>

            </div>
        </div>`;
        
     });

    return retStr;
     }

     

const Shopping = (store) => {
    store.setShoppingData(items)
    const data = store.shopping;
        return (
        `<div id="shopping-page">
            <div class="shopping-container">
                <div class="shopping-items-container">
                ${renderItems(data)}
                </div>
            </div>
            <div id="cart-container-id" class="cart-empty-container"> Your Cart is Empty </div>
        </div>`
        )
    }
    



const renderCartTotal = () => {
    let cartTotalStr ='';
    cartTotalStr += `<div class="cart-summary">
        <div class="cart-summary-header">Total</div>
        <div class="grid-container">
            <div class="grid-item-left">Items(4)</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right">$1070</div>  
            <div class="grid-item-left">Discount</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right">-$128.5</div>
            <div class="grid-item-left">Type Discount</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right">-$0</div>
            <div class="grid-item-left cart-backgroundColor">Order Total</div>
            <div class="grid-item-separator cart-backgroundColor">:</div>
            <div class="grid-item-right cart-backgroundColor">$941.5</div>
        </div>
    </div>`
    return cartTotalStr
}

const renderCartQtyInput = (qty, identifier) => {
          return(`<input type="text" value=${qty} readonly id=${identifier} class="cart-item-count"></input>`)
}
const renderCartItemQty = (data = {}) => {
    const qty = data.qty || 0
    const identifier = data.identifier
    let cartQtyStr = ''
    cartQtyStr += `<div class="cart-qty-container" identifier=${identifier}>
        <button class="cart-items-incrementor minus"> - </button>
            ${renderCartQtyInput(qty, identifier)}
        <button class="cart-items-incrementor plus"> + </button>
    </div>`;
    return cartQtyStr;
}
const renderCartItemPrice = (item) => {
    let cartPriceStr = '';
    const price = item.price.display
    cartPriceStr += `<div class="cart-item-price">$${price}</div>`;
    return cartPriceStr;
}

const renderCartItems = (data = {}) => {
    
    let cartItemsStr = ``
    Object.values(data).forEach((item,idx) => {
            cartItemsStr +=
            `<div class="cart-items-row">
                <div class="cart-items">
                    <img class="cart-item-img" src=${item.image}></img>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-remove" identifier=${item.identifier}>X</div></div>`
            cartItemsStr += renderCartItemQty(item);
            cartItemsStr += renderCartItemPrice(item);
            cartItemsStr += '</div>'
        });

        return cartItemsStr;
}

const Cart = (store) => {
    const data = store.cartData || {};
    if(Object.keys(data).length > 0) {
        return (
            `<div id="cart-container-id" class="cart-container">
                <div class="cart-header-container"> 
                    <span class="cart-item-header"> items </span>
                    <span class="cart-qty-header"> Qty </span>
                    <span class="cart-price-header"> Price </span>
                </div>
                <div class="cart-items-container">
                    ${renderCartItems(data)}
                </div>
                ${renderCartTotal()}
            </div>`)
    }
    else {
        return (`<div id="cart-container-id" class="cart-empty-container"> Your Cart is Empty </div>`)
    }
}

// export default Cart

    export default Shopping
    export { Cart }
