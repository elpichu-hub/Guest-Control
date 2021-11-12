import React, { useEffect, useState } from 'react';
import PopUpOnHover from '../PopUpOnHover/PopUpOnHover';
import './TopArea.css';




const TopArea = ({ inputText, handleTextOnChange, handleSearchBy, searchBy }) => {

    const [isPopUpGuestShown, setIsPopUpGuestShown] = useState(false)
    const [isPopUpResidentShown, setIsPopUpResidentShown] = useState(false)

    const handleOnLoad = () => {
        document.getElementById('input-for-search').focus();
    };

    useEffect(() => {
        handleOnLoad()
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
                        } styles={{maxWidth: 132}} />}

                    </div>
                </div>

            </div>
        </>
    )
};


export default TopArea