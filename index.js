const mySQL = require ("mysql2")
const inquirer = require ("inquirer")
const consoletable = require ("console.table")
const connection = mySQL.createConnection ({
    port: "3306", 
    user: "root",
    password: "R1C2!@#$SQL",
    database: "employee_DB"
})
connection.connect(function(){
  //  if (err) throw err
    console.log("connected")
    startApp ()
})


function startApp() {
    inquirer.prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "View the total utilized budget of a department",
          "Exit"
        ]
      }])
      .then(function (answer) {
        switch (answer.action) {
          case "View all departments":
            viewDepartments();
            break;
          case "View all roles":
            viewRoles();
            break;
          case "View all employees":
            viewEmployees();
            break;
          case "Add a new department":
            addDepartment();
            break;
          case "Add a new role":
            addRole();
            break;
          case "Add a new employee":
            addEmployee();
            break;
         case "Update employee roles":
            updateRole();
            break;
          case "exit":
            connection.end();
            break;
        }
      });
  };

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res){
        if (err) throw err
        console.table(res)
        startApp()
    })
}
function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, res){
      if (err) throw err
      console.table(res)
      startApp()
  })
}
function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, res){
      if (err) throw err
      console.table(res)
      startApp()
  })
}

//addRole()

function addEmployee() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "roleId",
        type: "rawlist",
        choices: results.map(item => item.title),
        message: "Select a role for the employee"
      }
    ]).then(function (answers) {
      const selectedRole = results.find(item => item.title === answers.roleId);
      connection.query("INSERT INTO employees SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: selectedRole.id
        }, function (err, res) {
          if (err) throw err;
          console.log("Added new employee named " + answers.firstName + " " + answers.lastName + "\n");
          startApp();
        })
    })
  })
};
function addRole() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "title",
        type: "list",
        message: "What type of role are you adding?",
        choices: "Manager, Assistant Manager, Team Leader, Engineer, Designer"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
      },
      {
        name: "departmentId",
        type: "input",
        message: "What is the department Id for this role?"
      }
    ]).then(function (answer) {
      const selectedRole = results.find(item => item.title === departmentId);
      connection.query("INSERT INTO roles SET ?",
      {
        title: answers.title,
        salary: answers.salary,
        department_id: departmentId
      }, function (err, res) {
        if (err) throw err;
        console.log("Added new " + answers.title + " " + "role." + "\n");
      })
    })
  })
};