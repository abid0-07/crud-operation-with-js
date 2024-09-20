create database mydb;

create table users{
    id int primary key auto_increment,
    name varchar(255),
    gender varchar(255),
    age int,
    district varchar(255)
}

insert into users(name,gender,age,district)
values('Abid','Male',26,'Khulna')
values('Asif', 'Male', 21, 'Khulna')
values('Shamim', 'Male', 16, 'Dhaka')
values('Farha', 'Female', 20, 'Barishal')
values('Cristina', 'Female',16, 'New York')