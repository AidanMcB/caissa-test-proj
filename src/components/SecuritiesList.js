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
    //edit Security
    const editASecurity = (e, updatedSecurityInfo, originalSecurity) => {
        e.preventDefault()
        let index = securities.findIndex(sec => securities.indexOf(sec) === securities.indexOf(originalSecurity))
        updatedSecurityInfo.prices = originalSecurity.prices
        securities.splice(index, 1, updatedSecurityInfo)
        setSecurities([
            ...securities
        ])
    }
    //delete Secuirty
    const deleteASecurity = (e, selectedSecurity) => {
        e.preventDefault()
        setSecurities([
            ...securities.filter( sec => sec !== selectedSecurity)
        ])
    }

    //add Prices to a security 
    const addPrice = (e, security, newPrice) => {
        e.preventDefault()
        setSecurities([...securities, security.prices.push(newPrice)])
    }

    const [emptySecurity, setEmptySec] = useState({
        name: '',
        ISIN: '',
        country: '',
        prices: []
    })


    return (
        <div className="securities-list">
            {securities.map( (security, index) => (
                <Security key={index} security={security} editASecurity={editASecurity} deleteASecurity={deleteASecurity} addPrice={addPrice} />
            ))}
            <button className="add-security-btn"
                onClick={() => setAddModal(true)}>Add
            </button>
            <SecurityModal 
                showAdd={isAddModalOpen}
                addASecurity={addASecurity}
                closeAddModal={closeAddModal}>
                {emptySecurity}
            </SecurityModal>

        </div>
    )
}