import React, { useState, useEffect } from 'react';

export default function SecurityModal(props) {

    //state to capture form data 
    const [formData, setFormData] = useState({
        name: `${props.children.name}`,
        ISIN: `${props.children.ISIN}`,
        country: `${props.children.country}`,
        prices: []
    })
    // Depending on Edit or Add, keeps form data current
    useEffect(() => {
        if (props.showEdit) {
            setFormData({
                name: `${props.children.name}`,
                ISIN: `${props.children.ISIN}`,
                country: `${props.children.country}`,
                prices: []
            })
        } else {
            setFormData({
                name: `${props.children.name}`,
                ISIN: `${props.children.ISIN}`,
                country: `${props.children.country}`,
                prices: []
            })
        }
    }, [props])

    const setValue = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    //Edit then close modal
    // takes event, edited security info, and the original security
    const editAndClose = (e, security, propChildren) => {
        props.editASecurity(e, security, propChildren)
        props.closeEditModal()
    }
    const deleteAndClose = (e, propChildren) => {
        props.deleteASecurity(e, propChildren)
        props.closeEditModal()
    }

    //changees display based on clicking Add or Edit
    let display = {}
    let addOrEdit = null;
    let closeModal = null;
    if (props.showEdit === true) {
        display = {
            title: `Edit Security: ${props.children.name}`,
            deleteButton: 'unset'
        }
        closeModal = (() => props.closeEditModal())
        addOrEdit = ((e) => editAndClose(e, formData, props.children))
    } else if (props.showAdd === true) {
        display = {
            title: 'Add Security',
            deleteButton: 'hidden',
        }
        closeModal = (() => props.closeAddModal())
        addOrEdit = ((e) => props.addASecurity(e, formData))
    }

    // hard coded countries, could alternatively be passed down from Securities List
    // or imported directly from json file, API, etc
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
                    <form className="security-form" id="my-form" onSubmit={(e) => addOrEdit(e)}>
                        <div className="name-input">
                            <label htmlFor="name">Name</label>
                            <br />
                            <input required type="text" id="name" name="name" value={formData.name}
                                onChange={(e) => setValue("name", e.target.value)}></input>
                        </div>
                        <div className="ISIN-input">
                            <label htmlFor="ISIN">ISIN</label>
                            <br />
                            <input required type="text" id="ISIN" name="ISIN" value={formData.ISIN}
                                onChange={(e) => setValue("ISIN", e.target.value)}></input>
                        </div>
                        <div className="country-input">
                            <label htmlFor="country">Country</label>
                            <br />
                            <select required name="countries" id="countries" value={formData.country}
                                onChange={(e) => setValue("country", e.target.value)}>
                                <option value=""></option>
                                {countries.map((country, id) => (
                                    <option key={id} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                    </form>

                </div>
                <div className="security-close-div">
                    <button className="delete-security-btn"
                        style={{ visibility: `${display.deleteButton}` }}
                        onClick={(e) => deleteAndClose(e, props.children)}>Delete</button>
                    <button className="cancel-security-btn" onClick={closeModal}>Cancel</button>
                    <button className="save-security-btn" type="submit" form="my-form"
                        >Save</button>
                </div>
            </div>
        </div>
    )
}