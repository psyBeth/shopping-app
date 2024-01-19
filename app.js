const btnDivs = document.getElementById("btns")
const productDivs = document.getElementById("products")
const searchInput = document.getElementById("searchInput")
const categoryTitle = document.getElementById("category")

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

//API URLS
// - Tüm ürünler için => https://anthonyfs.pythonanywhere.com/api/products/
// - Tek bir ürün için = https://anthonyfs.pythonanywhere.com/api/products/{productID}

let products = []

const getProducts = async () => {
    const res = await fetch ("https://anthonyfs.pythonanywhere.com/api/products/")
    const data = await res.json()
    products = data
    category();
    displayProducts(products);
}

getProducts()

const category = () => {
    console.log(products);
    // const categoryArr = products.map(item => item.category);
    // console.log(categoryArr);
    //* 1st method
    // let categoryArr = ["all"]
    // products.forEach(item => {
    //     if(!categoryArr.includes(item.category)){
    //         categoryArr.push(item.category)
    //     }
    // })
    //* 2nd method
    // const categoryArr = products.reduce((acc, item) => {
    //     if(!acc.includes(item.category)){
    //         acc.push(item.category)
    //     }
    //     return acc
    // }, ["all"])
    // console.log(categoryArr);
    //* 3rd method
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
                addToCart(item);
            } else if (e.target.classList.contains("btn-primary")){
                showModal(item)
            }
        })
        productDivs.appendChild(productDiv)
    });
}

function addToCart()

function showModal()