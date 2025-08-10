
const products = [
    {name:"Telefon", price:12000},
    {name:"Bilgisayar", price:25000},
    {name:"Kulaklık", price:2000},
    {name:"Akıllı saat", price:3500},
    {name:"mouse", price:1000}
];
let cart = [];
let totalPrice = 0;

 cart = JSON.parse(localStorage.getItem("cart"));
 totalPrice = parseFloat(localStorage.getItem("totalPrice"));

function renderProducts (){
    const productContainer = document.querySelector(".products");
    productContainer.innerHTML = "";

    products.forEach((product,index)=>{
       const div = document.createElement("div");
       div.classList.add("product")
       div.innerHTML = `
       <h3>${product.name}</h3>
        <p>Fiyat: <span>${product.price}</span>₺</p>
        <button onclick="addToCart(${index})">Sepete Ekle</button>
       `
       productContainer.appendChild(div)
    });
}
function addToCart(productIndex){
    const product =products[productIndex] ;
    cart.push(product);
    totalPrice += product.price;
    updateCart();
    showLength()
}
function showLength(){
    const cartLength = document.getElementById("cartLength");
     cartLength.innerText = cart.length;
}


function removeFromCart(index){
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
    showLength()
}

function updateCart(){
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach((item,index) =>{
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} ₺`;
       
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Kaldır";
        removeBtn.style.marginLeft = "10px";
        removeBtn.addEventListener("click", ()=>{
           removeFromCart(index);
        })

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
    document.getElementById("total").textContent = totalPrice;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice);
}

renderProducts();
updateCart();
showLength();



    








       
       

       





