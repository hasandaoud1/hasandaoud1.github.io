// ========================================
// Hasan Daoud Portfolio Slider
// app.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".carousel .list .item");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");

    const thumbnails = document.querySelectorAll(".thumbnail .item");

    let current = 0;

    //------------------------------------
    // Show Slide
    //------------------------------------

    function showSlide(index){

        if(index < 0){
            index = slides.length - 1;
        }

        if(index >= slides.length){
            index = 0;
        }

        slides.forEach(slide=>{
            slide.classList.remove("active");
        });

        thumbnails.forEach(item=>{
            item.classList.remove("active");
        });

        slides[index].classList.add("active");

        if(thumbnails[index]){
            thumbnails[index].classList.add("active");
        }

        current = index;

    }

    //------------------------------------
    // Next
    //------------------------------------

    function nextSlide(){

        showSlide(current + 1);

    }

    //------------------------------------
    // Previous
    //------------------------------------

    function prevSlide(){

        showSlide(current - 1);

    }

    //------------------------------------
    // Buttons
    //------------------------------------

    if(nextBtn){

        nextBtn.addEventListener("click",nextSlide);

    }

    if(prevBtn){

        prevBtn.addEventListener("click",prevSlide);

    }

    //------------------------------------
    // Thumbnail Click
    //------------------------------------

    thumbnails.forEach((thumb,index)=>{

        thumb.addEventListener("click",()=>{

            showSlide(index);

        });

    });

    //------------------------------------
    // Keyboard
    //------------------------------------

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){

            nextSlide();

        }

        if(e.key==="ArrowLeft"){

            prevSlide();

        }

    });

    //------------------------------------
    // Swipe Support
    //------------------------------------

    let startX = 0;
    let endX = 0;

    const carousel = document.querySelector(".carousel");

    carousel.addEventListener("touchstart",(e)=>{

        startX = e.changedTouches[0].screenX;

    });

    carousel.addEventListener("touchend",(e)=>{

        endX = e.changedTouches[0].screenX;

        let distance = endX - startX;

        if(distance > 60){

            prevSlide();

        }

        if(distance < -60){

            nextSlide();

        }

    });

    //------------------------------------
    // Mouse Wheel (Optional)
    //------------------------------------

    carousel.addEventListener("wheel",(e)=>{

        e.preventDefault();

        if(e.deltaY > 0){

            nextSlide();

        }else{

            prevSlide();

        }

    },{passive:false});

    //------------------------------------
    // Initialize
    //------------------------------------

    showSlide(0);
    // ===============================
// MENU NAVIGATION
// ===============================

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        let slide = parseInt(this.dataset.slide);

        showSlide(slide);

    });

});

});
