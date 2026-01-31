'use strict';

// ELEMENT TOGGLE
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// SIDEBAR
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// NAVIGATION
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.getAttribute("data-nav-link");
    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });
    navLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");
  });
});

// PORTFOLIO FILTER
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle custom select
if(select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      elementToggleFunc(select);
    });
  });
}

// Filter function
function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    item.classList.remove("active");
    if(selectedValue === "all" || selectedValue === item.dataset.category.toLowerCase()) {
      item.classList.add("active");
    }
  });
}

// FORM VALIDATION
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if(form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});
