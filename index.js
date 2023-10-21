// https://openapi.programming-hero.com/api/phones?search=${searchText}
// https://openapi.programming-hero.com/api/phone/${id}
const loadPhones = async (searchText, cardLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, cardLimit);
};

const displayPhones = (phones, cardLimit) => {
  const phonesCountainer = document.getElementById("phone-container");
  phonesCountainer.innerHTML = "";

  // display 10 phones btn-showall
  const showAll = document.getElementById("btn-showall");
  if (cardLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // display no phone found
  const noPhone = document.getElementById("no-found-msg");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  // display all phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
      <div class="card h-100 p-5 ">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">
                Model : ${phone.slug}
              </p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>

            </div>
          </div>`;
    phonesCountainer.appendChild(phoneDiv);
  });

  toggleLoader(false);
  console.log(phones);
};

const processSearch = (cardLimit) => {
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, cardLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});
//  enter event
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
    // console.log(e);
  });

const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
document.getElementById("show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};
const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <div class="d-flex align-item-center"><img src="${
      phone.image
    }" alt="" class="mx-auto my-3">;</div>
        <p>Model : ${phone.slug}</p>
              <p>Release Date : ${
                phone.releaseDate
                  ? phone.releaseDate
                  : "No release date available"
              }</p>
              <hr>
              <h4 class="fw-semibold">MainFeatures</h4>
              <p> <strong>Storage : </strong>${
                phone.mainFeatures.storage
                  ? phone.mainFeatures.storage
                  : "No Storage info Found"
              }</p>
              <p><strong>Display Size : </strong> ${
                phone.mainFeatures.displaySize
                  ? phone.mainFeatures.displaySize
                  : "No displaySize info Found"
              }</p>
              <p><strong>Chip Set : </strong> ${
                phone.mainFeatures.chipSet
                  ? phone.mainFeatures.chipSet
                  : "No chipSet info Found"
              }</p>
              <p><strong>Memory : </strong> ${
                phone.mainFeatures.memory
                  ? phone.mainFeatures.memory
                  : "No memory info Found"
              }</p>
  `;
  console.log(phone);
};
// loadPhones("oppo");
