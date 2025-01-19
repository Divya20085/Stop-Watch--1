import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login/Login";
import SignUp from "../src/components/Sign/Sign";
import Stopwatch from "../src/components/Stopwatch"; 
import ContactUs from "../src/components/ContactUs";// Your Stopwatch component
const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true); // Set the user as authenticated
    };

    return (
        <Router>
            <div className="app-container">
                {/* Navigation links */}
                <nav>
                    <Link to="/">Home</Link> | 
                    <Link to="/contact">Contact Us</Link> |
                    {isAuthenticated ? (
                        <Link to="/stopwatch">Stopwatch</Link>
                    ) : (
                        <Link to="/" onClick={() => setIsLogin(true)}>Login</Link>
                    )}
                </nav>

                <Switch>
                    <Route path="/" exact>
                        {isAuthenticated ? (
                            <Redirect to="/stopwatch" />
                        ) : (
                            <>
                                <button onClick={() => setIsLogin(!isLogin)}>
                                    {isLogin ? "Go to Sign Up" : "Go to Login"}
                                </button>
                                {isLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <SignUp />}
                            </>
                        )}
                    </Route>
                    <Route path="/stopwatch">
                        {isAuthenticated ? <Stopwatch /> : <Redirect to="/" />}
                    </Route>
                    <Route path="/contact" component={ContactUs} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
