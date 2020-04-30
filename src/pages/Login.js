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
        <div>
            <div className="sideimage">
                <img src="https://images.unsplash.com/photo-1519053450113-32bed8bbf61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80" alt=""/>

            </div>
            <div>
                <label htmlFor="email"></label>
                <input onChange={handleEmailChange} id="email" type="text"/>
                <label htmlFor="password"></label>
                <input onChange={handlePasswordChange} id="password" type="password"/>
                <button onClick={forgotPassword}>Forgot Password</button>
                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login;
