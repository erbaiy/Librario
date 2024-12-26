import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import VerifyOtp from './pages/Auth/Verify-otp';
import ForgetPassword from "./pages/Auth/Forget-password";
import ResetPassword from "./pages/Auth/Reset-password";
import Home from './pages/home/Home';
import NewPassword from './pages/Auth/NewPassword';
import Layout from "./pages/Dashboard/admin/layou";
import { BookTable } from "./pages/Dashboard/admin/components/BookTable";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
            <Route path="/home" element={<Home />} />

            <Route
                    path="/admin/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="" element={<BookTable />} />
                                
                            </Routes>
                        </Layout>
                    }
                />


           
        </Routes>
    );
};

export default AppRouter;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './pages/Dashboard/admin/components/book-sidebar'; // Adjusted path for Sidebar
// import AdminDashboard from './pages/Dashboard/admin/page'; // Ensure this matches actual export
// import Register from './pages/Auth/Register';
// import Login from './pages/Auth/Login';
// import VerifyOtp from './pages/Auth/Verify-otp';
// import ForgetPassword from './pages/Auth/Forget-password';
// import ResetPassword from './pages/Auth/Reset-password';
// import NewPassword from './pages/Auth/NewPassword';
// import Home from './pages/home/Home';

// const Layout = ({ children }) => {
//     return (
//         <div className="flex h-screen">
//             <Sidebar />
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</div>
//         </div>
//     );
// };

// const AppRouter = () => {
//     return (
//         <Router>
//             <Routes>
//                 {/* Public Routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/verify-otp" element={<VerifyOtp />} />
//                 <Route path="/forget-password" element={<ForgetPassword />} />
//                 <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
//                 <Route path="/new-password" element={<NewPassword />} />
//                 <Route path="/home" element={<Home />} />

//                 {/* Protected Routes */}
//                 <Route
//                     path="/admin/*"
//                     element={
//                         <Layout>
//                             <Routes>
//                                 <Route path="" element={<AdminDashboard />} />
//                                 {/* Add nested routes as needed */}
//                             </Routes>
//                         </Layout>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// };

// export default AppRouter;
