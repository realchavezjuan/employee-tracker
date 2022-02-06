INSERT INTO department (name)
VALUES
    ('Management'),
    ('Sales'),
    ('Labor')
;

INSERT INTO role (title, salary, department_id)
VALUES
    ('Shop Foreman', 75000, 1),
    ('Lead Salesman', 65000, 1),
    ('Salesman', 45000, 2),
    ('Welder', 55000, 3),
    ('Fitter', 50000, 3),
    ('Painter', 45000, 3),
    ('Cutter', 45000, 3)
;

INSERT INTO employee (first_name, second_name, role_id, manager_id)
VALUES
    ('Carlos', 'Chavez', 1, NULL),
    ('Mari', 'Ferrari', 2, NULL),
    ('Luis', 'Cervantes', 3, 2),
    ('John', 'Chavez', 3, 2),
    ('Juan', 'Castaneda', 4, 1),
    ('Bryan', 'Smith', 5, 1),
    ('Leo', 'Garcia', 6, 1),
    ('Gilbert', 'Garcia', 7, 1)
;    