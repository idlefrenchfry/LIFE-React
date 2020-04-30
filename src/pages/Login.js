import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        console.log("Email:", email)
        console.log("Password:", password)
    }

    const forgotPassword = () => {
        console.log("Forgot password");
    }

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    return(
        <div className="loginPage">
            <div className="sideimage">
                <div>
                    <img src="https://images.unsplash.com/photo-1519053450113-32bed8bbf61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt=""/>
                </div>

            </div>
            <div className="loginForm">
                <div>
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    <label htmlFor="email"></label>
                    <input onChange={handleEmailChange} placeholder="Email" id="email" type="text"/>
                    <label htmlFor="password"></label>
                    <input onChange={handlePasswordChange} placeholder="Password" id="password" type="password"/>
                    <button className="upperButton" onClick={forgotPassword}>Forgot Password</button>
                    <div className="buttonsSet" style={{width: "100%"}}>
                        <button className="loginButton" style={{width: "100%", margin: "0"}} onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
