const numberOfRandomUsers = document.querySelector('#number-of-users');
const button = document.querySelector('#button');
const nameOption = document.querySelector('#name-option');
const testnumber = document.querySelector('#testnumber');
const tableBody = document.querySelector('#table-body');
let userData;

function addRow(name, gender, emailAddress, country) {
    let newRow = document.createElement("tr");
    let nameCell = document.createElement("td");
    nameCell.textContent = name;
    let genderCell = document.createElement("td");
    genderCell.textContent = gender;
    let emailAddressCell = document.createElement("td");
    emailAddressCell.textContent = emailAddress;
    let countryCell = document.createElement("td");
    countryCell.textContent = country;

    newRow.appendChild(nameCell);
    newRow.appendChild(genderCell);
    newRow.appendChild(emailAddressCell);
    newRow.appendChild(countryCell);

    tableBody.append(newRow);

    newRow.classList.add("table-bordered")
    
}

const selectedNameOption = (nameOption) => {
    if (nameOption == "first-name") {
        return "first";
    } else {
        return "last";
    }
}

button.addEventListener("click", () => {
    tableBody.innerHTML = '';
    const slashSymbol = "/";
    testnumber.textContent = `${numberOfRandomUsers.value} user${slashSymbol}s generated`;
    const userNumber = numberOfRandomUsers.value;
    const nameOptionValue = nameOption.value;
    console.log(userNumber);
    console.log(nameOption.value);

    try {
    if (userNumber > 1000 || userNumber < 0 || !(/^\d+$/.test(userNumber))) {
        testnumber.textContent = `no user${slashSymbol}s generated`;
        throw new Error("Invalid Input");
    } else {
        fetch(`https://randomuser.me/api/?results=${userNumber}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network Error");
        }
        return response.json();
    }).then(data => {
        userData = data;
        console.log(userData.results);
        return userData;
    }).then(data => {
    for (let i = 0; i < userNumber; i++) {
        let currentUser = data.results[i];
        let selectedName = selectedNameOption(nameOptionValue);
        addRow(currentUser.name[selectedName], currentUser.gender.split("")[0].toUpperCase() + currentUser.gender.split("").slice(1).join(""), currentUser.email, currentUser.location.country);
    }}).catch(error => {
        alert(error);
    })
    } } catch (err) {
        alert(err);
    } 
}); 

nameOption.addEventListener("change", (event) => {
    console.log(userData.results);
    const nameOptionValue = event.target.value;
    const userNumber = numberOfRandomUsers.value;
    tableBody.innerHTML = '';
    for (let i = 0; i < userNumber; i++) {
        let currentUser = userData.results[i];
        let selectedName = selectedNameOption(nameOptionValue);
        addRow(currentUser.name[selectedName], currentUser.gender.split("")[0].toUpperCase() + currentUser.gender.split("").slice(1).join(""), currentUser.email, currentUser.location.country);
}});

numberOfRandomUsers.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        button.click();
    }
});