import React from 'react';

const Folder = (props) => {
    return <div>HI {props.name} <span onClick={props.openModal}><i className="far fa-plus-square"/></span></div>;
}

export default Folder;