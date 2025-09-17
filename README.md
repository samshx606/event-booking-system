

# Event Booking System
## Demo Video

Watch a demo of the project here: [Project Demo Video](https://drive.google.com/drive/folders/1dD4m-J_jpjPmBZXk4UaInbr6mr28M1te?usp=sharing)


An integrated web application for booking and managing events, built with a Java Spring Boot backend and a React (Vite) frontend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User registration, login, and authentication
- Event creation, editing, and deletion (admin)
- Event browsing and booking (users)
- View and manage bookings
- Admin dashboard for event and user management
- Responsive UI with modern design

## Tech Stack
- **Frontend:** React, Vite, Axios, CSS Modules
- **Backend:** Java, Spring Boot, Maven
- **Database:** (Configure in backend, e.g., H2, MySQL, PostgreSQL)

## Project Structure

```
event-booking-system/
├── backend/
│   └── booking-system/    # Spring Boot backend
│       ├── src/
│       ├── pom.xml
│       └── ...
└── frontend/
	 └── booking-system/    # React frontend
		  ├── src/
		  ├── public/
		  ├── package.json
		  └── ...
```

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
	```sh
	cd backend/booking-system
	```
2. Configure environment variables in `env.properties` or `src/main/resources/application.properties` as needed (e.g., database connection).
3. Build and run the Spring Boot application:
	```sh
	./mvnw spring-boot:run
	```
	Or on Windows:
	```sh
	mvnw.cmd spring-boot:run
	```
4. The backend server will start on [http://localhost:8080](http://localhost:8080) by default.

### Frontend Setup
1. Navigate to the frontend directory:
	```sh
	cd frontend/booking-system
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the development server:
	```sh
	npm run dev
	```
4. The frontend will be available at [http://localhost:5173](http://localhost:5173) by default.

+## API Endpoints (Backend)

### Event Endpoints (`/api/events`)
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/api/events`    | Get all events (paginated) |
| GET    | `/api/events/{id}` | Get event by ID           |
| POST   | `/api/events`    | Create new event (admin)   |
| PUT    | `/api/events/{id}` | Update event (admin)      |
| DELETE | `/api/events/{id}` | Delete event (admin)      |

### User Endpoints (`/api/users`)
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/api/users/me`  | Get current user profile   |
| DELETE | `/api/users/me`  | Delete current user        |
| GET    | `/api/users`     | Get all users (admin)      |
| DELETE | `/api/users/{id}` | Delete user by ID (admin) |

### Booking Endpoints (`/api/bookings`)
| Method | Endpoint                | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/api/bookings/user/{id}` | Get bookings for user (paginated) |
| POST   | `/api/bookings`         | Create a new booking             |

### Auth Endpoints (`/api/auth`)
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login and receive token  |
| POST   | `/api/auth/logout`   | Logout user              |

### Admin Endpoints (`/api/admin`)
| Method | Endpoint                        | Description                |
|--------|----------------------------------|----------------------------|
| PUT    | `/api/admin/users/{id}/promote`  | Promote user to admin      |

## Usage
- Register as a user or log in as an admin.
- Browse available events, book tickets, and view your bookings.
- Admins can create, edit, or delete events and manage users.

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.
