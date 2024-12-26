import React from "react";
import { AuthProvider } from "./context/context"; // Ensure AuthProvider is correctly imported
import AppRouter from "./Router";

const App = () => {
    return (
        <AuthProvider>
            <AppRouter /> {/* Use AppRouter here */}
        </AuthProvider>
    );
};

export default App;
