function submitForm(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  const locationInput = document.getElementById("locationInput").value;
    
  if (!fullName || !email || !phone || !password || !locationInput) {
    alert("All fields are required!");
    return;
  }

  const studentData = {
    fullName: fullName,
    email: email,
    password:password,
    phone: phone,
    dob:dob,
    gender:gender,
    locationInput:locationInput,
  };

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); 
      document.getElementById("registrationForm").reset();
      fetchStudents();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while registering the student.');
    });
}

function fetchStudents() {
  fetch('/students')
    .then((response) => response.json())
    .then((students) => {
      const studentsList = document.getElementById('studentsList');
      studentsList.innerHTML = '';
      students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.registerNumber}</td>
          <td>${student.fullName}</td>
          <td>${student.email}</td>
          <td>${student.password}</td>
          <td>${student.phone}</td>
          <td>${student.dob}</td>
          <td>${student.gender}</td>
          <td>${student.locationInput}</td>
        `;
        studentsList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while fetching students data in scriptjs.');
    });
}

document.getElementById("registrationForm").addEventListener("submit", submitForm);

window.addEventListener('load', fetchStudents);

const allLocations=[
'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh', 'Uttarakhand',
'West Bengal','Delhi','Jammu and Kashmir','Puducherry'];

function filterLocations() {
  const input = document.getElementById("locationInput").value.toLowerCase();
  const locationOptions = document.getElementById("locationOptions");
  locationOptions.innerHTML = ''; 

  const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().startsWith(input)
  );

  filteredLocations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    locationOptions.appendChild(option);
  });
}

function setLocationFromDropdown() {
  const locationInput = document.getElementById("locationInput");
  const selectedOption = document.querySelector("#locationOptions option:checked");
  if (selectedOption) {
    locationInput.value = selectedOption.value;
  }
}

filterLocations();
