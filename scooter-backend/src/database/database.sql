CREATE TABLE User (
    DNI INT PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255),
    Total_Bonus INT,
    Total_Penalty INT
);

CREATE TABLE Scooter (
    Scooter_ID INT PRIMARY KEY,
    Status ENUM('available', 'rented') DEFAULT 'available'
);

CREATE TABLE Point (
    Point_ID INT PRIMARY KEY,
    Location VARCHAR(255),
    Capacity INT
);

CREATE TABLE Rent (
    Rent_ID INT PRIMARY KEY,
    DNI INT,
    Scooter_ID INT,
    Pickup_Point_ID INT,
    Dropoff_Point_ID INT,
    Start_Date_Time DATETIME,
    End_Date_Time DATETIME,
    Minutes_Duration INT,
    FOREIGN KEY (DNI) REFERENCES User(DNI),
    FOREIGN KEY (Scooter_ID) REFERENCES Scooter(Scooter_ID),
    FOREIGN KEY (Pickup_Point_ID) REFERENCES Point(Point_ID),
    FOREIGN KEY (Dropoff_Point_ID) REFERENCES Point(Point_ID)
);

CREATE TABLE Bonus_Penalty_History (
    History_ID INT PRIMARY KEY,
    DNI INT,
    Type ENUM('bonus', 'penalty'),
    Minutes INT,
    Date DATE,
    FOREIGN KEY (DNI) REFERENCES User(DNI)
);
