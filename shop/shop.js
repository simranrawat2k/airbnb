const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const giveaway = document.querySelector(".date .offer");

const deadline = document.querySelector(".deadline");

const items = document.querySelectorAll(".deadline-format h4");

//let futureDate = new Date(2023, 10, 8, 11, 43, 59 );
let tempDate = new Date();
let tmepYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tmepYear,tempMonth, tempDay + 3, 8, 30, 0 );
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `Offer ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime(); 

function getRemainingTime() {
  const today = new Date().getTime();

  const t = futureTime - today;

  //values in milliseconds
  const oneDay = 24 * 60 * 60 * 1000; 
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  //calculate values

  let days = t / oneDay;
  days = Math.floor(days); 


  let hours = Math.floor((t % oneDay) / oneHour); 

  let minutes = Math.floor((t % oneHour) / oneMinute);

  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  function format(item){
    if(item < 10){
      return item = `0${item}`
    }
    return item; 
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  }); 

  if(t<0){ 
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">SORRY, this offer has expired!</h4>`;
  }
}

let countdown = setInterval(getRemainingTime,1000); 

getRemainingTime();


/**************** gift card *****************/

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

