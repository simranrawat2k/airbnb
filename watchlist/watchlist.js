let likedData = JSON.parse(localStorage.getItem("liked")) || [];

const container = document.querySelector(".container");

container.innerHTML = ``;

if(likedData.length<=0){
    allclear();
}

likedData.forEach(x=> {
    const card = document.createElement("div");
    card.className = "add-card";

    card.innerHTML = `<div class="pic">
    <img src="${x.thumb}"
        alt="">
</div>
<div class="add-content">
    <div class="add-flex">
        <h3> ${x.likedPrice}</h3>
        <p class="cross">&times;</p>
    </div>
    <p>${x.likedHeading}</p>
    <p class="add-place">${x.likedPlace}</p>
</div>`;

    container.append(card);

    const cross = card.querySelector(".add-content .add-flex .cross");
    cross.addEventListener("click", ()=> {
        likedData = likedData.filter(i => i.likedId !== x.likedId);
        localStorage.setItem("liked", JSON.stringify(likedData));
        card.remove();
        if(likedData.length<=0){
            
            localStorage.removeItem("liked");
            allclear();
        }
    })
})

function allclear(){
    const empty = document.createElement("div");
    empty.classList = "empty";
    empty.innerHTML = `
    <div class="empty-text">No favorites added yet!</div>
    `

    container.append(empty);
}

const allRemove = document.querySelector("nav .clear-all");

allRemove.addEventListener("click", ()=>{
    localStorage.removeItem("liked");
    container.innerHTML = ``;
    allclear();
})
