/*show reviews*/
const boxes = document.querySelectorAll(".review-box");

window.addEventListener("scroll", checkBoxes);

window.addEventListener("load", () => {
    setTimeout(checkBoxes, 10);
});

function checkBoxes(){
    const triggerBottom = window.innerHeight*0.9;
    //innnerHeight takes the height of viewport in pixels

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        //returns the number of pixels between the top of the element and the top of the viewport.
    
        if(boxTop < triggerBottom){
            box.classList.add("show");
        } else{
            box.classList.remove("show");
        }
    });
}