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
        const basketItemsDiv = document.getElementById('offcanvas-body'); 
        basketItemsDiv.innerHTML = "";
        baskets.forEach((item) => {
            const basketItemDiv = document.createElement("div");
            basketItemDiv.classList.add("basket-item");
            basketItemDiv.innerHTML = `
            <p>${item.title} - Quantity: ${item.quantity}</p>
            `;
            basketItemsDiv.appendChild(basketItemDiv);
        });
        
        //? total price will be here
    }

    return {
        addToBasket,
    };

})();

