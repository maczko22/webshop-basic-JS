// oldalsó menű kezelése
const vegburger = document.getElementById('vegburger')
const nav = document.getElementById('nav')

console.log(this)

// klikkre css osztályokat cserélünk
vegburger.addEventListener('click', () => {
    nav.classList.toggle('menu-active')
    vegburger.classList.toggle('fi-align-justify')
    vegburger.classList.toggle('fi-arrow-left')
    console.log(this)
})

nav.addEventListener('mouseleave', () => {
    nav.classList.remove('menu-active')
    vegburger.classList.remove('fi-arrow-left')
    vegburger.classList.add('fi-align-justify')
    console.log(this)
})

/*
const number1 = 5
const number2 = 7
number1 + number2
number1 * number2

//stringek
const greeting = 'Gauranga'

// boolean
const inStock = true

// tömb

const product = ['málna', 'áfonya', 'szeder']
product[1] //0-tól indul az indexelés

//objectum

const malna = {
    name: 'málna',
    picture: 'malna.jpg',
    price: 3800,
}
//malna.picture


//állandók
const VAT = 27

//változok

let amount = 0

//régi - ne használd
var foo = 'bar'
*/
//termékek beilesztése


let products = []
const productsSection = document.getElementById('products')

fetch('https://hur.webmania.cc/products.json')
.then(response => response.json())
.then(data => {
    products = data.products
    products.forEach(product => {
        productsSection.innerHTML += `<div>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="${product.picture}">
        <span>${product.stock}</span>
        <h3>${product.price} Ft</h3>
        <a id="${product.id}" class="addToCart">Kosárba</a>
        </div>`

        const addToCartButtons = document.getElementsByClassName('addToCart')
        // nézük meg hogy hány darab van belölük
        const buttonCount = addToCartButtons.length
        // lépegessünk végig rajta
        for(let i = 0; i < buttonCount; i++) {
        //adjunk hozzájuk egyesével egy klick figyelőt
        addToCartButtons[i].addEventListener('click', addToCart)
        }
    })    
})
.catch(error => console.log(error))

//inStock


// kosár kezelése
const cart = {}

const addToCart = (event) => {
    // nézzük meg hogy a kosárba gombot nyomtuk meg (van id) vagy a + gombot (nincs id)
    /*
    let target = event.target.dataset.id
    if (event.target.id) {  
        target = event.target.id
    */
    //ternary operator
    let target = event.target.id ? event.target.id : event.target.dataset.id

    //ha még nincs benne a kosárban akkor adjuk hozzá 1 darabbal
            if (cart[target] == undefined) {
                cart[target] = 1
            } else {
    // ha már benne van növeljűk a darabszámot
                cart[event.target.id]++
            }
        }


    const discountMinimumAmount = 30000
    const discountMinimumPieces = 12
    const discount = 0.1

    const refreshCartItems = () => {
        //jelenlegi cart-itmes tartalom kiürítése
    cartItems.innerHTML = ''
    //total 0-ázása
    let total = 0, maxPieces = 0
    // jelenítsük meg ami a kosárban van
    // lépegessünk végig a cart-on és product tömbből keressük ki a szóban forgó terméket és jeleítsük meg a nevét, a cartban lévő darabszámot és a termék árát
    for (const id in cart) {
        const currentProduct = products.find(product => product.id == id)
    
        cartItems.innerHTML += `<li>
        <button data-id="${currentProduct.id}">+</button>
        ${cart[id]} db - ${currentProduct.name} * ${currentProduct.price} Ft/db</li>`
        // adjuk hozzá ennek az értékét a teljes összeghez
        
        total += currentProduct.price * cart[id]

        maxPieces = cart[id] > maxPieces ? cart[id] : maxPieces
        
        //itt már tudnánk esemény figyelőt rátenni csak nem akarunk
    }
    // a végén jeleítsük meg a teljes vásárlási összeget
    cartItems.innerHTML += `<li>Összesen: ${total.toLocaleString} Ft</li>`

    // ha van olyan termék amiből több mint 10 van vagy a total nagyobb mint 50000 akkor adjunk 10% kedvezményt
    // logika vizsgálatok: vagy || és && így néz ki
    // egyenlő ==
    // tipusosan egyenlő ===
    // ! ez a nem egyenlő
    if (total > discountMinimumAmount || maxPieces >= discountMinimumPieces) {
        cartItems.innerHTML += `<li>Kedvezmény: ${(total * discount).toLocaleString()} Ft</li>`
    }

    }
// gyűtjük ki az addToCard css class-ú elemeket

const cartIcon = document.getElementById('cart-icon')
const cartContent = document.getElementById('cart-content')
const cartItems = document.getElementById('cart-items')
let total = 0

cartIcon.addEventListener('click', function () {
    cartContent.classList.toggle('active')
    
    refreshCartItems()
})

// tegyük rá a "+" gomokra a click figyelőt a kosárba helyezéssel
// event delegation
cartItems.addEventListener('click', (event) => {
addToCart(event)
refreshCartItems()
})


