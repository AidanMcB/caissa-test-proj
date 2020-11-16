import React, { useState } from 'react';

export default function SecurityModal(props) {

    //state to capture form data 
    const [formData, setFormData] = useState({
        name: `${props.children.name}`,
        ISIN: `${props.children.ISIN}`,
        country: `${props.children.country}`,
        prices: []
    })

    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    //Edit then close modal
    // takes event, edited security info, and the original security
    const editAndClose = (e, security, propChildren) => {
        props.editASecurity(e, security, propChildren)
        props.closeEditModal()
    }

    let display = {}
    let addOrEdit = null;
    let closeModal = null;
    if (props.showEdit === true) {
        display = {
            title: `Edit Security: ${props.children.name}`,
            deleteButton: 'unest'
        }
        closeModal = (() => props.closeEditModal())
        addOrEdit = ((e) => editAndClose(e, formData, props.children ))
    } else if (props.showAdd === true) {
        display = {
            title: 'Add Security',
            deleteButton: 'none',
        }
        console.log("ran")
        closeModal = (() => props.closeAddModal())
        addOrEdit = ((e) => props.addASecurity(e, formData))
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
                        onClick={(e) => props.deleteASecurity(e, props.children)}>Delete</p>
                    <p className="cancel-security-btn" onClick={closeModal}>Cancel</p>
                    <p className="save-security-btn"
                        onClick={(e) => addOrEdit(e)}>Save</p>
                </div>
            </div>
        </div>
    )
}