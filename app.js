const btnDivs = document.getElementById("btns")
const productDivs = document.getElementById("products")
const searchInput = document.getElementById("searchInput")
const categoryTitle = document.getElementById("category")

//API URLS
// - Tüm ürünler için => https://anthonyfs.pythonanywhere.com/api/products/
// - Tek bir ürün için = https://anthonyfs.pythonanywhere.com/api/products/{productID}

const products = []

const getProducts = async () => {
    const res = await fetch ("https://anthonyfs.pythonanywhere.com/api/products/")
    const data = await res.json()
    products = data
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
    const categoryArr = [...new Set(products.map(item => item.category))]
    console.log(categoryArr);
}