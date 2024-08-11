# Product Catalog Management System

## Overview

This project is a comprehensive Product Catalog Management System built with React.js. It allows users to manage products and categories, providing features such as creating, updating, and deleting products and categories, as well as visualizing category data through interactive charts.

## Features

- Product management (CRUD operations)
- Category management (CRUD operations)
- Interactive dashboards with charts for category visualization
- Responsive design for various screen sizes
- Form validation for data integrity

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20.0.0 or later)
- npm (v9.6.4 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Ali-y-Suliman/product-catalogUI.git
   ```

2. Navigate to the project directory:
   ```
   cd product-catalogUI
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server:

```
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (note: this is a one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Categories/
│   │   ├── CategoriesDashboard.tsx
│   │   ├── CategoriesList.tsx
│   │   ├── CategoryChart.tsx
│   │   ├── CategoryForm.tsx
│   │   └── CategoryItem.tsx
│   ├── Products/
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductItem.tsx
│   ├── Common/
|   │   ├── CreateModal.tsx
|   │   ├── dropDownList.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Pagination.tsx
│   └── Layout/
│       └── Layout.tsx
├── contexts/
│   └── AlertContext.tsx
├── hooks/
│   ├── useApi.ts
│   └── usePagination.ts
├── services/
│   ├── api.ts
│   ├── categoriesService.ts
│   └── productsService.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.tsx
```

## Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory and add the following:

```
REACT_APP_API_URL= 'http://localhost:5296/api'
```
