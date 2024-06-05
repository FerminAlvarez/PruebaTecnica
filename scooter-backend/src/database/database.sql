-- Drop existing tables
DROP TABLE IF EXISTS Rent;
DROP TABLE IF EXISTS Bonus_Penalty_History;
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS Scooter;
DROP TABLE IF EXISTS Point;

-- Create User table
CREATE TABLE "User" (
    DNI SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Surname VARCHAR(255),
    Total_Bonus INT,
    Total_Penalty INT
);

-- Create Point table
CREATE TABLE Point (
    Point_ID SERIAL PRIMARY KEY,
    Location VARCHAR(255),
    Capacity INT
);

-- Create Scooter table
CREATE TABLE Scooter (
    Scooter_ID VARCHAR(128) PRIMARY KEY,
    Status VARCHAR(10) DEFAULT 'available' CHECK (Status IN ('available', 'rented')),
    Point_ID INT REFERENCES Point(Point_ID)
);

-- Create Rent table
CREATE TABLE Rent (
    Rent_ID SERIAL PRIMARY KEY,
    DNI INT REFERENCES "User"(DNI),
    Scooter_ID VARCHAR(128) REFERENCES Scooter(Scooter_ID),
    Pickup_Point_ID INT REFERENCES Point(Point_ID),
    Dropoff_Point_ID INT REFERENCES Point(Point_ID),
    Start_Date_Time TIMESTAMP,
    End_Date_Time TIMESTAMP,
    Minutes_Duration INT
);

-- Create Bonus_Penalty_History table
CREATE TABLE Bonus_Penalty_History (
    History_ID SERIAL PRIMARY KEY,
    DNI INT REFERENCES "User"(DNI),
    Type VARCHAR(10) CHECK (Type IN ('bonus', 'penalty')),
    Minutes INT,
    Date DATE
);

-- Create trigger function
CREATE OR REPLACE FUNCTION update_point_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Status = 'rented' THEN
        NEW.Point_ID := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_point_id
BEFORE UPDATE ON Scooter
FOR EACH ROW
EXECUTE FUNCTION update_point_id();
