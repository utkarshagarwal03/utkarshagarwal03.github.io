"use strict";

// ELEMENT TOGGLE
const elementToggleFunc = function (elem) { 
  if (elem) elem.classList.toggle("active"); 
}

// SIDEBAR - Only enable toggle on mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  // Check if we're on mobile
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  
  // Only add toggle on mobile, auto-expand on desktop
  if (isMobile) {
    sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
  } else {
    // Desktop: always show contacts
    sidebar.classList.add("active");
  }
  
  // Handle window resize
  window.addEventListener("resize", () => {
    const isMobileNow = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobileNow) {
      sidebar.classList.add("active");
    }
  });
}

// NAVIGATION
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.navLink;
    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === target);
    });
    navLinks.forEach(btn => btn.classList.remove("active"));
    link.classList.add("active");
  });
});

// PORTFOLIO FILTER
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select && selectValue) {
  select.addEventListener("click", (e) => {
    e.stopPropagation();
    elementToggleFunc(select);
  });
  
  selectItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const selected = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      filterItems.forEach(i => {
        i.classList.toggle("active", selected === "all" || i.dataset.category.toLowerCase() === selected);
      });
      elementToggleFunc(select);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target) && select.classList.contains("active")) {
      select.classList.remove("active");
    }
  });
}

// FORM VALIDATION
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  // Form submission feedback
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = formBtn;
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Sending...";
    submitBtn.setAttribute("disabled", "");
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        submitBtn.textContent = "Message Sent!";
        submitBtn.style.color = "var(--orange-blue-crayola)";
        form.reset();
        formBtn.setAttribute("disabled", "");
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.color = "";
        }, 3000);
      } else {
        // Handle Formspree validation errors
        if (data.errors) {
          alert("Please check your form: " + JSON.stringify(data.errors));
        }
        throw new Error(data.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Form error:", error);
      submitBtn.textContent = "Error - Try Again";
      submitBtn.style.color = "#ff6b6b";
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.color = "";
        if (form.checkValidity()) {
          submitBtn.removeAttribute("disabled");
        }
      }, 3000);
    }
  });
}

