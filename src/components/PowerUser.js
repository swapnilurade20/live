import React from 'react';
import firebase from '../Firebase';

const Poweruser = (props) => {
    const [decline, setdecline] = React.useState(false)
    const [approve, setapprove] = React.useState(false)

    const change_status = (status_) => {
        firebase.firestore().collection("documents").doc(props.value.fileName).update({
            status: status_
        }).then(function () {
        });
    }
    const handledecline = () => {
        change_status("declined")
        setdecline(true)
    }
    const handleapprove = () => {
        change_status("HOLD")
        setapprove(true)
    }
    return (
        <div className="fragments_">
            <p className="filename">{props.value.fileName}</p>
            <p>{props.value.user}</p>
            <div className="buttonAline">
                <button className="simpleUserButton">{props.value.status}</button>
                <button className="simpleUserButton"disabled={decline} onClick={handledecline}>decline</button>
                <button className="simpleUserButton"disabled={approve} onClick={handleapprove}>Approved</button>

            </div>
        </div>

    );
}

export default Poweruser;
