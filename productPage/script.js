"use strict";

const productCategory = document.getElementById("productCategory")
const productName = document.getElementById("productName")
const productImage = document.getElementById("productImage")
const productPrice = document.getElementById("productPrice")
const productColor = document.getElementById("productColor")

const {category,name,image,price,color} = JSON.parse(localStorage.getItem("product"))

const pName = name.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ")

productCategory.textContent = category
productName.textContent = pName
productPrice.textContent = `${price} AZN`
productColor.classList.add(`${color === "black" ? "!bg-black" : `bg-${color}-500`}`)
productImage.src = image