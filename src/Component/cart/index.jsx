import './cart.scss'
import { items } from './fixture.json'


const renderItems = () => {
    let retStr = ''
     items.map(item => {
        retStr += 
         `<div class="cart-item">
            <div class="cart-left-container">
                <div class="cart-item-discount">${item.discount}<span>% off</span></div>
                 <img class="cart-item-image" src=${item.image}></img> 
            </div>
            <div class="cart-right-container">
                <div class="cart-items-name-price">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price-container"> 
                        <div class="cart-item-display"> ₹${item.price.display} </div>
                        <div class="cart-item-actual">${item.price.actual}</div>
                    </div>
                </div>
                <div class="cart-item-count-wrapper">
                    <button class="cart-items-incrementor"> + </button>
                    <input type="text" value="0" readonly class="cart-item-count"></input>
                    <button class="cart-items-incrementor"> - </button>
                </div>
                <div class="cart-item-remove">REMOVE</div>
            </div>
        </div>`;
        
     });

    return retStr;
     }

const Cart = () => {
        return (
        `<div>
            <div class="cart-items-container">
                ${renderItems()}
            </div>
        </div>`
        )
    }
    
    export default Cart
