import { basketModule } from "./Basket.js";

const btnDivs = document.getElementById("btns")
const productDivs = document.getElementById("products")
const searchInput = document.getElementById("searchInput")
const categoryTitle = document.getElementById("category")
const modalBody = document.querySelector(".modal-body")

const btnColors = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
];

let products = [];
let baskets = [];

const getProducts = async () => {
    try {
        const res = await fetch ("https://anthonyfs.pythonanywhere.com/api/products/")
        const data = await res.json()
        console.log(data);
        products = data
        category();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
getProducts()

const category = () => {
    console.log(products);
    const categoryArr = [
        "all",
        ...new Set(products.map((item) => item.category)),
      ];
      console.log(categoryArr);

    categoryArr.forEach((category, i) => {
        const btn = document.createElement("button")
        btn.innerText = category.toUpperCase();
        btn.classList.add("btn", `btn-${btnColors[i]}`)
        btnDivs.appendChild(btn);
    })
};

function displayProducts(arr){
    productDivs.innerHTML = "";
    arr.forEach((item) => {
        const { id, title, description, price, image } = item;
        const productDiv = document.createElement("div");
        productDiv.classList.add("col");
        productDiv.setAttribute("id", id);
        productDiv.innerHTML = `
            <div class="card">
                <img src="${image}" class="p-2" height="250px" alt="...">
                <div class="card-body">
          <h5 class="card-title">${title}</h5>
                  <p class="card-text line-clamp-2">${description}</p>
                </div>
                <div class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
                <span>Price:</span><span>${price} $</span>
                    
                </div>
                <div class="card-footer w-100 d-flex justify-content-center gap-3">
                    <button class="btn btn-danger">
                    Sepete Ekle
                    </button>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    See Details
                    </button>
                </div>
              </div>
            `;
        productDiv.addEventListener("click", (e) => {
            if(e.target.classList.contains("btn-danger")){
                addToBasket(item);
            } else if (e.target.classList.contains("btn-primary")){
                showModal(item)
            } //! it says undefined (error)
        })
        productDivs.appendChild(productDiv)
    });
}

// //! THIS PART WILL BE EDITED ASAP
// function addToCart(product){
//     console.log(product);
//     if(baskets.some((item) => item.title === product.title)) {
//         baskets = baskets.map((item) => {
//             return item.id === product.id
//             ? {...item, quantity: item.quantity + 1}
//             : item;
//         });
//     } else {
//         baskets.push(product);
//     }
//     console.log(baskets);
// } //! EDIT EDIT EDIT EDIT 

function showModal(product){
    fetch(`https://anthonyfs.pythonanywhere.com/api/products/${product.id}`)
    .then((res) => res.json())
    .then((res) => {
        modalBody.innerHTML = `<div class="text-center">
              <img src="${res.image}" class="p-2" height="250px" alt="...">
              <h5 class="card-title">${res.title}</h5>
              <p class="card-text">${res.description}</p>
              <p class="card-text">Fiyat: ${res.price} $</p>
              </div>
              `;
    });
}

btnDivs.addEventListener("click", (e) => {
    if(e.target.classList.contains("btn")){
        const selectedCategory = e.target.innerText.toLowerCase();
        categoryTitle.innerText = selectedCategory.toUpperCase();
        const value = searchInput.value;
        const filteredProducts = filtered(selectedCategory.value)
        displayProducts(filteredProducts)
    }
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    const selectedCategory = categoryTitle.innerText.toLowerCase()
    const filteredProducts = filtered(selectedCategory.value)
    displayProducts(filteredProducts)
});

function filtered(selectedCategory,value){
    const newArr = selectedCategory === "all" 
    ? products
    : products.filter(
        (item) => 
            item.category.toLowerCase() ===
            selectedCategory &&
            item.title.toLowerCase().includes(value.toLowerCase())
        );
    return newArr
}

productDivs.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")){
        const productId = e.target.closest(".col").id;
        const selectedProduct = products.find((product) => product.id === productId);
        basketModule.addToBasket(selectedProduct);
    } else if (e.target.classList.contains("btn-primary")) {
        const productId = e.target.closest(".col").id;
        const selectedProduct = products.find((product) => product.id === productId);
        showModal(selectedProduct);
    }
});