class Employee {
  constructor(firstName, lastName, dob, departament, position, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.departament = departament;
    this.position = position;
    this.salary = salary;
  }
}

class UI {
  getListFromLocalStorage() {
    let list;
    if(localStorage.getItem('list') === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem('list'));
    }

    return list;
  }

  displayEmployee() {
    // Instantiate ui
    const ui = new UI();

     const list = ui.getListFromLocalStorage();

     list.forEach(function(employee) {
       
      ui.addEmployeeToList(employee);
     });
  }

  addEmployeeToList(employee) {
    // Create tr element
    const row = document.createElement('tr');
    // Create inner tr content
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.dob}</td>
      <td>${employee.departament}</td>
      <td>${employee.position}</td>
      <td>${employee.salary}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    // Append to list
    document.querySelector('#employee-list').appendChild(row);
  }

  addToLocalStorrage(employee) {
    let list;
    if(localStorage.getItem('list') === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem('list'));
    }

    list.push(employee);

    localStorage.setItem('list', JSON.stringify(list));
  }

  clearFields() {
    document.querySelector('#first-name').value = '';
    document.querySelector('#last-name').value = '';
    document.querySelector('#dob').value = '';
    document.querySelector('#departament').value = '';
    document.querySelector('#position').value = '';
    document.querySelector('#salary').value = '';
  }

  removeEmployeeFromList(target) {
    if(target.className = 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  removeFromLocalStorage(dob) {

    const ui = new UI();

    const list = ui.getListFromLocalStorage();

    list.forEach(function(employee, index) {
      if(employee.dob === dob) {
        list.splice(index, 1);
      }
    });

    localStorage.setItem('list', JSON.stringify(list));
  }
}

// Add event listener for page load
document.addEventListener('DOMContentLoaded', function(e) {
  // Get form values
  const firstName = document.querySelector('#first-name').value,
        lastName = document.querySelector('#last-name').value,
        dob = document.querySelector('#dob').value,
        departament = document.querySelector('#departament').value,
        position = document.querySelector('#position').value,
        salary = document.querySelector('#salary').value;

  // Instantiate employee
  const employee = new Employee(firstName, lastName, dob, departament, position, salary);

  // Instantiate ui
  const ui = new UI();

  ui.displayEmployee(employee);
  
  e.preventDefault();
});

// Add event listener for submit
document.querySelector('#employee-form').addEventListener('submit', function(e) {
  // Get form values
  const firstName = document.querySelector('#first-name').value,
        lastName = document.querySelector('#last-name').value,
        dob = document.querySelector('#dob').value,
        departament = document.querySelector('#departament').value,
        position = document.querySelector('#position').value,
        salary = document.querySelector('#salary').value;

  // Instantiate employee
  const employee = new Employee(firstName, lastName, dob, departament, position, salary);

  // Instantiate ui
  const ui = new UI();

  // Validate form
  if(firstName === '' || lastName === '' || dob === '' || departament === '' || position === '' || salary === '') {
    alert('Please fill in all fields');
  } else {

    // Add employee to list
    ui.addEmployeeToList(employee);

    // Add employee to LS
    ui.addToLocalStorrage(employee);

    // Clear input fields
    ui.clearFields();
  
  }

  e.preventDefault();
});

// Add event listener for delete
document.querySelector('#employee-list').addEventListener('click', function(e) {

  // Instantiate ui
  const ui = new UI();

  // Remove employee from list
  ui.removeEmployeeFromList(e.target);

  // Remove from Local Storage
  ui.removeFromLocalStorage(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

  e.preventDefault();
});