/*==================================================
    HASAN DAOUD PORTFOLIO
    app.js
    PART 1
==================================================*/

// ==============================
// SELECT ELEMENTS
// ==============================

const slides = document.querySelectorAll(".carousel .item");

const navLinks = document.querySelectorAll("nav a");

const thumbnails = document.querySelectorAll(".thumbnail .item");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");

const carousel = document.querySelector(".carousel");

// ==============================
// SETTINGS
// ==============================

let currentSlide = 0;

let autoPlay = null;

let autoPlayDelay = 10000; // 10 seconds

// ==============================
// SHOW SLIDE
// ==============================

function showSlide(index){

    // Wrap around

    if(index >= slides.length){

        index = 0;

    }

    if(index < 0){

        index = slides.length - 1;

    }

    // Remove active class

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

    });

    thumbnails.forEach(item=>{

        item.classList.remove("active");

    });

    // Add active class

    slides[index].classList.add("active");

    if(navLinks[index]){

        navLinks[index].classList.add("active");

    }

    if(thumbnails[index]){

        thumbnails[index].classList.add("active");

    }

    currentSlide = index;

}

// ==============================
// NEXT
// ==============================

function nextSlide(){

    showSlide(currentSlide + 1);

}

// ==============================
// PREVIOUS
// ==============================

function prevSlide(){

    showSlide(currentSlide - 1);

}
/*==================================================
    PART 2
    EVENTS • AUTOPLAY • PAUSE
==================================================*/


// ==============================
// NAVIGATION
// ==============================

navLinks.forEach((link,index)=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        stopAutoPlay();

        showSlide(index);

        restartAutoPlay();

    });

});


// ==============================
// THUMBNAILS
// ==============================

thumbnails.forEach((thumb,index)=>{

    thumb.addEventListener("click",()=>{

        stopAutoPlay();

        showSlide(index);

        restartAutoPlay();

    });

});


// ==============================
// NEXT BUTTON
// ==============================

nextBtn.addEventListener("click",()=>{

    stopAutoPlay();

    nextSlide();

    restartAutoPlay();

});


// ==============================
// PREVIOUS BUTTON
// ==============================

prevBtn.addEventListener("click",()=>{

    stopAutoPlay();

    prevSlide();

    restartAutoPlay();

});


// ==============================
// AUTO PLAY
// ==============================

function startAutoPlay(){

    stopAutoPlay();

    autoPlay = setInterval(()=>{

        nextSlide();

    },autoPlayDelay);

}


// ==============================
// STOP AUTO PLAY
// ==============================

function stopAutoPlay(){

    clearInterval(autoPlay);

}


// ==============================
// RESTART
// ==============================

function restartAutoPlay(){

    stopAutoPlay();

    autoPlay = setInterval(()=>{

        nextSlide();

    },autoPlayDelay);

}



// ==============================
// PAUSE WHEN READING
// ==============================

const contentBoxes = document.querySelectorAll(".content");

contentBoxes.forEach(box=>{

    box.addEventListener("mouseenter",()=>{

        stopAutoPlay();

    });

    box.addEventListener("mouseleave",()=>{

        restartAutoPlay();

    });

});



// ==============================
// PAUSE WHEN SCROLLING
// ==============================

contentBoxes.forEach(box=>{

    box.addEventListener("scroll",()=>{

        stopAutoPlay();

        clearTimeout(box.scrollTimer);

        box.scrollTimer = setTimeout(()=>{

            restartAutoPlay();

        },4000);

    });

});



// ==============================
// PAUSE WHEN WINDOW HIDDEN
// ==============================

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        stopAutoPlay();

    }else{

        restartAutoPlay();

    }

});
/*==================================================
    PART 3
    MOBILE • KEYBOARD • INIT
==================================================*/


// ==============================
// KEYBOARD SUPPORT
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        stopAutoPlay();

        nextSlide();

        restartAutoPlay();

    }

    if(e.key==="ArrowLeft"){

        stopAutoPlay();

        prevSlide();

        restartAutoPlay();

    }

});


// ==============================
// MOBILE SWIPE
// ==============================

let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart",(e)=>{

    touchStartX = e.changedTouches[0].screenX;

},{passive:true});


carousel.addEventListener("touchend",(e)=>{

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

},{passive:true});


function handleSwipe(){

    const distance = touchStartX - touchEndX;

    if(Math.abs(distance) < 50){

        return;

    }

    stopAutoPlay();

    if(distance > 0){

        nextSlide();

    }else{

        prevSlide();

    }

    restartAutoPlay();

}



// ==============================
// PROGRESS BAR
// ==============================

const progressBar = document.querySelector(".time");

function startProgress(){

    if(!progressBar) return;

    progressBar.style.transition = "none";

    progressBar.style.width = "0%";

    requestAnimationFrame(()=>{

        requestAnimationFrame(()=>{

            progressBar.style.transition =
                `width ${autoPlayDelay}ms linear`;

            progressBar.style.width = "100%";

        });

    });

}

function restartProgress(){

    startProgress();

}



// ==============================
// UPDATE SHOWSLIDE
// ==============================

const originalShowSlide = showSlide;

showSlide = function(index){

    originalShowSlide(index);

    restartProgress();

};



// ==============================
// PAUSE WHEN MOUSE OVER CAROUSEL
// ==============================

carousel.addEventListener("mouseenter",()=>{

    stopAutoPlay();

});


carousel.addEventListener("mouseleave",()=>{

    restartAutoPlay();

});



// ==============================
// WINDOW RESIZE
// ==============================

window.addEventListener("resize",()=>{

    showSlide(currentSlide);

});



// ==============================
// INITIALIZE
// ==============================

showSlide(0);

startAutoPlay();

startProgress();



// ==============================
// CONSOLE MESSAGE
// ==============================

console.log("Hasan Daoud Portfolio Loaded Successfully");
