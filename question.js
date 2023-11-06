/*show title "aircover"*/
const aircoverElement = document.querySelector('.content .aircover');
const hostElement = document.querySelector('.content .host');
const paraElement = document.querySelector('.content .aircover-para');

function showElements() {
    aircoverElement.classList.add('show');
    hostElement.classList.add('show');
    paraElement.classList.add('show');
}
showElements();

const questions  = document.querySelectorAll(".question");

questions.forEach(function (ques){
    const btn = ques.querySelector(".question-btn");

    btn.addEventListener("click", function(){

        questions.forEach(function (item){
            if(item !== ques){
                item.classList.remove("show-text");
            }
        });

        ques.classList.toggle("show-text")
    });
});