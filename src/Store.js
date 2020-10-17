function Store() {
    this.cartData = {};  // observers
    this.shopping = {};
}
 
Store.prototype = {
 
    subscribe: function(identifier) {
        if(!this.cartData[identifier]) this.cartData[identifier] = {}
        const cartItem = store.shopping[identifier]
        let isAvailable = store.cartData[identifier]
        isAvailable = Object.keys(isAvailable).length
        if(!isAvailable) {
            if(cartItem) cartItem.qty = 1
            this.cartData[identifier] = cartItem || {}
        }
        return isAvailable
    },
    getQtyCount: function(){
        let totalQty = 0;
        Object.values(this.cartData).forEach(element => {
            totalQty += Number(element.qty)
        });

        return totalQty;
    },
    getTotalAmount: function(){
        const totalPrice = {
            display: 0,
            actual: 0
        };
        Object.values(this.cartData).forEach(item => {
            totalPrice.actual += Number(item.qty) * Number(item.price.actual)
            totalPrice.display += Number(item.qty) * Number(item.price.display)
        });
        console.log(totalPrice)
        return totalPrice;
    },
    setShoppingData: function(data) {
        data.forEach(item => {
            const { identifier } = item
            if(!this.shopping[identifier]) this.shopping[identifier] = {}
            this.shopping[identifier] = item;
        })

    },
    updateItem: function(identifier, data) {
        this.cartData[identifier] = data || {}
    },
    unsubscribe: function(identifier) {
        delete this.cartData[identifier]
    }
}


const store = new Store()
export default store