function login() {
  fetch("/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      window.location = "index.html";
    } else {
      alert("Invalid Login");
    }
  });
}

function addEmployee() {
  fetch("/employees", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: name.value,
      empId: empId.value,
      department: department.value,
      salary: salary.value
    })
  }).then(() => loadEmployees());
}

function loadEmployees() {
  fetch("/employees")
  .then(res => res.json())
  .then(data => {
    let rows = "";
    data.forEach(emp => {
      rows += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.empId}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>
        <td>
          <button onclick="deleteEmp(${emp.id})">Delete</button>
        </td>
      </tr>`;
    });
    document.getElementById("tableData").innerHTML = rows;
  });
}

function deleteEmp(id){
  fetch("/employees/" + id, {
    method: "DELETE"
  }).then(() => loadEmployees());
}

if(document.getElementById("tableData")){
  loadEmployees();
}
