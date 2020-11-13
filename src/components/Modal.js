import React from 'react';

export default function Modal (props) {

    const security = props.children

    if(props.show === false){
        return null
    }
    return(
        <div>
        <p>{security.name}</p>
        <p>{security.ISIN}</p>
        <p>{security.country}</p>
        <button onClick={() => props.onClose()}>Close</button>
        </div>
    )
}