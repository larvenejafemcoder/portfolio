'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// loading screen
(function initLoaderGame() {
  var container = document.getElementById("loaderGameIn");
  if (!container) return;
  for (var i = 0; i < 27; i++) {
    var div = document.createElement("div");
    div.className = "loaderGame-line";
    container.appendChild(div);
  }
})();

(function () {
  var loadingWrap = document.getElementById("loadingWrap");
  if (!loadingWrap) return;

  var loadingButton = document.getElementById("loadingButton");
  var loadPercent = document.getElementById("loadPercent");
  var jpLoadPercent = document.getElementById("jpLoadPercent");
  var jpLoaderBar = document.querySelector(".jp-loader-bar");

  function updatePercentUI(val) {
    if (loadPercent) loadPercent.textContent = val + "%";
    if (jpLoadPercent) jpLoadPercent.textContent = val + "%";
    if (jpLoaderBar) jpLoaderBar.style.setProperty("--pct", val + "%");
  }

  var loadState = { percent: 0 };
  var interval = setInterval(function () {
    if (loadState.percent <= 50) {
      loadState.percent += Math.round(Math.random() * 5);
    } else {
      clearInterval(interval);
      interval = setInterval(function () {
        loadState.percent += Math.round(Math.random());
        updatePercentUI(loadState.percent);
        if (loadState.percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
    updatePercentUI(loadState.percent);
  }, 100);

  function finishLoading() {
    return new Promise(function (resolve) {
      clearInterval(interval);
      var fastInterval = setInterval(function () {
        if (loadState.percent < 100) {
          loadState.percent++;
          updatePercentUI(loadState.percent);
        } else {
          clearInterval(fastInterval);
          resolve();
        }
      }, 2);
    });
  }

  var loadingClicked = false;

  loadingButton.addEventListener("click", async function () {
    if (loadingClicked) return;
    loadingClicked = true;
    loadingButton.classList.add("loading-complete");
    await finishLoading();
    loadingWrap.classList.add("loading-clicked");
    var loaderGame = document.getElementById("loaderGame");
    if (loaderGame) loaderGame.classList.add("loader-out");

    setTimeout(function () {
      var loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) loadingScreen.style.display = "none";
      document.body.style.overflowY = "auto";
    }, 1000);
  });

  loadingWrap.addEventListener("mousemove", function (e) {
    var rect = loadingWrap.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    loadingWrap.style.setProperty("--mouse-x", x + "px");
    loadingWrap.style.setProperty("--mouse-y", y + "px");
  });
})();


// floating particles
(function initParticles() {
  var canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var particles = [];
  for (var i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.3 + 0.1,
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(168, 85, 247, " + p.o + ")";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();