import React, { useEffect } from 'react';
import './TopArea.css';




const TopArea = ({ inputText, handleTextOnChange, handleSearchBy, searchBy }) => {

    const handleOnLoad = () => {
        document.getElementById('input-for-search').focus();
    };

    useEffect(() => {
        handleOnLoad()
    }, [])

    return (
        <>
            <div className='TopArea'>
                <div className='QueryResidents'>
                    <button type="button"
                        className="btn btn-secondary"
                        style={
                            searchBy === 'Resident' ?
                                { backgroundColor: 'green' } :
                                { backgroundColor: 'grey' }
                        }
                        onClick={handleSearchBy}>Search Resident</button>
                </div>

                <div>
                    <input style={{ backgroundColor: `rgba(${31}, ${182}, ${209})` }}
                        id='input-for-search'
                        value={inputText} onChange={handleTextOnChange} autoComplete="off" />
                </div>
                <div>
                    <div className='QueryGuests'>
                        <button type="button"
                            className="btn btn-secondary"
                            style={
                                searchBy === 'Guest' ?
                                    { backgroundColor: 'green' } :
                                    { backgroundColor: 'grey' }
                            }
                            onClick={handleSearchBy}>Search Guest</button>
                    </div>
                </div>

            </div>
        </>
    )
};


export default TopArea