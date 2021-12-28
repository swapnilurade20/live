import firebase from 'firebase';
import React, { Component, useEffect } from 'react';
import Firebase from '../Firebase';
import Docfragments from './docFragments';
import Poweruser from './PowerUser';
import Superuser from './superUser';

const Homepage = (props) => {
    const [file, setfile] = React.useState(null)
    const [link, setlink] = React.useState("")
    const [fileList, setFileList] = React.useState([])
    const { logout, user_email, userRole } = props
    const [flg, setflg] = React.useState(true)


    const handlefile = (e) => {
        // console.log(e.target.files[0])
        setfile(e.target.files[0])
    }
    // useEffect(async() => {
    //      call()

    // }, []);
    const fetch_data = async () => {
        let list = []
        const d = await firebase.firestore().collection("documents").where("user", "==", `${user_email}`).get()
        d.docs.forEach(item => {
            // console.log(item.data())
            list.push(item.data())
        })
        setFileList(list)
    }
    const fetch_data_all = async () => {
        let list = []
        const d = await firebase.firestore().collection("documents").get()
        d.docs.forEach(item => {
            console.log(item.data())
            list.push(item.data())
        })
        setFileList(list)
    }
    
    // const call = () => {
    //     const ref = firebase.firestore().collection("documents").where("user", "==", `${user_email}`)
    //     let list = []
    //     ref.onSnapshot((getdata) => {
    //         getdata.forEach((doc) => {
    //             // console.log(doc.data().fileName)
    //             list.push(doc.data().fileName)
    //             // console.log(doc.data().fileName)
    //         })

    //     })
    //     console.log("list", list)
    //     // setFileList(list)
    //     // setflg(false)
    // }
    useEffect(() => {
        if (userRole === "simpleUser") {

            fetch_data()
        }
        else if (userRole === "powerUser") {
            fetch_data_all()

        }
        else if (userRole ==="superUser") {
            fetch_data_all()
        }

    }, [userRole]);



    const set_info_about_file = () => {
        firebase.firestore().collection("documents").doc(`${file.name}`).set({
            fileName: `${file.name}`,
            status: "uploaded",
            docDownloadLinkh: `${link}`,
            user: user_email
        }).then(function () {
            console.log("anthing");
        });

    }

    const upload_to_storage = async () => {
        const task = firebase.storage().ref(`${user_email}/${file.name}`).put(file);
        task.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                Firebase.storage().ref(`${user_email}`).child(file.name).getDownloadURL().then(url => {
                    console.log(url)
                    setlink(url)

                })
            }
        )
        set_info_about_file()
        // call()

    }

    useEffect(() => {
        // console.log(file)

    }, [file]);


    return (
        <div >
            <div className="homepageHeader">
                <p className="homepage">Homepage</p>
                <button onClick={() => logout()} className="logoutButton">logout</button>
            </div>
            <div className="total">
                <p className="upload">
                    <button>
                        <input type="file" onChange={(e) => handlefile(e)} onClick={(e) => e.target.value = null} />
                    </button>
                    <button onClick={upload_to_storage}> upload </button>
                </p>
                {
                    fileList.map((value, index) => (
                        <>
                            {
                                userRole == "simpleUser" ? <>
                                    <Docfragments key={index} value={value} />
                                </> : <>
                                    {
                                        userRole == "powerUser" ? <>
                                            <Poweruser key={index} value={value} />
                                        </> : <>
                                            {
                                                userRole == "superUser" ? <>
                                                    <Superuser key={index} value={value} />
                                                </> : <></>
                                            }</>
                                    }</>
                            }
                        </>
                    ))


                }


            </div>


        </div>
    );
}

export default Homepage;
