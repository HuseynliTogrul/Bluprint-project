"use strict";

const productCategory = document.getElementById("productCategory")
const productName = document.getElementById("productName")
const productImage = document.getElementById("productImage")
const productPrice = document.getElementById("productPrice")
const productColor = document.getElementById("productColor")

const decreaseEL = document.getElementById("decrease")
const counterEl = document.getElementById("counter")
const increaseEl = document.getElementById("increase")

const addToCart = document.getElementById("addToCart")

const sizesListLiEl = document.querySelectorAll("#sizesList li")
const sizesListDatas = [...sizesListLiEl].map((item) => item.dataset.sizes)
const sizesListBtnEl = document.querySelectorAll("#sizesList button")

let count = 1;
counterEl.value = count;

const { category, name, image, price, color, sizes } = JSON.parse(localStorage.getItem("product"))

const pName = name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ")

productCategory.textContent = category
productName.textContent = pName
productPrice.textContent = `${price} AZN`
productColor.classList.add(`${color === "black" ? "!bg-black" : `bg-${color}-500`}`)
productImage.src = image

decreaseEL.addEventListener("click", () => {
    if (count > 1) {
        count--;
    }
    counterEl.value = count
})

increaseEl.addEventListener("click", () => {
    if (count < 10) {
        count++;
    }
    counterEl.value = count
})

addToCart.addEventListener("click", () => {
    const fetchedCartItems = JSON.parse(localStorage.getItem("cartItems"))

    const addedProduct = {
        name: pName,
        price: price,
        category: category,
        color: color,
        image: image,
        count: count
    }

    if (!fetchedCartItems) {
        cartItems.push(addedProduct)
    } else {
        cartItems.push(...fetchedCartItems)
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
})

sizesListDatas.forEach((size, index) => {
    if (!sizes.includes(size)){
        sizesListLiEl[index].classList.add("opacity-40");
        sizesListBtnEl[index].classList.add("cursor-none-allowed");
    }
});