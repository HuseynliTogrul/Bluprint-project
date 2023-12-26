"use strict";

import products from "./data.js";

const filterBtn = document.querySelectorAll(".filterBtn")
const filterList = document.querySelectorAll(".filterList")
const chevronIcon = document.querySelectorAll(".chevronIcon")

const categoryList = document.querySelectorAll("#categoryList li")
const colorList = document.querySelectorAll("#colorList li")
const sizeList = document.querySelectorAll("#sizeList li")

const colorListDots = document.querySelectorAll("#colorList li span")

const productsCount = document.getElementById("products-count")

const filteredCategories = []
const filteredColors = []
const filteredSizes = []

filterBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        filterList[index].classList.toggle("hidden")
        chevronIcon[index].classList.toggle("-rotate-180")
    })
});

categoryList.forEach((item, index) => {
    item.addEventListener("click", () => {
        item.classList.toggle("font-black")

        const { category } = item.dataset;

        if (filteredCategories.includes(category)) {
            const indexOfCategory = filteredCategories.indexOf(category)
            filteredCategories.splice(indexOfCategory, 1)
        } else {
            filteredCategories.push(category)
        }
        displayProducts()
        // console.log(filteredCategories);
    })
});

colorList.forEach((item, index) => {
    item.addEventListener("click", () => {
        colorListDots[index].classList.toggle("hidden")

        const { color } = item.dataset;

        if (filteredColors.includes(color)) {
            const indexOfColor = filteredColors.indexOf(color)
            filteredColors.splice(indexOfColor, 1)
        } else {
            filteredColors.push(color)
        }

        displayProducts()
        // console.log(filteredColors);
    })
});

sizeList.forEach((item, index) => {
    item.addEventListener("click", () => {
        item.classList.toggle("bg-black")
        item.classList.toggle("text-white")

        const { size } = item.dataset;

        if (filteredSizes.includes(size)) {
            const indexOfSize = filteredSizes.indexOf(size)
            filteredSizes.splice(indexOfSize, 1)
        } else {
            filteredSizes.push(size)
        }

        displayProducts()
        // console.log(filteredSizes);
    })
})

productsCount.textContent = products.length;

const displayProducts = () => {
    const filterByCategory = products.filter((product) => {
        if (filteredCategories.length === 0 &&
            filteredColors.length === 0 &&
            filteredSizes.length === 0
        )
            return true

        const categoryCondition = filteredCategories.length === 0 ||
            filteredCategories.includes(product.category)

        const colorCondition = filteredColors.length === 0 ||
            filteredColors.includes(product.color)

        const sizeCondition = product.sizes.some((size) => filteredSizes.includes(size))

        return categoryCondition && colorCondition && sizeCondition
    })
    console.log(filterByCategory);
}


displayProducts()