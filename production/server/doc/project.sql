-- ตาราง UserRole (using VARCHAR for MySQL)
CREATE TABLE UserRole (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name ENUM('ADMIN', 'STUDENT', 'ADVISOR') NOT NULL
);

-- ตาราง User
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(65) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    role ENUM('ADMIN', 'STUDENT', 'ADVISOR') NOT NULL,
    admin_id INT,
    student_id INT,
    advisor_id INT,
    FOREIGN KEY (admin_id) REFERENCES Admin(id),
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (advisor_id) REFERENCES Advisor(id)
);

-- ตาราง Admin
CREATE TABLE Admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(65) NOT NULL,
    password VARCHAR(45) NOT NULL
);

-- ตาราง Advisor
CREATE TABLE Advisor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    picture VARCHAR(45),
    username VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    Academic_position_id INT,
    Department_id INT,
    Admin_id INT,
    FOREIGN KEY (Academic_position_id) REFERENCES Academic_position(id),
    FOREIGN KEY (Department_id) REFERENCES Department(id),
    FOREIGN KEY (Admin_id) REFERENCES Admin(id)
);

-- ตาราง Admin_log
CREATE TABLE Admin_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255),
    Student_id INT,
    Advisor_id INT,
    Admin_id INT,
    FOREIGN KEY (Student_id) REFERENCES Student(id),
    FOREIGN KEY (Advisor_id) REFERENCES Advisor(id),
    FOREIGN KEY (Admin_id) REFERENCES Admin(id)
);

-- ตาราง Student
CREATE TABLE Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id_card VARCHAR(15) NOT NULL UNIQUE,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    picture VARCHAR(45),
    username VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(45) NOT NULL,
    Department_id INT,
    Degree_id INT,
    FOREIGN KEY (Department_id) REFERENCES Department(id),
    FOREIGN KEY (Degree_id) REFERENCES Degree(id)
);

-- ตาราง Degree
CREATE TABLE Degree (
    id INT AUTO_INCREMENT PRIMARY KEY,
    degree_name VARCHAR(45) NOT NULL
);

-- ตาราง Department
CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    initials VARCHAR(255),
    department_name VARCHAR(255) NOT NULL
);

-- ตาราง Academic_position
CREATE TABLE Academic_position (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academic_position_name VARCHAR(100) NOT NULL
);

-- ตาราง Announcement
CREATE TABLE Announcement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(70) NOT NULL,
    description VARCHAR(225),
    file VARCHAR(45),
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Advisor_id INT,
    FOREIGN KEY (Advisor_id) REFERENCES Advisor(id)
);

-- ตาราง Appointment
CREATE TABLE Appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(70) NOT NULL,
    description VARCHAR(255),
    requested_date DATETIME NOT NULL,
    appointment_request_date DATETIME NOT NULL,
    student_confirmation TINYINT DEFAULT 0,
    Student_id INT,
    Advisor_id INT,
    Status_appointment_id INT,
    Admin_id INT,
    FOREIGN KEY (Student_id) REFERENCES Student(id),
    FOREIGN KEY (Advisor_id) REFERENCES Advisor(id),
    FOREIGN KEY (Status_appointment_id) REFERENCES Status_appointment(id),
    FOREIGN KEY (Admin_id) REFERENCES Admin(id)
);

-- ตาราง Status_appointment
CREATE TABLE Status_appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(45) NOT NULL
);

-- ตาราง FeedBack
CREATE TABLE FeedBack (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedback VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    Student_id INT,
    Advisor_id INT,
    Responder_id INT,
    Admin_id INT,
    FOREIGN KEY (Student_id) REFERENCES Student(id),
    FOREIGN KEY (Advisor_id) REFERENCES Advisor(id),
    FOREIGN KEY (Responder_id) REFERENCES Responder(id),
    FOREIGN KEY (Admin_id) REFERENCES Admin(id)
);

-- ตาราง Responder
CREATE TABLE Responder (
    id INT AUTO_INCREMENT PRIMARY KEY,
    responder VARCHAR(45) NOT NULL
);
