import './Shopping.scss'


const renderItems = (data) => {
    let retStr = '';
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
    const data = store.shopping;
    const shopStr = `<div id="shopping-page">
            <div class="shopping-container">
                <div class="shopping-items-container">
                ${renderItems(data)}
                </div>
            </div>
            <div id="cart-container-id" class="cart-empty-container"> Your Cart is Empty </div>
        </div>`;
        
        return shopStr;
    }
    
    export default Shopping
