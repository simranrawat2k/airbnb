/*****************Show Modal *********************/

const overlay = document.querySelector(".overlay")
const modal = document.querySelector(".modal");
const loginBtn = document.querySelector(".nav-content .login img");
const nameInput = document.getElementById("nameInput");

loginBtn.addEventListener("click", ()=>{
  overlay.classList.toggle("showOverlay");
  modal.classList.toggle("showModal");
});

function closeModal(){
  overlay.classList.remove("showOverlay");
  modal.classList.remove("showModal");
}

const crossIcon = document.querySelector(".modal .modal-heading div");
const modalSave = document.querySelector(".modal form button");

crossIcon.addEventListener("click", ()=>{
  closeModal();
  const userInput = nameInput.value;
  showletters(userInput);
});

modalSave.addEventListener("click", (e)=>{
  e.preventDefault();
  closeModal();
  const userInput = nameInput.value;
  showletters(userInput);
});

overlay.addEventListener("click", ()=> {
  closeModal();
  const userInput = nameInput.value;
  showletters(userInput);
});

function showletters(userInput){
  var initials = "";
  const wordArray = userInput.split(' ');
  if(wordArray.lenght === 0){
  } else if(wordArray.lenght === 1){
    initials = wordArray[0][0];
  }else{
    initials = wordArray[0][0] + wordArray[1][0];
  }

  displayInitials(initials.toUpperCase());
}

const login = document.querySelector(".nav-content .login");
const divElement = document.createElement("div");
divElement.className = "addInitial";

function displayInitials(initials){
  login.classList.add("hideLogin");

  divElement.textContent = initials; 

  const navContent = document.querySelector(".nav-content");
  navContent.appendChild(divElement);

}

divElement.addEventListener("click", ()=>{
  overlay.classList.toggle("showOverlay");
  modal.classList.toggle("showModal");
  nameInput.value = "";
});


/*******displaying location dropdown*********/

const locationBtn = document.querySelector(".location-btn");
const locationDropdown = document.querySelector(".location-dropdown");

// Add a click event listener to the locationBtn
locationBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event propagation
  locationDropdown.classList.toggle("showLocationDropdown");
});

// Add a click event listener to the document
document.addEventListener("click", (event) => {
  if (!locationDropdown.contains(event.target)) {
    // Click occurred outside of the locationDropdown, so hide it
    locationDropdown.classList.remove("showLocationDropdown");
  }
});

const items = document.querySelector(".search-bar .items");
const imglocationDropdownFlex = document.querySelectorAll(
  ".location-dropdown-flex img"
);
var paragraphText = "";

imglocationDropdownFlex.forEach((img) => {
  img.addEventListener("click", (e) => {
    const paragraph = img.nextElementSibling;
    paragraphText = paragraph.textContent;

    const headingElement = document.querySelector(".items .heading");
    if (headingElement) {
      headingElement.textContent = paragraphText;
    }
  });
});

/*******displaying check-in dropdown*********/

const currentCheckInDate = document.getElementById("check-in");
const daysCheckInTag = document.querySelector(".calender-check-in .check-in-days");

let dateCheckIn = new Date();
let currYearCheckIn = dateCheckIn.getFullYear();
let currMonthCheckIn = dateCheckIn.getMonth();

const monthsCheckIn = ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct", "Nov", "Dec"];

const renderCalenderCheckIn = () => {
  let firstDayofMonthCheckIn = new Date(currYearCheckIn, currMonthCheckIn, 1).getDay();
  let lastDateofMonthCheckIn = new Date(currYearCheckIn, currMonthCheckIn + 1, 0).getDate();
  let liTagCheckIn = "";

  for(let i = firstDayofMonthCheckIn; i>0; i--){
    liTagCheckIn +=`<li></li>`
  }

  for (let i = 1; i <= lastDateofMonthCheckIn; i++) {
    let isTodayCheckIn = "";
  
    if (currYearCheckIn < new Date().getFullYear() ||
        (currYearCheckIn === new Date().getFullYear() && currMonthCheckIn < new Date().getMonth()) ||
        (currYearCheckIn === new Date().getFullYear() && currMonthCheckIn === new Date().getMonth() && i < new Date().getDate())) {
      isTodayCheckIn = "inactiveCheckIn";
    } else if (currYearCheckIn === new Date().getFullYear() && currMonthCheckIn === new Date().getMonth() && i ===  dateCheckIn.getDate()) {
      isTodayCheckIn = "activeCheckIn";
    }
  
    liTagCheckIn += `<li class="${isTodayCheckIn}">${i}</li>`;
  }
  
  currentCheckInDate.innerText = `${monthsCheckIn[currMonthCheckIn]} ${currYearCheckIn}`;
  daysCheckInTag.innerHTML = liTagCheckIn;
}

renderCalenderCheckIn();

// Event listener for previous month button
document.getElementById('check-in-prev').addEventListener('click', () => {
  currMonthCheckIn = currMonthCheckIn - 1;
  if(currMonthCheckIn < 0 ){
    dateCheckIn = new Date(currYearCheckIn, currMonthCheckIn);
    currYearCheckIn = dateCheckIn.getFullYear();
    currMonthCheckIn = dateCheckIn.getMonth();
  }else{
    dateCheckIn = new Date();
  }

  renderCalenderCheckIn();
});

// Event listener for next month button
document.getElementById('check-in-next').addEventListener('click', () => {
  currMonthCheckIn = currMonthCheckIn + 1;
  if(currMonthCheckIn > 11 ){
    dateCheckIn = new Date(currYearCheckIn, currMonthCheckIn);
    currYearCheckIn = dateCheckIn.getFullYear();
    currMonthCheckIn = dateCheckIn.getMonth();
  }else{
    dateCheckIn = new Date();
  }
  renderCalenderCheckIn();
});


/******displaying check-out dropdown*******/

const currentDate = document.getElementById("check-out");
const daysTag = document.querySelector(".calender-check-out .days");
const prevNextIcon = document.querySelector(".calender-btn");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct", "Nov", "Dec"];

const renderCalender = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateofMonth = new Date(currYear, currMonth+1, 0).getDate();
  let liTag = "";

  for(let i = firstDayofMonth; i>0; i--){
    liTag +=`<li></li>`
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = "";
  
    if (currYear < new Date().getFullYear() ||
        (currYear === new Date().getFullYear() && currMonth < new Date().getMonth()) ||
        (currYear === new Date().getFullYear() && currMonth === new Date().getMonth() && i < new Date().getDate())) {
      isToday = "inactive";
    } else if (currYear === new Date().getFullYear() && currMonth === new Date().getMonth() && i ===  date.getDate()) {
      isToday = "active";
    }
  
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}

renderCalender();

// Event listener for previous month button
document.getElementById('prevMonth').addEventListener('click', () => {
  currMonth = currMonth - 1;
  if(currMonth < 0 ){
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  }else{
    date = new Date();
  }

  renderCalender();
});

// Event listener for next month button
document.getElementById('nextMonth').addEventListener('click', () => {
  currMonth = currMonth + 1;
  if(currMonth > 11 ){
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  }else{
    date = new Date();
  }
  renderCalender();
});


/*******displaying guest dropdown*********/

const guestDropdown = document.querySelector(".guest-dropdown");
const guestBtn = document.querySelector(".guest-btn");

// Add a click event listener to the guestBtn
guestBtn.addEventListener("click", (event) => {
  //event.stopPropagation();
  guestDropdown.classList.toggle("showGuestDropdown");
});

// Add a click event listener to the document to handle clicks outside the guestDropdown
document.addEventListener("click", (event) => {
  if (
    !guestDropdown.contains(event.target) &&
    !guestBtn.contains(event.target)
  ) {
    // Click occurred outside of the guestDropdown and the guestBtn, so hide it
    guestDropdown.classList.remove("showGuestDropdown");
  }
});

//counter

var total = 0;
var adults = 0;
var children = 0;
var infant = 0;
var pet = 0;

const GuestHeading = document.querySelector(".guest-btn .heading");

var adultMinusIcons = document.getElementsByClassName("adult-minus")[0];
var adultPlusIcons = document.getElementsByClassName("adult-plus")[0];

var childrenMinusIcons = document.querySelector(".children-minus");
var childrenPlusIcons = document.querySelector(".children-plus");

var infantMinusIcons = document.querySelector(".infant-minus");
var infantPlusIcons = document.querySelector(".infant-plus");

var petMinusIcons = document.querySelector(".pet-minus");
var petPlusIcons = document.querySelector(".pet-plus");

var adultCounter = document.querySelector(".adult-counter");
var childerCounter = document.querySelector(".childer-counter");
var infantCounter = document.querySelector(".infant-counter");
var petCounter = document.querySelector(".pet-counter");

adultPlusIcons.addEventListener("click", () => {
  adults++;
  adultCounter.textContent = adults;
  total++;
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

adultMinusIcons.addEventListener("click", () => {
  if (total >= 1 && adults >= 1) {
    total--;
  }
  if (adults >= 1) {
    adults--;
    adultCounter.textContent = adults;
  }

  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

childrenPlusIcons.addEventListener("click", () => {
  children++;
  childerCounter.textContent = children;
  total++;
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

childrenMinusIcons.addEventListener("click", () => {
  if (total >= 1 && children >= 1) {
    total--;
  }
  if (children >= 1) {
    children--;
    childerCounter.textContent = children;
  }
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

infantPlusIcons.addEventListener("click", () => {
  infant++;
  infantCounter.textContent = infant;
  total++;
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

infantMinusIcons.addEventListener("click", () => {
  if (total >= 1 && infant >= 1) {
    total--;
  }
  if (infant >= 1) {
    infant--;
    infantCounter.textContent = infant;
  }
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

petPlusIcons.addEventListener("click", () => {
  pet++;
  petCounter.textContent = pet;
  total++;
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});

petMinusIcons.addEventListener("click", () => {
  if (total >= 1 && pet >= 1) {
    total--;
  }
  if (pet >= 1) {
    pet--;
    petCounter.textContent = pet;
  }
  if (total === 1) {
    GuestHeading.textContent = total + " Guest";
  } else if (total <= 0) {
    GuestHeading.textContent = "Guests";
  } else {
    GuestHeading.textContent = total + " Guests";
  }
});


/*******displaying check-in dropdown*********/

