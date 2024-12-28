import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
  
///////////////////////////////////////////////////////////////////
import AccountDash from "./Component/AccountDash";
// import TransactionList from "./Component/AccountTxn";
import Accountstxn from "./Component/AccountTxn2";
import BudgetDash from "./Component/BudgetDash.jsx";
import HeroSection from "./Component/Hero.jsx";
import Fcard from "./Component/FeatureCards.jsx";
import FeatureSection from "./Component/FeaturesSection.jsx";
import HowItWorks from "./Component/HowitWorks.jsx";
import Footer from "./Component/Footer.jsx";
import Navbar from "./Component/Navbar.jsx";
import Signup from "./Component/Signup.jsx";
import Accounts from "./Component/Accounts.jsx";
import Budgets from "./Component/Budget.jsx";
import Budgettxn from "./Component/BudgetTxn.jsx";
import About from "./Component/About.jsx";
import UserProfile from "./Component/UserProfile";
import { expoStore } from "../Store/Store.js";
import { Provider } from "react-redux";
import { AuthProvider } from "./Context/Context.jsx";
import ProtectedRoute from "./Component/ProtectedRoute.jsx";
import { HelmetProvider } from "react-helmet-async";

//testing components
// import CreateAccountForm from "./API_TESTING_COMPONENTS/CreateAcc.jsx";
// import DeleteAccount from "./API_TESTING_COMPONENTS/DeleteAcc.jsx";
// import CreateBudget from "./API_TESTING_COMPONENTS/CreateBudget.jsx";
// import DeleteBudget from "./API_TESTING_COMPONENTS/DeleteBudget.jsx";
// import TransactionComponent from "./API_TESTING_COMPONENTS/Acctxncrdl.jsx";
// import {CreateBudgetTransactionComponent,DeleteBudgetTransactionComponent} from "./API_TESTING_COMPONENTS/Budgettxncrdl.jsx";
// import AccountsSearch from "./API_TESTING_COMPONENTS/getAccounts.jsx";
// import BudgetsList from "./API_TESTING_COMPONENTS/getBudgets.jsx";
// import BudgetDetails from "./API_TESTING_COMPONENTS/getbbyid.jsx";
// import AccountDetails from "./API_TESTING_COMPONENTS/getabyid.jsx";
// import BudgetTransactions from "./API_TESTING_COMPONENTS/btxn.jsx";
// import AccountTransactions from "./API_TESTING_COMPONENTS/atxn.jsx";
// import BudgetTransactionDetails from "./API_TESTING_COMPONENTS/btxnbyid.jsx";
// import AccountTransactionDetails from "./API_TESTING_COMPONENTS/atxnbyid.jsx";
// import TransactionsPage from "./Component/demo.jsx";
import { Slide, ToastContainer } from "react-toastify";
import App from "./App.jsx";
import Home from "./Component/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />

        <ToastContainer theme="colored" draggable={true} transition={Slide} />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Home></Home>
          </>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/accounts",
        element:<> <ProtectedRoute element={<Accounts />  } /> <Footer/> </>, // Protect this route
      },
      {
        path: "/budgets",
        element: <> <ProtectedRoute element={<Budgets /> }/> <Footer/> </>, // Protect this route
      },
      {
        path: "/accounts/Acc-txns/:accountId",
        element:<> <ProtectedRoute element={<Accountstxn /> } /> <Footer/> </> // Protect this route
      },
      {
        path: "/budgets/Budget-txns/:budgetId",
        element:<> <ProtectedRoute element={<Budgettxn /> } /> <Footer/> </>, // Protect this route
      },
      {
        path: "/accounts/dash/:accountId",
        element:<><ProtectedRoute element={<AccountDash />} /> <Footer/> </>, // Protect this route
      },
      {
        path: "/budgets/dash/:budgetId",
        element:<> <ProtectedRoute element={<BudgetDash />} /> <Footer/> </>, // Protect this route
      },
      {
        path: "/about",
        element:<> <About /><Footer /> </>,
      },
      {
        path: "/userProfile",
        element: (
          <>
    

            <ProtectedRoute element={<UserProfile />} />
            <Footer />
          </>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
  <Provider store={expoStore}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>

      {/* testing */}
      {/* <CreateAccountForm></CreateAccountForm>
  <DeleteAccount></DeleteAccount>
  <CreateBudget></CreateBudget>
  <DeleteBudget></DeleteBudget>
  <TransactionComponent></TransactionComponent>
  <CreateBudgetTransactionComponent></CreateBudgetTransactionComponent>
  <DeleteBudgetTransactionComponent></DeleteBudgetTransactionComponent>
  <AccountsSearch></AccountsSearch>
  <BudgetsList></BudgetsList>
  <BudgetDetails></BudgetDetails>
  <AccountDetails></AccountDetails>
  <BudgetTransactions></BudgetTransactions>
  <AccountTransactions></AccountTransactions>
  <BudgetTransactionDetails></BudgetTransactionDetails>
  <AccountTransactionDetails></AccountTransactionDetails> */}
      {/* testing */}
    </AuthProvider>
  </Provider>
  </HelmetProvider>
);
