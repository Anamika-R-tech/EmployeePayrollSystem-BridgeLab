const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ================= HOME =================
app.get("/", (req, res) => {
    const data = fs.readFileSync("employees.json");
    const employees = JSON.parse(data);

    res.render("index", { employees });
});

// ================= ADD =================
app.post("/add", (req, res) => {
    const data = fs.readFileSync("employees.json");
    const employees = JSON.parse(data);

    const newEmployee = {
        id: Date.now(),
        name: req.body.name,
        salary: Number(req.body.salary),
        gender: req.body.gender
    };

    employees.push(newEmployee);

    fs.writeFileSync("employees.json", JSON.stringify(employees, null, 2));
    res.redirect("/");
});

// ================= DELETE =================
app.get("/delete/:id", (req, res) => {
    const data = fs.readFileSync("employees.json");
    let employees = JSON.parse(data);

    employees = employees.filter(emp => emp.id != req.params.id);

    fs.writeFileSync("employees.json", JSON.stringify(employees, null, 2));
    res.redirect("/");
});

// ================= EDIT PAGE =================
app.get("/edit/:id", (req, res) => {
    const data = fs.readFileSync("employees.json");
    const employees = JSON.parse(data);

    const employee = employees.find(emp => emp.id == req.params.id);

    res.render("edit", { employee });
});

// ================= UPDATE =================
app.post("/update/:id", (req, res) => {
    const data = fs.readFileSync("employees.json");
    let employees = JSON.parse(data);

    employees = employees.map(emp => {
        if (emp.id == req.params.id) {
            emp.name = req.body.name;
            emp.salary = Number(req.body.salary);
            emp.gender = req.body.gender;
        }
        return emp;
    });

    fs.writeFileSync("employees.json", JSON.stringify(employees, null, 2));
    res.redirect("/");
});

// ================= SERVER =================
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
