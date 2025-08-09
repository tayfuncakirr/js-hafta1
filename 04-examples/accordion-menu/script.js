
const accordionPanel = document.querySelectorAll(".panels");

accordionPanel.forEach((item, index) => {
let header = item.querySelector("header");
header.addEventListener("click",()=>{
    item.classList.toggle("open");
    let loremText = item.querySelector(".loremtext");
    if (item.classList.contains("open")) {
        loremText.style.height = `${loremText.scrollHeight}px`;
        item.querySelector("i").classList.replace("fa-plus", "fa-minus");
    }
    else{
        loremText.style.height = "0px";
        item.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
    
    removeOpen(index);
    
    
})


})

function removeOpen(index){
    accordionPanel.forEach ((item, index2)=>{
        if (index != index2){
            item.classList.remove("open");
        let loremt =item.querySelector(".loremtext")
        loremt.style.height ="0px";
        item.querySelector("i").classList.replace("fa-minus", "fa-plus");

        }
    })
}


    







