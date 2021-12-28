import React from 'react';
import './App.css';


const login = (props) => {
    const { email, setemail, password, setpassword, login, signUp, HasAccount, setHasAccount, emailError, passwordError } = props;
    return (
        <div className="logincontainer">
            <div className="center">
                <label>USENAME</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setemail(e.target.value)}></input>
                <p>{emailError}</p>
                <label>PASSWORD</label>
                <input type="password" autoFocus required value={password} onChange={(e) => setpassword(e.target.value)}></input>
                <p>{passwordError}</p>
                <div className="btncontroller">
                    {
                        HasAccount ? <>
                            <button onClick={login}>sign in</button>
                            <p>have an account? <span onClick={() => setHasAccount(!HasAccount)}>sign up</span></p>
                        </> : <>
                            <button onClick={signUp}>sign up</button>
                            <p>have an account? <span onClick={() => setHasAccount(!HasAccount)}>sign in</span></p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default login;
