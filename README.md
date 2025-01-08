# Expo-Tracey: Expense Tracker

## **Project Description**
Expense Tracker Expo-Tracey is a full-stack application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) with Redux that allows users to manage their finances effectively. The app enables users to track their expenses, incomes, set budgets, and visualize their financial progress over time with dynamic graphs and charts. 

The app includes Google authentication via Firebase, a robust backend for handling user transactions, and MongoDB for storing all user-related data. It also allows users to monitor their available balances and track the history of their financial transactions.

## **Live Demo** 
You can check out the live version of the project here: [Live Demo](https://expo-tracey.vercel.app/)



## **Tech Stack**

- **MongoDB**: NoSQL database to store all the required data.
- **Express.js**: Backend framework to handle routing and API requests.
- **React.js**: Frontend library to create dynamic user interfaces.
- **Node.js**: Server environment to run the backend.
- **Firebase Authentication**: Used for secure user authentication.
- **Chart.js**: Used to render financial charts (transaction history, budget, and balance graphs).
- **Vite**: Fast build tool and development server for the frontend.

## **Features**
- **Google Authentication**: Secure login using Firebase.
- **Real-time Updates**: Monitor transactions and balance history in real time.
- **Expense Management**: Add, manage and track your expenses and income.
- **Transaction Management**: Track income and expenses with predefined categories.
- **Category Tracking**: Categorize your transactions for better insights.
- **Graphical Analysis**: Visualize your spending and saving patterns.
- **Budget Monitoring**: Set and track budgets to achieve your financial goals.
- **Data Download**: Export your transaction data for offline access or backup.
---


## Prerequisites
Ensure the following tools are installed on your machine:
- Node.js (v16 or later)
- npm (Node Package Manager)
- MongoDB Atlas account
- Firebase account

## **Setup Instructions**

Follow these steps to set up the **Expense Tracker Expo-Tracey** project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/kdds598/expo-tracey.git
cd expo-tracey
```

### 2. Set Up Firebase
1. Create a Firebase project.
2. Enable authentication by navigating to **Authentication** in the Firebase console.
3. Go to **Project Settings** > **Service Accounts** > **Generate a New Private Key**. Download the JSON file.
4. Get your app's Firebase config by navigating to **Project Settings** > **General**.

### 3. Configure Environment Variables
#### Root `.env` File
Create a `.env` file in the root directory and populate it as follows:
```env
PORT=your_port_number
DBURL=your_mongodb_connection_string
EMAIL=your_email
PASSWORD=generated_app_password
NODE_ENV=production

// Firebase secret key Variables
type=
project_id=
private_key_id=
private_key=
client_email=
client_id=
auth_uri=
token_uri=
auth_provider_x509_cert_url=
client_x509_cert_url=
universe_domain=
```

#### Client `.env` File
Create a `.env` file in the `client` folder and populate it as follows:
```env
VITE_FB_APIKEY=your_firebase_apikey
VITE_FB_AUTHDOMAIN=your_firebase_authdomain
VITE_FB_PROJECTID=your_firebase_projectid
VITE_FB_STORAGEBUCKET=your_firebase_storagebucket
VITE_FB_MESSAGINGSENDERID=your_firebase_messagingsenderid
VITE_FB_APPID=your_firebase_appid
VITE_FB_MEASUREMENTID=your_firebase_measurementid
VITE_Backend_URL=http://localhost:3000/api
```
Replace `http://localhost:3000/api` with your actual backend URL during deployment.

### 4. Set Up MongoDB
1. Create a MongoDB cluster using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Copy the connection string and paste it into the `DBURL` variable in the root `.env` file.

### 5. Generate an App Password for Nodemailer
1. Generate an app password for your email account.
2. Update the `EMAIL` and `PASSWORD` fields in the root `.env` file.

### 6. Build and Start the Application
From the root directory, run the following commands:
```bash
npm run build
npm start
```

## Deployment
- Replace `VITE_Backend_URL` in the client `.env` file with your deployed backend URL.
- Ensure the `NODE_ENV` is set to `production` in the root `.env` file.

## Contribution
Feel free to fork this repository and submit pull requests for improvements or bug fixes.

---

Thank you for choosing Expo-Tracey. Happy expense tracking!

