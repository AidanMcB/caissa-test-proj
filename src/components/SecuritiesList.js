import React, { useState } from 'react';
// Components
import Security from './Security'
import SecurityModal from './SecurityModal'
import Securities from '../securities.json'

export default function SecuritiesList() {

    // initialize securities from securites.json file
    const [securities, setSecurities] = useState([...Securities])
    
        // uncomment the following, and pass down to children if 
        // want to use only countries that exist in our json data
    //const countries = securities.map(sec => sec.country)

    //define add modal open and close
    const [isAddModalOpen, setAddModal] = useState(false)
    const closeAddModal = () => {
        setAddModal(false)
    }

    // *** SECURITY *** //
    const addASecurity = (e, newSecurity) => {
        e.preventDefault()
        setSecurities([...securities, newSecurity])
        closeAddModal()
    }
  
    const deleteASecurity = (e, selectedSecurity) => {
        e.preventDefault()
        setSecurities([
            ...securities.filter(sec => sec !== selectedSecurity)          // remove seecurity that is equal to the one passed to the function
        ])
    } 

    const editASecurity = (e, updatedSecurityInfo, originalSecurity) => {
        e.preventDefault()
        let index = securities.findIndex(sec => securities.indexOf(sec) === securities.indexOf(originalSecurity))       //find index of security
        updatedSecurityInfo.prices = originalSecurity.prices                    // copy prices to new security 
        securities.splice(index, 1, updatedSecurityInfo)                        // replace security with new(updated) security
        setSecurities([                                                         // update state to match
            ...securities
        ])
    }

    // *** PRICES *** //
    const addPrice = (e, selectedSecurity, newPrice) => {
        e.preventDefault()
        selectedSecurity.prices.push(newPrice)
        setSecurities([...securities ])
    }

    const deletePrice = (e, selectedSecurity, selectedPrice) => {
        e.preventDefault()
        let replacementSec = selectedSecurity                                                         // create new security
        replacementSec.prices = selectedSecurity.prices.filter(price => price !== selectedPrice)        // remove selected price
        let index = securities.findIndex(sec => securities.indexOf(sec) === securities.indexOf(selectedSecurity))   // determine the security index
        securities.splice(index, 1, replacementSec)                                                                 // replace with the new security
        setSecurities([                                                     // set state to match updated securities
            ...securities
        ])
    }

    const editPrice = (e, selectedSecurity, newPrices) => {
        e.preventDefault()
        let newSecurity = selectedSecurity
        newSecurity.prices = newPrices                                                  
        editASecurity(e, newSecurity, selectedSecurity)                 // call previous function to work with the new sercurity we created 
    }

    //pass and empty security to empty the input fields
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