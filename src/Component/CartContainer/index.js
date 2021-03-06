import './style.scss';

const renderCartTotal = (store) => {
    const totalQty = store.getQtyCount();
    const totalPrice = store.getTotalAmount();
    const { actual, display} = totalPrice
    const discount = display - actual
    let cartTotalStr ='';
    cartTotalStr += `<div class="cart-summary">
        <div class="cart-summary-header">Total</div>
        <div class="grid-container">
            <div class="grid-item-left">Items(<span id="total-qty">${totalQty}</span>)</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right" id="total-amount">$${display}</div>  
            <div class="grid-item-left">Discount</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right" id="total-discount">- $${discount}</div>
            <div class="grid-item-left">Type Discount</div>
            <div class="grid-item-separator">:</div>
            <div class="grid-item-right">- $0</div>
            <div class="grid-item-left cart-backgroundColor">Order Total</div>
            <div class="grid-item-separator cart-backgroundColor">:</div>
            <div class="grid-item-right cart-backgroundColor" id="total-sum">$${actual}</div>
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
    const price = item.price.actual
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
                    <img class="cart-item-remove" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAxMyAxMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4wNTQgMWwxMC41NDMgMTAuNjVtLjA1NC0xMC41OTZMMSAxMS41OTciIHN0cm9rZT0iIzQxNDE0MSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSIvPjwvc3ZnPgo=" identifier=${item.identifier}></img></div>`
            cartItemsStr += renderCartItemQty(item);
            cartItemsStr += renderCartItemPrice(item);
            cartItemsStr += '</div>'
        });

        return cartItemsStr;
}

const CartContainer = (store) => {
    let cartStr = '';
    const data = store.cartData || {};
    const totalQty = store.getQtyCount();
    if(Object.keys(data).length > 0) {
        cartStr +=
            `<div id="cart-container-id" class="cart-container">
                <div class="cart-label"> Cart Items </div>
                <div class="cart-header-container"> 
                    <div class="cart-item-header"> Items(<span id="total-header-qty">${totalQty}</span>) </div>
                    <div class="cart-qty-header"> Qty </div>
                    <div class="cart-price-header"> Price </div>
                </div>
                <div class="cart-items-container">
                    ${renderCartItems(data)}
                </div>
                ${renderCartTotal(store)}
            </div>`;
    }
    else {
        cartStr += `<div id="cart-container-id" class="cart-empty-container"> Your Cart is Empty </div>`;
    }
    return cartStr;
}

export default CartContainer
export { CartContainer }