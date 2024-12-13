// // App.jsx
// import React from "react";
// import AppRouter from "./Router"; // Ensure to import your AppRouter
// import { AuthContext, AuthProvider } from "./context/context";

// const App = () => {
//     return (
//         <div>
//             <AuthProvider>
//             <AppRouter /> {/* Use AppRouter here */}
//             </AuthProvider> 
            
//         </div>
//     );
// };

// export default App;



import React from "react";
import AppRouter from "./Router"; // Import your AppRouter
import { AuthProvider } from "./context/context"; // Ensure the AuthProvider is correctly imported

const App = () => {
    return (
        <AuthProvider>
            <AppRouter /> {/* Use AppRouter here */}
        </AuthProvider>
    );
};

export default App;
