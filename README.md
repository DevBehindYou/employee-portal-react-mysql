# Employee Check-In and Task Manager (React + MySQL)
<img width="689" height="105" alt="image" src="https://github.com/user-attachments/assets/644b1f3a-e201-409f-92d9-8bfd1c21c46d" />

The Employee Portal is a web-based application built using React, Node.js, and MySQL. This portal allows employees to log in, check-in for the day (attendance), and manage tasks such as adding, completing, and deleting them. The application also features an auto-checkout at the end of the day for attendance.

---

## Features

- **Login / Sign-Up**: Employees can log in to access their personalized dashboard.
- **Attendance Check-In**: Employees can check-in for the day. They will be auto-checked out at the end of the day.
- **Task Management**: Employees can add, complete, and delete tasks.
- **Auto Logout & Security**: Users are logged out automatically when session data is cleared.
- **Task Status**: Tasks are marked as completed and displayed with completion status.

<img width="713" height="457" alt="image" src="https://github.com/user-attachments/assets/c91d9aaa-08b5-4713-a169-81cb075b287a" />

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Vite](https://vitejs.dev/)

## Setup

### Backend (Node.js + MySQL)

1. Clone the repository & Install dependencies:

```bash
git clone 
cd employee-portal-react-mysql
npm install express mysql2 cors react-router-dom
```

2. Navigate to the server folder & Start the server:
```bash
cd src
cd server
node server.js
```
- open a new terminal

3. Start the React app:
```bash
npm run dev
```
- The frontend will be running on http://localhost:5173.

###Database Schema

```bash
database name: employee

employee_details:
emp_id: INT, Auto Increment, Primary Key
username: VARCHAR
password: VARCHAR

employee_attendance:
emp_id: INT, Foreign Key referencing employee_details
username: VARCHAR
dates: DATE

employee_tasks:
emp_id: INT, Foreign Key referencing employee_details
username: VARCHAR
tasks: TEXT
iscompleted: TINYINT(1) (0: Pending, 1: Completed)
```
<img width="194" height="82" alt="image" src="https://github.com/user-attachments/assets/2dec5845-fd0b-4eb6-b20d-dc9d5555f72e" />
<img width="174" height="113" alt="image" src="https://github.com/user-attachments/assets/d2f94684-4a72-44ae-aeec-a67dd5a2a6c5" />
<img width="190" height="100" alt="image" src="https://github.com/user-attachments/assets/00eb6d66-a08e-4efc-a1c7-c8a4e1b00ae1" />
<img width="182" height="113" alt="image" src="https://github.com/user-attachments/assets/8801f9dd-9901-403d-90dd-1e0eb6b2dfec" />

## Endpoints
### Attendance Endpoints
- POST /attendance: Check-in for the day
- GET /attendance/:username: Check-in status for today
- PATCH /attendance/:id/complete: Mark task as completed

### Tasks Endpoints
- GET /tasks/:username: Fetch tasks for the user
- POST /tasks: Add a new task
- DELETE /tasks/:id: Delete a task

## Technologies Used
- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MySQL
- Others: Tailwind CSS, CORS
