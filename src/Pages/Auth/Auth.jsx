import React from 'react'
import { Link } from 'react-router-dom'
import classes from './SignIn.module.css';
function Auth() {
    return (
        <section className={classes.login}>
            <Link><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/180px-Amazon_2024.svg.png' alt="" /></Link>
            <div className={classes.login_container}>
                <h1>Sign In</h1>
                <form action="">

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' />

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' />
                    </div>
                    <button className={classes.login_signInButton}>Sign In</button>

                </form>
                <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of Use & Sale. Please see our Privacy Notice. Our Cookies Notice and our Interest-Based Ads Notice. </p>
                <button className={classes.login_registerButton}>Create Your Amazon Account</button>
            </div>
        </section>
    )
}

export default Auth