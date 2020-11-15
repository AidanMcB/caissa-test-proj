import React, { useState } from 'react';

export default function SecurityModal(props) {
    //should have edit mode or add mode 
    //check if the prop passed was a single security
    //possible by checking for a name attribute
    // console.log(props.closeEditModal)

    //state to capture form data 
    const [formData, setFormData] = useState({})
    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }
    // Things that depend on Add or Edit 
    // Edit Mode:
    // title: Edit Security: Security-Name
    // Delete Button
    // pre-filled values
    // FUNCTIONS:
    // closeEditModal()
    // editASecurity()
    // Add Mode:
    // title: Add Security
    // No Delete Button
    // No pre-filled values
    // FUNCTIONS:
    // closeAddModal()
    // addASecuirty()
    let display = {}
    let addOrEdit = null;
    let closeModal = null;
    if(props.showEdit === true ){
        console.log(props.children.name)

        // setFormData({
        //     name: `${props.children.name}`,
        //     ISIN: `${props.children.ISIN}`,
        //     counrty: `${props.children.country}`,
        //     prices: [],
        // })
        display = {
            title: `Edit Security: ${props.children.name}`,
            deleteButton: 'unest'
        }

        closeModal = (() => props.closeEditModal())
        addOrEdit = (() => props.editASecurity())
    }else if(props.showAdd === true){
        display = {
            title: 'Add Security',
            deleteButton: 'none',
        }
        console.log("ran")
        setFormData({...formData, name: 'x'})
        closeModal = (() => props.closeAddModal())
        addOrEdit = (() => props.addASecurity())
    }
 
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
    //if edit or add has not been clicked, do not show the modal
    if (props.showEdit === false || props.showAdd === false) {
        return null
    }
    return (
        <div className="security-modal">
            <div className="modal-content">
                <div className="top-security-wrapper">
                    <header>{display.title}</header>
                    <form className="security-form">
                        <div className="name-input">
                            <label htmlFor="name">Name</label>
                            <br />
                            <input type="text" id="name" name="name" value={formData.name}
                                onChange={(e) => setValue("name", e.target.value)}></input>
                        </div>
                        <div className="ISIN-input">
                            <label htmlFor="ISIN">ISIN</label>
                            <br />
                            <input type="text" id="ISIN" name="ISIN" value={formData.ISIN}
                                onChange={(e) => setValue("ISIN", e.target.value)}></input>
                        </div>
                        <div className="country-input">
                            <label htmlFor="country">Country</label>
                            <br />
                            <select name="countries" id="countries" value={formData.country}
                                onChange={(e) => setValue("country", e.target.value)}>
                                <option value=" "></option>
                                {countries.map((country, id) => (
                                    <option key={id} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>

                    </form>

                </div>
                <div className="security-close-div">
                    <p className="delete-security-btn"
                        style={{ display: `${display.deleteButton}` }}
                        onClick={() => console.log("Deleted")}>Delete</p>
                    <p className="cancel-security-btn" onClick={closeModal}>Cancel</p>
                    <p className="save-security-btn"
                        onClick={(e) => addOrEdit(e, formData, props.children.security)}>Save</p>
                </div>
            </div>
        </div>
    )
}