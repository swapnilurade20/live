import React from 'react';

const Docfragments = (props) => {
    return (
        <div className="fragments">
            <p className="filename">{props.value.fileName}</p>
            <button className="simpleUserButton">{props.value.status}</button>
        </div>
    );
}

export default Docfragments;
