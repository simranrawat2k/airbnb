const giftCardOne = [
  {
    title: "Escape to Nature's Embrace",
    price: "$100",
    description:
      "Experience the beauty of the great outdoors with this gift card. Cozy up in rustic cabins, hike through scenic trails, and stargaze by the campfire.",
  },
  {
    title: "Discover Local Culture",
    price: "$85",
    description:
      "Immerse yourself in the richness of local culture with this gift card. Explore traditions, taste authentic cuisine, and create lasting connections.",
  },
  {
    title: "Friends & Family Get-Together",
    price: "$120",
    description:
      "Celebrate togetherness with this gift card. Book a spacious vacation rental, enjoy quality time with loved ones, and create cherished memories.",
  },
];

const giftCardTwo = [
  {
    title: "Culinary Delights Escapade",
    price: "$100",
    description:
      "Embark on a gastronomic adventure with this gift card. Indulge in the finest cuisine, savor delectable flavors, and explore culinary wonders.",
  },
  {
    title: "Feast with Friends & Family",
    price: "$120",
    description:
      "Celebrate togetherness with this gift card. Reserve a spacious vacation rental, relish delectable meals, and create cherished culinary memories together.",
  },
  {
    title: "Local Flavor Discovery",
    price: "$85",
    description:
      "Delve into the heart of local cuisine. Experience the diverse flavors, discover hidden foodie gems, and forge memorable connections through shared meals.",
  },
];

/*card-1*/
let currentOne = 0;

const leftOne = document.querySelector(".card-1 .btn-container .left-arrow");
const rightOne = document.querySelector(".card-1 .btn-container .right-arrow");

const cardOneHeading = document.querySelector(".shop-text-1 h2");
const priceOne = document.querySelector(".shop-text-1 .price");
const paraOne = document.querySelector(".shop-text-1 .para");

window.addEventListener("DOMContentLoaded", () => {
  currentOne = 0;
  showCardOne();
});

function showCardOne() {
  const arrayOne = giftCardOne[currentOne];
  cardOneHeading.textContent = arrayOne.title;
  priceOne.textContent = arrayOne.price;
  paraOne.textContent = arrayOne.description;
}

rightOne.addEventListener("click", () => {
  currentOne++;
  if (currentOne > 2) {
    currentOne = 0;
  }

  showCardOne();
});

leftOne.addEventListener("click", () => {
  currentOne--;
  if (currentOne < 0) {
    currentOne = 2;
  }
  showCardOne();
});

/*card-2*/

var currentTwo = 0;

const headingTwo = document.querySelector(".shop-text-2 h2");
const priceTwo = document.querySelector(".shop-text-2 .price");
const paraTwo = document.querySelector(".shop-text-2 .para");

const leftTwo = document.querySelector(".card-2 .btn-container .left-arrow");
const rightTwo = document.querySelector(".card-2 .btn-container .right-arrow");

window.addEventListener("DOMContentLoaded", ()=>{
  currentTwo=0;
  showCardTwo();
})

leftTwo.addEventListener("click", ()=>{
  currentTwo--;
  if(currentTwo<0){
    currentTwo = 2;
  }
  showCardTwo();
})

rightTwo.addEventListener("click", ()=>{
  currentTwo++;
  if(currentTwo>2){
    currentTwo = 0;
  }
  showCardTwo();
})

function showCardTwo(){
  const item = giftCardTwo[currentTwo];

  headingTwo.textContent = item.title;
  priceTwo.textContent = item.price;
  paraTwo.textContent = item.description;
}

