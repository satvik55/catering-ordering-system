# Student-Teacher Booking Appointment System

A web application designed to streamline the process of scheduling appointments between students and teachers. Students can search for teachers, view their availability, and book slots. Teachers can manage their schedules and approve appointments. The project is built with modern HTML, CSS, and JavaScript, and it leverages Firebase for all backend services.

---

## ✨ Key Features

* **Role-Based Authentication:** Secure login and registration for three distinct roles: Student, Teacher, and Admin.
* **Admin Dashboard:** Admins can add new teachers to the system and approve pending student registrations.
* **Teacher Dashboard:** Teachers can set their available time slots and view/approve/reject appointment requests from students.
* **Student Dashboard:** Students can search for teachers by name or subject, view their availability, and book an appointment.

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
* **Backend-as-a-Service:** Firebase (Authentication for user management, Firestore for data storage)
* **Local Development:** Firebase CLI, VS Code Live Server

---

## 📖 Getting Started: How to Run the Project Locally

**Important:** You cannot run this project by opening the `index.html` file directly in your browser. It must be served by a local web server to allow communication with the Firebase backend.

### Method 1: The Easy Way (Using VS Code + Live Server)

This is the simplest method if you use Visual Studio Code.

1.  **Prerequisites:**
    * [Visual Studio Code](https://code.visualstudio.com/) installed.
    * The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed from the VS Code marketplace.
2.  **Clone the Repository** and open the project folder in VS Code.
3.  **Right-click** on the `index.html` file.
4.  Select **"Open with Live Server"**. Your browser will open with the project running.

### Method 2: The Standard Way (Using the Terminal)

This method works for any code editor.

1.  **Prerequisites:**
    * You must have the [Firebase CLI](https://firebase.google.com/docs/cli) installed.
2.  **Clone the Repository** and navigate into the project folder in your terminal.
    ```sh
    git clone [https://github.com/satvik55/student-teacher-booking-app.git](https://github.com/satvik55/student-teacher-booking-app.git)
    cd student-teacher-booking-app
    ```
3.  **Start the Local Server** using the Firebase CLI.
    ```sh
    firebase serve
    ```
4.  **View the Project** by opening your browser to **`http://localhost:5000`**.