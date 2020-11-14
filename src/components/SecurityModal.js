import React, {useState} from 'react';

export default function SecurityModal(props) {
    //should have edit mode or add mode 
    //check if the prop passed was a single security
    //possible by checking for a name attribute
    console.log(props.children.name)

    const countries = [
        'Sweden',
        'Finland',
        'USA',
        'Germany',
        'Italy',
        'Mexico',
        'China',
        'Japan',
        'Iraq'
    ]

    if (props.show === false) {
        return null
    }
    return (
        <div className="security-modal">
            <div className="modal-content">
                <div className="top-security-wrapper">
                    <header>Edit Security: Example</header>
                    <form className="security-form">
                        <div className="name-input">
                            <label htmlFor="name">Name</label>
                            <br/>
                            <input type="text" id="name" name="name"></input>
                        </div>
                        <div className="ISIN-input">
                            <label htmlFor="ISIN">ISIN</label>
                            <br/>
                            <input type="text" id="ISIN" name="ISIN"></input>
                        </div>
                        <div className="country-input">
                            <label htmlFor="country">Country</label>
                            <br/>
                            <select name="countries" id="countries">
                                {countries.map((country, id) => (
                                    <option key={id} value="country">{country}</option>
                                ))}
                            </select>
                        </div>

                    </form>

                </div>
                <div className="security-close-div">
                    <p className="delete-security-btn" onClick={() => console.log("Deleted")}>Delete</p>
                    <p className="cancel-security-btn" onClick={() => props.closeEditModal()}>Cancel</p>
                    <p className="save-security-btn" onClick={() => props.closeEditModal()}>Save</p>
                </div>
            </div>
        </div>
    )
}