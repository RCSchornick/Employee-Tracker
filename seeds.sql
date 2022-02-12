INSERT INTO departments (name)
VALUES
("Assembly"),
("Benching"),
("Machining"),
("EDM"),
("Engineering");
INSERT INTO roles (title, salary, department_id)
VALUES
("Manager", 80000, 1),
("Assistant Manager", 70000, 2),
("Team Leader", 60000, 3),
("Engineer", 50000, 4),
("Designer", 40000, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Mike", "Bishop", 1, 1),
("Sandra", "Chadwick", 2, null),
("Andrew", "Drake", 3, 3),
("Charlotte", "Elaines", 4, null),
("Zoey", "Maeson", 5, 5);