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