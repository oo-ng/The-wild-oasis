import React from "react";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import GlobalStyles from "./styles/GlobalStyles";
import { AppLayout } from "./ui/AppLayout";
import { Toaster } from 'react-hot-toast';
import { Error } from "./pages/Error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Booking } from "./features/bookings/Booking";
import { Checkin } from "./pages/Checkin";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/darkModeContext";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60*1000,
    }
  }
})
 const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: 
        <ProtectedRoute>
          <AppLayout/>
        </ProtectedRoute>
        ,
      errorElement: <Error/>,
      children:[
        {
          path: "/",
          element: <Dashboard/>,
        },
        {
          path: "bookings",
          element: <Bookings/>,
        },
        {
          path: "bookings/:bookingId",
          element: <Booking/>,
        },
        {
          path: "checkin/:bookingId",
          element: <Checkin/>,
        },
        {
          path: "cabins",
          element: <Cabins/>,
        },
        {
          path: "users",
          element: <Users/>,
        },
        {
          path: "settings",
          element: <Settings/>,
        },
        {
          path: "account",
          element: <Account/>,
        },
        {
          path: "*",
          element: <PageNotFound/>,
        }
      ]
    },
    {
      path: "login",
      element: <Login/>,
    }
  ])
  return(
    <DarkModeProvider>

    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools/>
        <GlobalStyles/>
        <RouterProvider router={router}/>
        <Toaster 
        position="top-center"
        gutter={12}
        containerStyle={{margin:"8px"}}
        toastOptions={{
          success:{
            duration: 3000
          }, 
          error: {
            duration:5000
          },
          style:{
            fontSize: "16px",
            maxWidth: "500px",
            padding:"16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)"
          }
        }}/>
    </QueryClientProvider>
    </DarkModeProvider>
  
  )
}
export default App;