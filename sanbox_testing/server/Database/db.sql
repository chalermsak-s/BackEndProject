CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(65) UNIQUE NOT NULL,
    password VARCHAR(45) NOT NULL,
    role ENUM('ADMIN', 'STUDENT', 'ADVISOR') NOT NULL
);

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE admin_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    adminId INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (adminId) REFERENCES admin(id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    initials VARCHAR(255) UNIQUE NOT NULL,
    department_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE degree (
    id INT AUTO_INCREMENT PRIMARY KEY,
    degree_name VARCHAR(45) NOT NULL
);

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    student_id_card VARCHAR(15) UNIQUE NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    picture VARCHAR(45),
    Department_id INT NOT NULL,
    Degree_id INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (Department_id) REFERENCES department(id),
    FOREIGN KEY (Degree_id) REFERENCES degree(id)
);

CREATE TABLE academic_position (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academic_position_name VARCHAR(100) NOT NULL
);

CREATE TABLE advisor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    picture VARCHAR(45),
    Academic_position_id INT NOT NULL,
    Department_id INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (Academic_position_id) REFERENCES academic_position(id),
    FOREIGN KEY (Department_id) REFERENCES department(id)
);

CREATE TABLE status_appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(45) NOT NULL
);

CREATE TABLE appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(70) NOT NULL,
    description VARCHAR(255) NOT NULL,
    requested_date DATETIME NOT NULL,
    appointment_request_date_time DATETIME NOT NULL,
    student_confirmation TINYINT NOT NULL,
    Student_id INT NOT NULL,
    Advisor_id INT NOT NULL,
    Status_appointment_id INT NOT NULL,
    Admin_id INT NOT NULL,
    FOREIGN KEY (Student_id) REFERENCES student(id),
    FOREIGN KEY (Advisor_id) REFERENCES advisor(id),
    FOREIGN KEY (Status_appointment_id) REFERENCES status_appointment(id),
    FOREIGN KEY (Admin_id) REFERENCES admin(id)
);

CREATE TABLE announcement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(70) NOT NULL,
    description VARCHAR(225) NOT NULL,
    file VARCHAR(45),
    posted_date DATETIME NOT NULL,
    Advisor_id INT NOT NULL,
    FOREIGN KEY (Advisor_id) REFERENCES advisor(id)
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedback VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    Student_id INT NOT NULL,
    Advisor_id INT NOT NULL,
    Admin_id INT NOT NULL,
    FOREIGN KEY (Student_id) REFERENCES student(id),
    FOREIGN KEY (Advisor_id) REFERENCES advisor(id),
    FOREIGN KEY (Admin_id) REFERENCES admin(id)
);
