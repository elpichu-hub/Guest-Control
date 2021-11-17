import './GuestLogForm.css';
import React, { useEffect, useState } from 'react';




const GuestLogForm = ({ guestData, createGuestLogClick, setGuestData }) => {


    const [firstName, setFirstName] = useState(guestData.first_name)
    const [lastName, setLastName] = useState(guestData.last_name)
    const [vehicle, setVehicle] = useState('')
    const [plate, setPlate] = useState('')
    const [company, setCompany] = useState('')
    const [extraNotes, setExtraNotes] = useState(guestData.special_note)


    // in app.js at createGuestLogClick() if missing a field when filling out form
    // This error will show a field required in red so you know which field you are missing
    const [error, setError] = useState('');


    // will set the firstName state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetFirstName = (e) => {
        setFirstName(e.target.value)
        setGuestData({
            ...guestData,
            first_name: e.target.value.toUpperCase(),
        })
    }


    // will set the lastName state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetLastName = (e) => {
        setLastName(e.target.value)
        setGuestData({
            ...guestData,
            last_name: e.target.value.toUpperCase(),
        })
    };


    // will set the address state and will update the guestData state based on what you type in the form
    // the address being visited should not be edited, if you do want to edit it use handleSetAddress on a
    // onChange event in the address input
    /*const handleSetAddress = (e) => {
        setAddress(e.target.value)
        setGuestData({
            ...guestData,
            address: e.target.value,
        })
    };*/


    // will set the vehicle state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetVehicle = (e) => {
        setVehicle(e.target.value)
        setGuestData({
            ...guestData,
            vehicle: e.target.value.toUpperCase()
        })
    };


    // will set the plate state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetPlate = (e) => {
        setPlate(e.target.value)
        setGuestData({
            ...guestData,
            plate: e.target.value.toUpperCase()
        })
    };


    // will set the company state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetCompany = (e) => {
        setCompany(e.target.value)
        setGuestData({
            ...guestData,
            company: e.target.value.toUpperCase()
        })
    };


    // will set the extraNotes state and will update the guestData state based on what you type in the form
    // This Function is bound to an onChange event
    const handleSetExtraNotes = (e) => {
        setExtraNotes(e.target.value)
        setGuestData({
            ...guestData,
            special_note: e.target.value.toUpperCase()
        })
    };


    /* when GuestLogForm shows this effect will run and focus on the first name input
        then it will keep doing it everythree seconds if nothing is focused*/
    useEffect(() => {
        document.getElementById('firstName').focus()
        const focusOnFormFistName = setInterval(() => {
            if (!document.activeElement.id) {
                document.getElementById('firstName').focus()
            }
        }, 3000)
        return () => clearInterval(focusOnFormFistName)
    })


    return (
        <div className='showFormDiv' >
            <div style={{ width: 548 }}>

                <p><span>*</span> First Name - {error === guestData.first_name ? <span className='error'>Field Required</span> : null}</p>
                <input type="text" className="form-control inputClass" value={firstName}
                    id='firstName' onChange={(e) => { handleSetFirstName(e) }}
                    required autoComplete="off" placeholder="Enter The Guest's First Name" />

                <p><span>*</span> Last Name - {error === guestData.last_name ? <span className='error'>Field Required</span> : null}</p>
                <input type="text" className="form-control inputClass" value={lastName}
                    id='lastName' onChange={(e) => { handleSetLastName(e) }} autoComplete="off"
                    placeholder="Enter The Guest's Last Name" />

                <p><span>*</span> Address - {error === guestData.address ? <span className='error'>Field Required</span> : null}</p>
                <input type="text" className="form-control inputClass" value={guestData.address}
                    id='address'
                    required autoComplete="off" placeholder="Enter The Address Visiting" />

                <p><span>*</span> Vehicle - {error === guestData.vehicle ? <span className='error'>Field Required</span> : null}</p>
                <input type="text" className="form-control inputClass"
                    placeholder="Enter Make & Model" id='vehicle'
                    onChange={(e) => handleSetVehicle(e)}
                    value={vehicle} required autoComplete="off" />

                <p><span>*</span> Plate - {error === guestData.plate ? <span className='error'>Field Required</span> : null}</p>
                <input type="text" className="form-control inputClass"
                    placeholder="Enter Vehicle's Plate" id='plate'
                    onChange={(e) => handleSetPlate(e)}
                    value={plate} required autoComplete="off" />

                <p>Company</p>
                <input type="text" className="form-control inputClass"
                    placeholder="If worker, enter company name" id='company'
                    onChange={(e) => handleSetCompany(e)}
                    value={company} autoComplete="off" />

                <p>Extra Notes</p>
                <textarea rows="4" cols="71"
                    placeholder="Enter Any Extra Notes Worth Informing About..." id='extraNotes'
                    onChange={(e) => handleSetExtraNotes(e)}
                    value={extraNotes} autoComplete="off" />

                <button type='button' className="btn btn-success" onClick={() => createGuestLogClick(guestData, setError)} >Log Guest</button>

            </div>
        </div>
    )
}



export default GuestLogForm;