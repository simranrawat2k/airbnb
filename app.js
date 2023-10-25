/*window.addEventListener("DOMContentLoaded", (event) => {
    // Your code goes here
});*/

//search bar

/*const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
///// api.example has to be replaced with rapid api
    fetch(`https://api.example.com/listings?search=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            // Your code to display the listings goes here
        })
        .catch(error => console.error('Error:', error));
});*/

//listing
/*function createListingCard(listing) {
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    listingCard.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <div class="listing-info">
            <h2>${listing.title}</h2>
            <p>${listing.propertyType} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</p>
            <p>${listing.price} per night</p>
            <p>${listing.location}</p>
            <p>Amenities: ${listing.amenities.join(", ")}</p>
        </div>
    `;

    return listingCard;
}

// Inside the fetch function in the search button event listener
.then(data => {
    const listingsContainer = document.getElementById("listings-container");

    // Clear previous listings
    listingsContainer.innerHTML = "";

    // Append new listings
    data.listings.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsContainer.appendChild(listingCard);
    });
})*/