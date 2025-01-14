import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import classes from './SignIn.module.css';
import { auth } from '../../Utility/fireBase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [{ user }, dispatch] = useContext(DataContext);

    const authHandler = async (e) => {
        e.preventDefault();

        if (e.target.name == 'signin') {
            signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
            }).catch((err) => {
                console.log(err)
            })

        } else {
            createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    };

    return (
        <section className={classes.login}>
            <Link><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/180px-Amazon_2024.svg.png' alt="" /></Link>
            <div className={classes.login_container}>
                <h1>Sign In</h1>
                <form action="">

                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" id='email' />

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" id='password' />
                    </div>
                    <button name='signin' type="submit" onClick={authHandler} className={classes.login_signInButton}>Sign In</button>

                </form>
                <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of Use & Sale. Please see our Privacy Notice. Our Cookies Notice and our Interest-Based Ads Notice. </p>
                <button name='signup' type="submit" onClick={authHandler} className={classes.login_registerButton}>Create Your Amazon Account</button>
            </div>
        </section>
    )
}

export default Auth