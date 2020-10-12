import './cart.scss'
import { items } from './fixture.json'


const renderItems = () => {
    let retStr = ''
     items.map(item => {
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
                        <button class="shopping-item-addtocart"> Add to cart </button>
                    </div>
                </div>

            </div>
        </div>`;
        
     });

    return retStr;
     }
const cartContainer = () => {
    return ( `<div class="cart-item-container"></div>`)
}

//      <div class="cart-item-count-wrapper">
//      <button class="cart-items-incrementor"> + </button>
//      <input type="text" value="0" readonly class="cart-item-count"></input>
//      <button class="cart-items-incrementor"> - </button>
//  </div>
//  <div class="cart-item-remove">REMOVE</div>
const Shopping = () => {
        return (
        `<div>
            <div class="shopping-items-container">
                ${renderItems()}
            </div>
        </div>`
        )
    }
    
    export default Shopping
