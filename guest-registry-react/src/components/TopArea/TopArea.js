import React, { useEffect, useState } from 'react';
import PopUpOnHover from '../PopUpOnHover/PopUpOnHover';
import './TopArea.css';




// This componet is rendered at the top of the application and will handle most 
// of the querying to look for residents and guests
const TopArea = ({ inputText, handleTextOnChange, handleSearchBy, searchBy }) => {

    // This is a pop up with a hint of what the 'Search Button' does
    const [isPopUpGuestShown, setIsPopUpGuestShown] = useState(false)

    // This is a pop up with a hint of what the 'Search Resident' does
    const [isPopUpResidentShown, setIsPopUpResidentShown] = useState(false)


    // When app runs it will focus on 'input-for-search'
    useEffect(() => {
        document.getElementById('input-for-search').focus();
    }, [])


    return (
        <>
            <div className='TopArea'>

                <div
                    onMouseEnter={() => setIsPopUpResidentShown(true)}
                    onMouseLeave={() => setIsPopUpResidentShown(false)}>

                    <button type="button"
                        className="btn btn-secondary"
                        style={
                            searchBy === 'Resident' ?
                                { backgroundColor: 'green' } :
                                { backgroundColor: 'grey' }
                        }
                        onClick={handleSearchBy}>Search Resident</button>

                    {isPopUpResidentShown && < PopUpOnHover message={
                        'Search Residents by First Name, Last Name, Address or Phone Number.'
                    } styles={{ maxWidth: 132 }} />}

                </div>

                <div>
                    <input style={{ backgroundColor: `rgba(${31}, ${182}, ${209})` }}
                        id='input-for-search'
                        value={inputText} onChange={handleTextOnChange} autoComplete="off" />
                </div>

                <div>

                    <div className='QueryGuests'
                        onMouseEnter={() => setIsPopUpGuestShown(true)}
                        onMouseLeave={() => setIsPopUpGuestShown(false)}>

                        <button type="button"
                            className="btn btn-secondary"
                            style={
                                searchBy === 'Guest' ?
                                    { backgroundColor: 'green' } :
                                    { backgroundColor: 'grey' }
                            }
                            onClick={handleSearchBy}
                        >Search Guest</button>

                        {isPopUpGuestShown && < PopUpOnHover message={
                            'Search Guests in the guest list by first name, last name or address visiting.'
                        } styles={{ maxWidth: 132 }} />}

                    </div>

                </div>

            </div>
        </>
    )
};




export default TopArea