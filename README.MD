Technologies Used :-
    Backend: Node.js, Express.js
    Authentication: JWT (JSON Web Tokens)
    Database: MongoDB
    Password Encryption: bcrypt.js

Features :-
    User Registration: Users can register by providing email and password. During registration, roles can be assigned.
    User Login: Users can log in with an email and password, receiving a JWT for authenticated requests.
    User Logout: Users can log out after their work.
    Role-Based Access Control (RBAC): Different user roles (e.g., Admin, User anf Guest) restrict access to specific parts of the application.
    Protected Routes: Routes are protected based on user roles, ensuring that only authorized users can access certain resources.
    JWT Authentication: Secure token-based authentication using JWT to protect API endpoints.

API Endpoints :-
    Authentication Endpoints:
        POST /api/auth/register: Register a new user
        POST /api/auth/login: Log in with email and password
        POST /api/auth/logout: Logout by resetting token

    Role-Based Access Control:
        /user: This Route is for users (User and Admin both can access)
        /admin: This Route is for Admin (Only Admin can Access)
        /guest: Any user can access without authentication