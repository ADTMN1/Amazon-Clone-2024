import React, { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import classes from './SignIn.module.css';
import { auth } from '../../Utility/fireBase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners'
function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState({
        signin: false,
        signup: false
    });

    const [{ user }, dispatch] = useContext(DataContext);
    const navigate = useNavigate();
    const navStateData = useLocation();
    const authHandler = async (e) => {
        e.preventDefault();

        if (e.target.name == 'signin') {
            setLoading({ ...loading, signin: true })
            signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
                setLoading({ ...loading, signin: false })
                navigate("/");
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err) => {
                setError("please complete the input first !")
                setLoading({ ...loading, signin: false })
            })

        } else {
            setLoading({ ...loading, signup: true })
            createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user
                })
                setLoading({ ...loading, signup: false })
                navigate("/");
                navigate(navStateData?.state?.redirect || "/");
            }).catch((err) => {
                setError("please complete the input first !")
                setLoading({ ...loading, signup: false })
            })
        }
    };

    return (
        <section className={classes.login}>
            <Link to='/'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/180px-Amazon_2024.svg.png' alt="" /></Link>
            <div className={classes.login_container}>
                <h1>Sign In</h1>
                {
                    navStateData?.state?.msg && (
                        <small
                            style={{
                                padding: "5px",
                                textAlign: "center",
                                color: "red",
                                fontWeight: "bold"
                            }}
                        >
                            {navStateData.state.msg}
                        </small>
                    )
                }
                <form action="">

                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={((e) => setEmail(e.target.value))} type="email" id='email' />

                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={((e) => setPassword(e.target.value))} type="password" id='password' />
                    </div>
                    <button name='signin' type="submit" onClick={authHandler} className={classes.login_signInButton}

                    >{
                            loading.signin ? (<ClipLoader color='#000' size={15} />) :
                                (
                                    " Sign In"
                                )
                        }
                    </button>

                </form>
                <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of Use & Sale. Please see our Privacy Notice. Our Cookies Notice and our Interest-Based Ads Notice. </p>
                <button name='signup' type="submit" onClick={authHandler} className={classes.login_registerButton}>
                    {
                        loading.signup ? (<ClipLoader co
                            lor='#000' size={15} />) :
                            (
                                "  Create Your Amazon Account"
                            )
                    }

                </button>
                {
                    error && <small style={{ paddingTop: '5px', color: 'red' }}>{error}</small>
                }
            </div>
        </section >
    )
}

export default Auth