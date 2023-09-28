# Task Manager & Time Tacker
## Table of Contents
  - [About](#about) 
  - [Installation & Setup](#installation-&-setup)
  - [Function & User Instruction](#function-&-user-instruction)
  - [What does the project look like?](#what-does-the-project-look-like)

## About 
This project is a task managing app with a time tracker integrated. You can use it as a basic todo list or utilize the built-in time tracker to manage your time in a more effcient way.
This project is built using `React` and `MySQL Database`.

## Installation & Setup
Clone down this repository. You will need node and `npm` installed globally on your machine.
Installation:
`npm install`

Make sure you have `MySQL` installed on your machine. Check [this link](https://dev.mysql.com/downloads/installer/) to see a more detailed guide on the installation.

Dump the sql database by enetering `mysql -u root -p < dump.sql` in the terminal. If it requested for a password, enter "password".

To Start Server:
  - Run `npm start` in the `client` folder
  - Run `npm run devStart` in the `server` folder

To Visit App:
`localhost:3000/`

## Function & User Instruction
Functions that you can experiment with in this project:
  - Add a new task by clicking `Create Task`
  - Edit (name & description) or delete a task by clicking `Edit`
  - Click `Start` to start time recording for a task, your total time worked will be recorded at the top of the todo list
  - See previously completed tasks by clicking `Completed Tasks`

## What does the project look like?
<img width="1262" alt="Screenshot 2023-09-27 at 5 54 05 PM" src="https://github.com/erica-ll/task-tracker/assets/91917263/574bb145-af7b-4f30-8eb8-5e0db7714b6b">
