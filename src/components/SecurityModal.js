import React, {useState} from 'react';

export default function SecurityModal(props) {
    //should have edit mode or add mode 
    //check if the prop passed was a single security
    //possible by checking for a name attribute
    // console.log(props.closeEditModal)

    //state to capture form data 
    const [formData, setFormData] = useState({
        name: '',
        ISIN: '',
        counrty: '',
        prices: []
    })
    const setValue = (key, value) => {
        setFormData({...formData, [key]: value})
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
    // console.log(formData)
    //if edit or add has not been clicked, do not show the modal
    if (props.showEdit === false || props.showAdd == false) {
        return null
    }
    return (
        <div className="security-modal">
            <div className="modal-content">
                <div className="top-security-wrapper">
                    <header>Edit Security: Example</header>
                    <form className="security-form"
                    onSubmit={(e) => props.addASecurity(e, formData)}>
                        <div className="name-input">
                            <label htmlFor="name">Name</label>
                            <br/>
                            <input type="text" id="name" name="name"
                            onChange={(e) => setValue("name", e.target.value)}></input>
                        </div>
                        <div className="ISIN-input">
                            <label htmlFor="ISIN">ISIN</label>
                            <br/>
                            <input type="text" id="ISIN" name="ISIN"
                            onChange={(e) => setValue("ISIN", e.target.value)}></input>
                        </div>
                        <div className="country-input">
                            <label htmlFor="country">Country</label>
                            <br/>
                            <select name="countries" id="countries"
                            onChange={(e) => setValue("country", e.target.value)}>
                                <option value=" "></option>
                                {countries.map((country, id) => (
                                    <option key={id} value={country}>{country}</option>
                                ))}
                            </select>
                            <button type="submit">Submit</button>
                        </div>

                    </form>

                </div>
                <div className="security-close-div">
                    <p className="delete-security-btn" onClick={() => console.log("Deleted")}>Delete</p>
                    <p className="cancel-security-btn" onClick={() => props.closeEditModal()}>Cancel</p>
                    <p className="save-security-btn" >Save</p>
                </div>
            </div>
        </div>
    )
}