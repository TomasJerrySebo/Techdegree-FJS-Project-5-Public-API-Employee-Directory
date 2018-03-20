// function to capitalize first letter of the word
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// function to append the person data to the corresponding html elements inside the twitter bootstrap modal
const setEmployeeDetail = (image,fullName, username, email,phone, address,dob) => {

    document.getElementById('employee-foto').src = image;
    document.getElementById('employee-foto').alt = fullName;
    document.getElementById('employee-name').innerHTML = fullName;
    document.getElementById('employee-username').innerHTML = username;
    document.getElementById('employee-email').innerHTML = email;
    document.getElementById('employee-phone').innerHTML = phone;
    document.getElementById('employee-address').innerHTML = address;
    document.getElementById('employee-dob').innerHTML = dob;

}
// fetch JSON data with ES6 Fetch and Promises
fetch('https://randomuser.me/api/?results=12')
    .then(response=>{
        return response.json();
    })
    .then(json=>{
        json.results.forEach(people=>{
        // Get specific data from the server sent json file, also checking if the key values are defined
        let person = {};
        person.firstName = ((typeof(people.name.first) !== undefined)) ? capitalizeFirstLetter(people.name.first) : '';
        person.lastName = ((typeof(people.name.last) !== undefined)) ? capitalizeFirstLetter(people.name.last) : '';
        person.title = ((typeof(people.name.title) !== undefined)) ? capitalizeFirstLetter(people.name.title) : '';
        // escaping single quote for the purpouse of using in other JS append function
        person.username = ((typeof(people.login.username) !== undefined)) ? people.login.username.replace(/'/g, "\\'") : '';
        person.fullName = (person.title+' '+person.firstName+' '+person.lastName).replace(/'/g, "\\'");
        person.dob = ((typeof(people.dob) !== undefined)) ? people.dob.split(" ")[0] : '';
        person.picture = ((typeof(people.picture.large) !== undefined)) ? people.picture.large : '';
        person.email = ((typeof(people.email) !== undefined)) ? people.email : '';
        person.phone = ((typeof(people.phone) !== undefined)) ? people.phone : '';
        person.city = ((typeof(people.location.city) !== undefined)) ? people.location.city : '';
        person.street = ((typeof(people.location.street) !== undefined)) ? people.location.street : '';
        person.state = ((typeof(people.location.state) !== undefined)) ? people.location.state : '';
        person.postcode = ((typeof(people.location.postcode) !== undefined)) ? people.location.postcode : '';
        // escaping single quote for the purpouse of using in other JS append function
        person.fullAddress = (person.street+', '+person.state+', '+person.postcode).replace(/'/g, "\\'");;
        // append the data to the box elements with the forEeac loop, also with the clickEvents and modal triggering
        document.getElementById('employee-list').innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4">
            <div class="container">
            <div class="row employee-box" data-toggle="modal" data-target="#employeeModal" onclick='setEmployeeDetail("${person.picture}","${person.fullName}","${person.username}","${person.email}","${person.phone}","${person.fullAddress}","${person.dob}")'>
            <div class="col-5  p-3"><img src="${person.picture}" alt="${person.fullName}"/></div>
            <div class="col-7 pt-3 pb-3 pl-0 pr-1 m-auto break-word"><p class="mb-0 font-weight-bold">${person.fullName}</p><p class="mb-0">${person.email}</p><p class="mb-0">${person.city}</p></div>
        </div>
        </div>
        </div>`
        });
    })
.catch(error=>{
    console.log(`Error: ${error.message}`);
});
