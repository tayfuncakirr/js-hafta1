
const images = [
    "img/pexels1.jpg",
    "img/pexels2.jpg",
    "img/pexels3.jpg",
    "img/pexels4.jpg"
];

let currentIndex = 0;

const slide = document.getElementById("slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function showSlide(index){
    slide.src = images[index];
}

prevBtn.addEventListener("click", ()=>{
     currentIndex--;
     if(currentIndex < 0){
        currentIndex = images.length -1;
     }
     showSlide(currentIndex);
});

nextBtn.addEventListener("click", ()=>{
    currentIndex ++;
    if(currentIndex >= images.length){
        currentIndex = 0;
    }
    showSlide(currentIndex);
})




