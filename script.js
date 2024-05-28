// Back to Top Button Functionality
document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.querySelector(".back-to-top");
  
    const toggleBackBtnDisplay = () => {
      window.scrollY > 100 ? backBtn.classList.add("show") : backBtn.classList.remove("show");
    };
  
    const scrollToTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, window.scrollY - 50);
        setTimeout(scrollToTop, 10);
      }
    };
  
    window.addEventListener("scroll", toggleBackBtnDisplay);
    backBtn.addEventListener("click", scrollToTop);
  
    // Increment/Decrement Button Functionality
    function incrementValue(e) {
      e.preventDefault();
      const fieldName = e.target.dataset.field;
      const parent = e.target.closest("div");
      const input = parent.querySelector(`input[name='${fieldName}']`);
      const currentVal = parseInt(input.value, 10);
  
      input.value = isNaN(currentVal) ? 0 : currentVal + 1;
    }
  
    function decrementValue(e) {
      e.preventDefault();
      const fieldName = e.target.dataset.field;
      const parent = e.target.closest("div");
      const input = parent.querySelector(`input[name='${fieldName}']`);
      const currentVal = parseInt(input.value, 10);
  
      input.value = !isNaN(currentVal) && currentVal > 0 ? currentVal - 1 : 0;
    }
  
    document.querySelectorAll(".input-group .button-plus").forEach(btn => {
      btn.addEventListener("click", incrementValue);
    });
  
    document.querySelectorAll(".input-group .button-minus").forEach(btn => {
      btn.addEventListener("click", decrementValue);
    });
  
    // CounterUp Plugin Initialization
    $(".count").counterUp({
      delay: 10,
      time: 1200,
    });
  
    // Responsive Carousel/Slider Functionality
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".book-sale .arrowbtn i");
    const carouselChildren = Array.from(carousel.children);
    let isDragging = false;
    let isAutoPlay = true;
    let startX, startScrollLeft, timeoutId;
  
    const cardsPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
    // Insert copies for infinite scrolling
    carouselChildren.slice(-cardsPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  
    carouselChildren.slice(0, cardsPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
  
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  
    const handleArrowClick = (e) => {
      carousel.scrollLeft += e.target.id === "left" ? -firstCardWidth : firstCardWidth;
    };
  
    arrowBtns.forEach(btn => {
      btn.addEventListener("click", handleArrowClick);
    });
  
    const startDrag = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
  
    const doDrag = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
  
    const stopDrag = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };
  
    const handleInfiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
  
      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlayCarousel();
    };
  
    const autoPlayCarousel = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
      }, 2500);
    };
  
    autoPlayCarousel();
  
    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
    carousel.addEventListener("scroll", handleInfiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlayCarousel);
  
    // Hamburger Menu Functionality
    const hamburgerBtn = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const closeBtn = document.querySelector(".close");
  
    hamburgerBtn.addEventListener("click", () => {
      navList.classList.add("active");
    });
  
    closeBtn.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  
    // Countdown Timer Functionality
    const hour = document.getElementById("hour");
    const minute = document.getElementById("minute");
    const second = document.getElementById("second");
    const countToDate = new Date().setHours(new Date().getHours() + 24);
  
    const updateCountdown = () => {
      const currentDate = new Date();
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
  
      const hours = Math.floor(timeBetweenDates / 3600);
      const minutes = Math.floor(timeBetweenDates / 60) % 60;
      const seconds = timeBetweenDates % 60;
  
      hour.textContent = hours;
      minute.textContent = minutes;
      second.textContent = seconds;
    };
  
    setInterval(updateCountdown, 250);
  });
