/****************Get data from Local Storage ****************/

const headingElement = document.querySelector(".items .heading");
const selectedDate = document.querySelector(".check-in-btn .items .heading");
const selectedCheckOut = document.querySelector(
  ".check-out-btn .items .heading"
);
const GuestHeading = document.querySelector(".guest-btn .heading");

var adultCounter = document.querySelector(".adult-counter");
var childerCounter = document.querySelector(".childer-counter");
var infantCounter = document.querySelector(".infant-counter");
var petCounter = document.querySelector(".pet-counter");

var total = 0;
var adults = 0;
var children = 0;
var infant = 0;
var pet = 0;

let item = JSON.parse(localStorage.getItem("list")) || [];
document.addEventListener("DOMContentLoaded", () => {
  if (item.length > 0) {
    headingElement.textContent = item[0];
    paragraphText = headingElement.textContent;
    selectedDate.innerText = item[1].join(" ");
    selectedCheckOut.innerText = item[2].join(" ");

    total = item[3][0];
    adults = item[3][1];
    children = item[3][2];
    infant = item[3][3];
    pet = item[3][4];

    adultCounter.textContent = adults;
    childerCounter.textContent = children;
    infantCounter.textContent = infant;
    petCounter.textContent = pet;

    if (total === 1) {
      GuestHeading.textContent = total + " Guest";
    } else {
      GuestHeading.textContent = total + " Guests";
    }
  } else {
  }
});

/***************** Show logIn ********************/

const loginIcon = document.querySelector(".nav-content .login img");
const singInOut = document.querySelector("header .singInOut");
const singout = document.querySelector("header .singInOut .logout");

loginIcon.addEventListener("click", () => {
  singInOut.classList.toggle("visible");
});




/*****************Show Modal *********************/

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const loginBtn = document.querySelector(".singInOut .login");
const nameInput = document.getElementById("nameInput");

loginBtn.addEventListener("click", () => {
  overlay.classList.toggle("showOverlay");
  modal.classList.toggle("showModal");
  singInOut.classList.remove("visible");
  nameInput.value = "";
  
});

function closeModal() {
  overlay.classList.remove("showOverlay");
  modal.classList.remove("showModal");
}

const crossIcon = document.querySelector(".modal .modal-heading div");
const modalSave = document.querySelector(".modal form button");

crossIcon.addEventListener("click", () => {
  closeModal();
  //const userInput = nameInput.value;
 // showletters(userInput);
});

modalSave.addEventListener("click", (e) => {
  e.preventDefault();
  const userInput = nameInput.value;
  if(userInput==""){
    alert("Please add name or click on close sign")
    return;
  }
  showletters(userInput);
  closeModal();
});

overlay.addEventListener("click", () => {
  closeModal();
  //const userInput = nameInput.value;
  //showletters(userInput);
});

function showletters(userInput) {
  var initials = "";
  const wordArray = userInput.split(" ");
  if (wordArray.length === 0) {
  } else if (wordArray.length === 1) {
    initials = wordArray[0][0];
  } else {
    initials = wordArray[0][0] + wordArray[1][0];
  }

  displayInitials(initials.toUpperCase());
}

const login = document.querySelector(".nav-content .login");
const divElement = document.createElement("div");
divElement.className = "addInitial";
const navContent = document.querySelector(".nav-content");

function displayInitials(initials) {
  login.classList.add("hideLogin");
  divElement.textContent = initials; 
  navContent.appendChild(divElement);
}

divElement.addEventListener("click", () => {
  singInOut.classList.add("visible");////////////////////////////////////////////////////////
});

document.addEventListener("click", (event) => {
  if ((!loginIcon.contains(event.target)) && (!divElement.contains(event.target))) {
    singInOut.classList.remove("visible");
  }
});




/*******displaying location dropdown*********/

const locationBtn = document.querySelector(".location-btn");
const locationDropdown = document.querySelector(".location-dropdown");

// Add a click event listener to the locationBtn
locationBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent event propagation
  locationDropdown.classList.toggle("showLocationDropdown");
  checkInDropdown.classList.remove("show-check-in");
  checkOutDropdown.classList.remove("show-check-out");
  guestDropdown.classList.remove("showGuestDropdown");
  singInOut.classList.remove("visible");
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

    //const headingElement = document.querySelector(".items .heading");
    if (headingElement) {
      headingElement.textContent = paragraphText;
    }
  });
});

/*******displaying check-in dropdown*********/

const currentCheckInDate = document.getElementById("check-in");
const daysCheckInTag = document.querySelector(
  ".calender-check-in .check-in-days"
);

let dateCheckIn = new Date();
let currYearCheckIn = dateCheckIn.getFullYear();
let currMonthCheckIn = dateCheckIn.getMonth();

const monthsCheckIn = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const renderCalenderCheckIn = () => {
  let firstDayofMonthCheckIn = new Date(
    currYearCheckIn,
    currMonthCheckIn,
    1
  ).getDay();
  let lastDateofMonthCheckIn = new Date(
    currYearCheckIn,
    currMonthCheckIn + 1,
    0
  ).getDate();
  let liTagCheckIn = "";

  for (let i = firstDayofMonthCheckIn; i > 0; i--) {
    liTagCheckIn += `<li></li>`;
  }

  for (let i = 1; i <= lastDateofMonthCheckIn; i++) {
    let isTodayCheckIn = "";

    if (
      currYearCheckIn < new Date().getFullYear() ||
      (currYearCheckIn === new Date().getFullYear() &&
        currMonthCheckIn < new Date().getMonth()) ||
      (currYearCheckIn === new Date().getFullYear() &&
        currMonthCheckIn === new Date().getMonth() &&
        i < new Date().getDate())
    ) {
      isTodayCheckIn = "inactiveCheckIn";
    } else if (
      currYearCheckIn === new Date().getFullYear() &&
      currMonthCheckIn === new Date().getMonth() &&
      i === dateCheckIn.getDate()
    ) {
      isTodayCheckIn = "activeCheckIn";
    }

    liTagCheckIn += `<li class="${isTodayCheckIn} date-item" data-year="${currYearCheckIn}" data-month="${monthsCheckIn[currMonthCheckIn]}">${i}</li>`;
  }

  currentCheckInDate.innerText = `${monthsCheckIn[currMonthCheckIn]} ${currYearCheckIn}`;
  daysCheckInTag.innerHTML = liTagCheckIn;
};

renderCalenderCheckIn();

/*get date on clicking calender*/

//const selectedDate = document.querySelector(".check-in-btn .items .heading");

const handleDateClick = (event) => {
  const clickedDate = event.target.innerText;
  const clickedYear = event.target.getAttribute("data-year");
  const clickedMonth = event.target.getAttribute("data-month");

  selectedDate.innerText = `${clickedDate} ${clickedMonth} ${clickedYear}`;
};

daysCheckInTag.addEventListener("click", (event) => {
  if (event.target.classList.contains("date-item")) {
    handleDateClick(event);
  }
});

// Event listener for previous month button
document.getElementById("check-in-prev").addEventListener("click", () => {
  currMonthCheckIn = currMonthCheckIn - 1;
  if (currMonthCheckIn < 0) {
    dateCheckIn = new Date(currYearCheckIn, currMonthCheckIn);
    currYearCheckIn = dateCheckIn.getFullYear();
    currMonthCheckIn = dateCheckIn.getMonth();
  } else {
    dateCheckIn = new Date();
  }

  renderCalenderCheckIn();
});

// Event listener for next month button
document.getElementById("check-in-next").addEventListener("click", () => {
  currMonthCheckIn = currMonthCheckIn + 1;
  if (currMonthCheckIn > 11) {
    dateCheckIn = new Date(currYearCheckIn, currMonthCheckIn);
    currYearCheckIn = dateCheckIn.getFullYear();
    currMonthCheckIn = dateCheckIn.getMonth();
  } else {
    dateCheckIn = new Date();
  }
  renderCalenderCheckIn();
});

/*show check-in dropdown*/
const checkInBtn = document.querySelector(".search .check-in-btn");
const checkInDropdown = document.querySelector(".check-in-dropdown");

checkInBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  checkInDropdown.classList.toggle("show-check-in");
  locationDropdown.classList.remove("showLocationDropdown");
  checkOutDropdown.classList.remove("show-check-out");
  guestDropdown.classList.remove("showGuestDropdown");
  singInOut.classList.remove("visible");
});

document.addEventListener("click", (event) => {
  if (!checkInDropdown.contains(event.target)) {
    checkInDropdown.classList.remove("show-check-in");
  }
});

/******displaying check-out dropdown*******/

const currentDate = document.getElementById("check-out");
const daysTag = document.querySelector(".calender-check-out .days");
const prevNextIcon = document.querySelector(".calender-btn");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const renderCalender = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = "";

    if (
      currYear < new Date().getFullYear() ||
      (currYear === new Date().getFullYear() &&
        currMonth < new Date().getMonth()) ||
      (currYear === new Date().getFullYear() &&
        currMonth === new Date().getMonth() &&
        i < new Date().getDate())
    ) {
      isToday = "inactive";
    } else if (
      currYear === new Date().getFullYear() &&
      currMonth === new Date().getMonth() &&
      i === date.getDate()
    ) {
      isToday = "active";
    }

    liTag += `<li class="${isToday} date-item" data-year="${currYear}" data-month="${months[currMonth]}">${i}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalender();

// Event listener for previous month button
document.getElementById("prevMonth").addEventListener("click", () => {
  currMonth = currMonth - 1;
  if (currMonth < 0) {
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }

  renderCalender();
});

// Event listener for next month button
document.getElementById("nextMonth").addEventListener("click", () => {
  currMonth = currMonth + 1;
  if (currMonth > 11) {
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    date = new Date();
  }
  renderCalender();
});

/*get date on clicking calender*/

const checkOutDateClick = (event) => {
  const clickedDate = event.target.innerText;
  const clickedYear = event.target.getAttribute("data-year");
  const clickedMonth = event.target.getAttribute("data-month");

  selectedCheckOut.innerText = `${clickedDate} ${clickedMonth} ${clickedYear}`;
};

daysTag.addEventListener("click", (event) => {
  if (event.target.classList.contains("date-item")) {
    checkOutDateClick(event);
  }
});

/*show check-out dropdown*/
const checkOutBtn = document.querySelector(".search .check-out-btn");
const checkOutDropdown = document.querySelector(".check-out-dropdown");

checkOutBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  checkOutDropdown.classList.toggle("show-check-out");
  locationDropdown.classList.remove("showLocationDropdown");
  checkInDropdown.classList.remove("show-check-in");
  guestDropdown.classList.remove("showGuestDropdown");
  singInOut.classList.remove("visible");
});

document.addEventListener("click", (event) => {
  if (!checkOutDropdown.contains(event.target)) {
    checkOutDropdown.classList.remove("show-check-out");
  }
});

/*******displaying guest dropdown*********/

const guestDropdown = document.querySelector(".guest-dropdown");
const guestBtn = document.querySelector(".guest-btn");

// Add a click event listener to the guestBtn
guestBtn.addEventListener("click", (event) => {
  //event.stopPropagation();
  guestDropdown.classList.toggle("showGuestDropdown");
  singInOut.classList.remove("visible");
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


var adultMinusIcons = document.getElementsByClassName("adult-minus")[0];
var adultPlusIcons = document.getElementsByClassName("adult-plus")[0];

var childrenMinusIcons = document.querySelector(".children-minus");
var childrenPlusIcons = document.querySelector(".children-plus");

var infantMinusIcons = document.querySelector(".infant-minus");
var infantPlusIcons = document.querySelector(".infant-plus");

var petMinusIcons = document.querySelector(".pet-minus");
var petPlusIcons = document.querySelector(".pet-plus");

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

/*i'm flexible */

const flexibleIcon = document.querySelector(".banner .bg-img a");
flexibleIcon.addEventListener("click", {});
/*search icon*/

const searchBtn = document.querySelector(".search .search-btn");

searchBtn.addEventListener("click", () => {
  if (paragraphText === "") {
    alert("Please add the Location");
  } else if (selectedDate.textContent === "Check in") {
    alert("Please add check in date");
  } else if (selectedCheckOut.textContent === "Check out") {
    alert("Please add check out date");
  } else if (total === 0) {
    alert("Please add number of Guests");
  } else {
    //check-in time
    let i = 0;
    let a = selectedDate.textContent;

    let arrCheckIn = a.split(" ");
    let arrMonth;
    let arrDate = parseInt(arrCheckIn[0], 10);
    months.forEach((x) => {
      if (x === arrCheckIn[1]) {
        arrMonth = i;
      } else {
        i++;
      }
    });
    let arrYear = parseInt(arrCheckIn[2], 10);

    let confirmIn = new Date(arrYear, arrMonth, arrDate);
    let verifyIn = confirmIn.getTime();

    //check-out time
    let j = 0;
    let b = selectedCheckOut.textContent;

    let brrCheckIn = b.split(" ");
    let brrMonth;
    let brrDate = parseInt(brrCheckIn[0], 10);
    months.forEach((x) => {
      if (x === brrCheckIn[1]) {
        brrMonth = j;
      } else {
        j++;
      }
    });
    let brrYear = parseInt(brrCheckIn[2], 10);
    let confirmOut = new Date(brrYear, brrMonth, brrDate);
    let verifyOut = confirmOut.getTime();

    /*Confirm dates*/
    let todaysDate = new Date();
    let todaysTime = todaysDate.getTime();
    if (todaysTime > verifyIn || todaysTime > verifyOut) {
      alert("Past Dates not allowed");
      return;
    }
    if (verifyIn > verifyOut) {
      alert("Check-in date must be greater than Check-out date");
      return;
    }

    /*local storage*/
    localStorage.removeItem("list");
    item = [];
    item.push(paragraphText);
    item.push(arrCheckIn);
    item.push(brrCheckIn);
    item.push([total, adults, children, infant, pet]);
    localStorage.setItem("list", JSON.stringify(item));

    const nextPage = document.getElementById("nextPage");

    nextPage.href = "./search/search.html";
  }
});

singout.addEventListener("click", () => {
  localStorage.clear();
  total = 0;
  adults = 0;
  children = 0;
  infant = 0;
  pet = 0;
  GuestHeading.textContent = "Guests";
  headingElement.textContent = "Location";
  paragraphText = "";
  selectedDate.innerText = "Check in";
  selectedCheckOut.innerText = "Check out";
  adultCounter.textContent = 0;
  childerCounter.textContent = 0;
  infantCounter.textContent = 0;
  petCounter.textContent = 0;
  login.classList.remove("hideLogin");
  if(divElement.textContent){
    divElement.textContent = "";
    navContent.removeChild(divElement);
  }
  singInOut.classList.remove("visible");
});
