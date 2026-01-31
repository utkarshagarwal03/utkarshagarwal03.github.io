"use strict";

// ELEMENT TOGGLE
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// SIDEBAR
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// NAVIGATION
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.navLink;
    pages.forEach(page => page.classList.toggle("active", page.dataset.page === target));
    navLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");
  });
});

// PORTFOLIO FILTER
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if(select) {
  select.addEventListener("click", () => elementToggleFunc(select));
  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selected = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      filterItems.forEach(i => i.classList.toggle("active", selected === "all" || i.dataset.category.toLowerCase() === selected));
      elementToggleFunc(select);
    });
  });
}

// FORM VALIDATION
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if(form.checkValidity()) formBtn.removeAttribute("disabled");
    else formBtn.setAttribute("disabled", "");
  });
});

