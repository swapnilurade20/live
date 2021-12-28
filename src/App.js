import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import firebase from './Firebase';
import Homepage from './components/HomePage';


const App = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState(" ");
  const [password, setpassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [HasAccount, setHasAccount] = useState("");
  const [user, setuser] = useState(false);
  const [user_email, setUserEmail] = useState("")
  const [userRole, setRole] = useState("")

  const ref = firebase.firestore().collection("name")
  function call() {
    // console.log(firebase)
    ref.onSnapshot((getdata) => {
      getdata.forEach((doc) => {
        console.log(doc.data())
        setname(doc.data().firstName)
      })
    })
  }
  useEffect(() => {
    console.log("here", user)
  }, [user]);

  const fetch_profile = async (email) => {
    let list = []
    const d = await firebase.firestore().collection("Profile").doc(`${email}`).get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data().role)
        setRole(doc.data().role)
      }
      else {
        console.log("no user find ", email)
      }
    })

  }
  const login = () => {
    errorcleaner();
    fetch_profile(email)
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-disable":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
      }
    })
  }
  const signUp = () => {
    errorcleaner();
    setProfile(email)
    fetch_profile(email)
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      switch (error.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(error.message);
          break;
        case "auth/weak-password":
          setPasswordError(error.message);
          break;
      }
    })

  }
  const logout = () => {
    firebase.auth().signOut();
    setuser(false)
  }

  const authListener = () => {
    // console.log(firebase)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetch_profile(user.email)
        setUserEmail(user.email)
        inputcleaner();
        setuser(true)
      }
      else {
        setuser(false);
      }
    })
  }
  useEffect(() => {
    authListener();
  }, []);

  const inputcleaner = () => {
    setemail("");
    setpassword("");

  }
  const errorcleaner = () => {
    setEmailError("");
    setPasswordError("");
  }

  function setProfile(email) {
    firebase.firestore().collection("Profile").doc(email).set({
      user: email,
      role: "simpleUser"
    }).then(function () {
    });
  }
  return (
    <div >
      {
        user ? <>
          <Homepage logout={logout} user_email={user_email} userRole={userRole} />

        </> : <>
          <Login
            email={email}
            setemail={setemail}
            password={password}
            setpassword={setpassword}
            login={login}
            signUp={signUp}
            HasAccount={HasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        </>
      }

      {/* <button onClick={()=>call()}>click me to get data</button>
      <button onClick={()=>setv()}>click me to set data</button> */}

      {name}
    </div>
  );
}

export default App;
