export const basketModule = ( function() {
    let baskets = [];

    function addToBasket(product) {
        if (baskets.some((item) => item.title === product.title)) {
            baskets = baskets.map((item) => {
              return item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            });
        } else {
            baskets.push(product);
        }
        console.log(baskets);
        updateBasketUI();
    }

    function updateBasketUI() {

    }

    return {
        addToBasket,
    };

})();

