"use strict";

import products from "./data.js";

const filterBtn = document.querySelectorAll(".filterBtn");
const filterList = document.querySelectorAll(".filterList");
const chevronIcon = document.querySelectorAll(".chevronIcon");

const categoryList = document.querySelectorAll("#categoryList li");
const colorList = document.querySelectorAll("#colorList li");
const sizeList = document.querySelectorAll("#sizeList li");

const colorListDots = document.querySelectorAll("#colorList li span");

const productsCount = document.getElementById("products-count");

const productsEl = document.getElementById("products");

const filteredCategories = [];
const filteredColors = [];
const filteredSizes = [];

filterBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    filterList[index].classList.toggle("hidden");
    chevronIcon[index].classList.toggle("-rotate-180");
  });
});

categoryList.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("font-black");

    const { category } = item.dataset;

    if (filteredCategories.includes(category)) {
      const indexOfCategory = filteredCategories.indexOf(category);
      filteredCategories.splice(indexOfCategory, 1);
    } else {
      filteredCategories.push(category);
    }
    displayProducts();
  });
});

colorList.forEach((item, index) => {
  item.addEventListener("click", () => {
    colorListDots[index].classList.toggle("hidden");

    const { color } = item.dataset;

    if (filteredColors.includes(color)) {
      const indexOfColor = filteredColors.indexOf(color);
      filteredColors.splice(indexOfColor, 1);
    } else {
      filteredColors.push(color);
    }

    displayProducts();
    // console.log(filteredColors);
  });
});

sizeList.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("bg-black");
    item.classList.toggle("text-white");

    const { size } = item.dataset;

    if (filteredSizes.includes(size)) {
      const indexOfSize = filteredSizes.indexOf(size);
      filteredSizes.splice(indexOfSize, 1);
    } else {
      filteredSizes.push(size);
    }

    displayProducts();
    // console.log(filteredSizes);
  });
});

const displayProducts = () => {
  const filteredProducts = products.filter((product) => {
    if (
      filteredCategories.length === 0 &&
      filteredColors.length === 0 &&
      filteredSizes.length === 0
    ) {
      return true;
    }

    const categoryCondition =
      filteredCategories.length === 0 ||
      filteredCategories.includes(product.category);

    const colorCondition =
      filteredColors.length === 0 || filteredColors.includes(product.color);

    const sizeCondition =
      filteredSizes.length === 0 ||
      filteredSizes.every((size) => product.sizes.includes(size));

    return categoryCondition && colorCondition && sizeCondition;
  });

  productsEl.innerHTML = "";

  filteredProducts.forEach((product) => {
    const pName = product.name
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.slice(1))
      .join(" ");

    productsEl.innerHTML += `<div class="col-span-4 cursor-pointer productItem">
                                <a href="./productPage/product.html">
                                <div class="mb-4 border border-neutral-200 rounded-lg">
                                    <img
                                    src="${product.image}"
                                    alt=""
                                    class="w-full h-[500px]"
                                    />
                                </div>
                                <div class="flex justify-between font-bold">
                                    <div>
                                    <h1 class="text-xl">${pName}</h1>
                                    <p class="text-neutral-500">${product.category}</p>
                                    </div>
                                    <h1 class="text-2xl">
                                    <span>${product.price}</span>
                                    AZN
                                    </h1>
                                </div>
                                </a>
                            </div>`;

    const productItems = document.querySelectorAll(".productItem");
    productItems.forEach((productItem, index) => {
      productItem.addEventListener("click", () => {
        const selectedProduct = filteredProducts[index];
        localStorage.setItem("product", JSON.stringify(selectedProduct));
      });
    });
  });
  productsCount.textContent = filteredProducts.length;
};

displayProducts();
