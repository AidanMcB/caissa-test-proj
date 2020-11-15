import React, { useState } from 'react';
import Security from './Security'
import SecurityModal from './SecurityModal'
import Securities from '../securities.json'

export default function SecuritiesList() {

    // initialize securities with securites.json 
    const [securities, setSecurities] = useState([...Securities])

    //define add modal open and close
    const [isAddModalOpen, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false)
    }

    //add Security
    const addASecurity = (e,newSecurity) => {
        e.preventDefault()
        setSecurities([...securities, newSecurity])
        closeAddModal()
    }

    //add Prices to a security 
    const addPrice = (e, security, newPrice) => {
        e.preventDefault()
        setSecurities([...securities, security.prices.push(newPrice)])
        
    }

    // where do securities come from?
    //10

    return (
        <div className="securities-list">
            {securities.map( (security, index) => (
                <Security key={index} security={security} addPrice={addPrice} />
            ))}
            <button className="add-security-btn"
                onClick={() => setAddModal(true)}>Add
            </button>
            <SecurityModal 
                showAdd={isAddModalOpen}
                addASecurity={addASecurity}
                closeAddModal={closeAddModal}>
            </SecurityModal>

        </div>
    )
}