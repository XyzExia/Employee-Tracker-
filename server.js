const mysql = require('mysql2');
const inquirer = require("inquirer");
const table = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Zgmfx20a!',
      database: 'workers_db'
    },
    console.log(`Connected to the workers_db database.`)
  );

  function Start() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(res) {
        console.log("You entered: " + res.option);
  
        switch (result.option) {
          case "Add department":
            //done
            addDepartment();
            break;
          case "Add role":
            //done
            addRole();
            break;
          case "Add employee":
            //done
            addEmployee();
            break;
          case "View departments":
            //done
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }


function addDepartment() {
    inquirer.prompt({   
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }).then(function(res){
      db.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
        if (err) throw err;
        console.table("Successfully Inserted");
        Start();
    })
    })
}

function addEmployee(){
  inquirer.prompt([{
    type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"

  }]).then(function(res){
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
      if (err) throw err;
      console.table("Successfully Inserted");
      Start();
    })
    })
  }
  
 function addRole(){
  inquirer.prompt([
    {
        message: "enter title:",
        type: "input",
        name: "title"
    }, {
        message: "enter salary:",
        type: "number",
        name: "salary"
    }, {
        message: "enter department ID:",
        type: "number",
        name: "department_id"
    }
]).then(function (res) {
    connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, data) {
      if (err) throw err;
      console.table(data);
    })
    Start();
})

}

function viewDepartment(){
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
  })
}


 



Start()