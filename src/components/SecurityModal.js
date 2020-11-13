import React from 'react';

export default function SecurityModal(props) {

    console.log(props)

    if (props.show === false) {
        return null
    }
    return (
        <div className="security-modal">
            <div className="modal-content">
                <h1>hello</h1>
            </div>
        </div>
    )
}