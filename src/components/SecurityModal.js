import React from 'react';

export default function SecurityModal(props) {
    //should have edit mode or add mode 
    console.log(props)

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
                <form className="security-form">
                <label for="name">Name</label>
                    <input type="text" id="name" name="name"></input>
                <label for="ISIN">ISIN</label>
                    <input type="text" id="ISIN" name="ISIN"></input>
                <label for="country">Country</label>
                    <select name="countries" id="countries">
                        {countries.map( country => (
                            <option value="country">{country}</option>
                        ))}
                    </select>
    
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