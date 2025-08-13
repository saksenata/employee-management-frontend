# Employee Management System - Frontend

This is the frontend application for the Employee Management System, built with React.js, Bootstrap, and SCSS.

## Features

-   Display list of employees with search, filter, and pagination.
-   Add new employees with form validation.
-   Edit existing employees with form validation.
-   Upload employee photos.
-   Responsive design.
-   Clean architecture (Components, Pages, Services).

## Prerequisites

-   Node.js (v14 or later recommended)
-   npm or yarn

## Setup

1.  **Clone the repository (or ensure you are in the `employee-management-frontend` directory).**

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the `employee-management-frontend` directory. This file is used to configure the backend API URL.

    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    ```
    -   `REACT_APP_API_BASE_URL`: The base URL of your running backend API. If your backend is running on a different port or domain, update this value accordingly. The default assumes the backend is running on `http://localhost:5000` and API routes are prefixed with `/api`.

## Running the Application

1.  **Start the development server:**
    ```bash
    npm start
    ```
    This command starts the React development server. The application will typically open automatically in your default web browser at `http://localhost:3000`. If it doesn't, you can navigate to this URL manually. The server watches for file changes and reloads the application automatically.

2.  **Build for production:**
    ```bash
    npm run build
    ```
    This command creates an optimized production build of your application in the `build/` directory. These static files can then be deployed to any static file hosting service.

## Project Structure

```
employee-management-frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── ...                 # Other static assets
├── src/
│   ├── App.js              # Main application component with routing
│   ├── App.scss            # Global and layout styles
│   ├── index.js            # Entry point of the React application
│   ├── index.scss          # Additional global styles (often imports App.scss)
│   ├── components/
│   │   ├── EmployeeForm/
│   │   │   ├── EmployeeForm.js
│   │   │   └── EmployeeForm.scss
│   │   ├── EmployeeList/
│   │   │   ├── EmployeeList.js
│   │   │   └── EmployeeList.scss
│   │   └── Layout/
│   │       ├── Header.js
│   │       ├── Sidebar.js
│   │       ├── Layout.js
│   │       └── index.js      # Exports Layout component
│   ├── pages/
│   │   ├── AddEmployee/
│   │   │   ├── AddEmployee.js
│   │   │   └── AddEmployee.scss
│   │   ├── EditEmployee/
│   │   │   ├── EditEmployee.js
│   │   │   └── EditEmployee.scss
│   │   └── Home/
│   │       ├── Home.js
│   │       └── Home.scss
│   ├── services/
│   │   ├── api.js            # Centralized Axios client configuration
│   │   └── employeeService.js # Functions for employee API calls
│   └── utils/
│       └── validationSchemas.js # Yup validation schemas for forms
├── .env                    # Environment variables (create this file)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Key Libraries Used

-   **React.js**: For building the user interface.
-   **React Router**: For handling client-side routing.
-   **Axios**: For making HTTP requests to the backend API.
-   **Bootstrap & React-Bootstrap**: For UI components and styling.
-   **Sass**: For advanced CSS styling.
-   **Formik**: For building and managing forms.
-   **Yup**: For form validation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of a sudden done, `eject` provides a lot more flexibility in customizing the build process, but it also means you have to maintain these configurations yourself.
