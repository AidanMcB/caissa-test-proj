import React, { useState } from 'react';
import Security from './Security'
import SecurityModal from './SecurityModal'
import Securities from '../securities.json'

export default function SecuritiesList() {

    // initialize securities with securites.json 
    const [securities, setSecurities] = useState([...Securities])
    // current countries, if we only want to add countries 
    // that already exist in our data 
    //const countries = securities.map(sec => sec.country)

    //define add modal open and close
    const [isAddModalOpen, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false)
    }

    // *** SECURITY *** //
    //add Security
    const addASecurity = (e, newSecurity) => {
        e.preventDefault()
        console.log(newSecurity)
        setSecurities([...securities, newSecurity])
        closeAddModal()
    }
    //delete Secuirty
    const deleteASecurity = (e, selectedSecurity) => {
        e.preventDefault()
        setSecurities([
            ...securities.filter(sec => sec !== selectedSecurity)
        ])
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

    // *** PRICES *** //
    //add Prices to a security 
    const addPrice = (e, selectedSecurity, newPrice) => {
        e.preventDefault()
        selectedSecurity.prices.push(newPrice)
        setSecurities([...securities ])
    }
    //delete Price for a security
    const deletePrice = (e, selectedSecurity, selectedPrice) => {
        e.preventDefault()
        //find the security, delte the selectedPrice
        let replacementSec = selectedSecurity
        replacementSec.prices = selectedSecurity.prices.filter(price => price !== selectedPrice)
        let index = securities.findIndex(sec => securities.indexOf(sec) === securities.indexOf(selectedSecurity))
        securities.splice(index, 1, replacementSec)
        setSecurities([
            ...securities
        ])
    }
    //edit Price for a security
    const editPrice = (e, selectedSecurity, newPrices) => {
        e.preventDefault()
        let newSecurity = selectedSecurity
        newSecurity.prices = newPrices
        editASecurity(e, newSecurity, selectedSecurity)
    }


    const [emptySecurity, setEmptySec] = useState({
        name: '',
        ISIN: '',
        country: '',
        prices: []
    })

    return (
        <div className="securities-list">
            {securities.map((security, index) => (
                <Security key={index} security={security}
                    editASecurity={editASecurity}
                    deleteASecurity={deleteASecurity}
                    addPrice={addPrice}
                    deletePrice={deletePrice}
                    editPrice={editPrice}
                />
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