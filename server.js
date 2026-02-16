const express = require("express");
const fileHandler = require("./modules/fileHandler");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Dashboard Route
app.get("/", async (req, res) => {
  const employees = await fileHandler.read();
  // Show Add Employee Form
app.get("/add", (req, res) => {
  res.render("add");
});

// Handle Form Submission
app.post("/add", async (req, res) => {
  const { name, department, basicSalary } = req.body;

  const employees = await fileHandler.read();

  const newEmployee = {
    id: employees.length > 0 ? employees[employees.length - 1].id + 1 : 1,
    name,
    department,
    basicSalary: Number(basicSalary)
  };

  employees.push(newEmployee);

  await fileHandler.write(employees);

  res.redirect("/");
});

  // Calculate Tax and Net Salary
  const updatedEmployees = employees.map(emp => {
    const tax = emp.basicSalary * 0.10;
    const netSalary = emp.basicSalary - tax;

    return {
      ...emp,
      tax,
      netSalary
    };
  });

  res.render("index", { employees: updatedEmployees });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
