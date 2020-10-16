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