import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";


// import Landing from "./pages/Landing";
import AboutUs from "./pages/AboutUs";
// import Cars from "./pages/Cars";
// import CarDetails from "./pages/CarDetails";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import MyBookings from "./pages/MyBookings";

// import Admin from "./pages/Admin";
// import AdminReservations from "./pages/AdminReservations";
// import AdminCarSpecifications from "./pages/AdminCarSpecifications";

// import Support from "./pages/Support";
// import AdminTickets from "./pages/AdminTickets";

// import OAuthSuccess from "./pages/OAuthSuccess";
// import Verification from "./pages/Verification";
// import AdminVerifications from "./pages/AdminVerifications";


import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react";
import {HelmetProvider} from "react-helmet-async";

const myApolloClient = new ApolloClient ({
    link: new HttpLink({ uri: "http://69.62.124.53:1337/graphql" }),
    cache: new InMemoryCache()
})


export default function App() {
  return (
        <ApolloProvider client={myApolloClient} >
            <HelmetProvider>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<AboutUs />} />
                        {/* <Route path="/" element={<Landing />} /> */}
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                        {/* <Route path="/cars" element={<Cars />} />
                        <Route path="/cars/:id" element={<CarDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/oauth-success" element={<OAuthSuccess />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/reservations" element={<AdminReservations />} />
                        <Route path="/admin/tickets" element={<AdminTickets />} />
                        <Route          path="/admin/car-specifications"
                        element={<AdminCarSpecifications />}
                        />
                        <Route path="/admin/verifications" element={<AdminVerifications />} /> */}
                    </Route>
                </Routes>
            </HelmetProvider>
        </ApolloProvider>

  );
}