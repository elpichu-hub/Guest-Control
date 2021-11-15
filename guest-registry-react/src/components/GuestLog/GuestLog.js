import './GuestLog.css';
import { useEffect, useState } from 'react';
import GuestLogTable from '../GuestLogTable/GuestLogTable';
import PopUpOnHover from '../PopUpOnHover/PopUpOnHover';



const GuestLog = () => {

    // This state is going to be set after running getGuestLogCustomized()
    const [guestLogs, setGuestLogs] = useState({})

    /* When you type something in the input at GuestLog Component, setGuestLogsCustom()
        will run on a onChange event */
    const [guestLogsCustom, setGuestLogsCustom] = useState('')

    // This state will show a table with guestLogs in it
    const [showTable, setShowTable] = useState(false)

    /* This state is an explanation text that will show up when you hover over certain elements, 
        of what some elements do, mainly buttons */
    const [isPopUpGuestLogsShow, setIsPopUpGuestLogsShow] = useState(false);


    
    useEffect(() => {
        const getGuestLogCustomized = async () => {
            try {
                const response = await fetch(`https://guestentryapp.herokuapp.com/react/list/guestlog?search=${guestLogsCustom}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token 09f3a37a78991b0a86ccd07329f991d908b0ce5e',
                    }
                });
                if (response.ok) {
                    const jsonResponse = await response.json();
                    setGuestLogs(jsonResponse)
                    setShowTable(true)
                    console.log(jsonResponse)
                }
            } catch (error) {
                console.log(error)
            }

        };
        if (showTable) {
            getGuestLogCustomized()
        }
    }, [guestLogsCustom, showTable])

    // this is meant for more specific search for guestlogs. You type something in the input and when you click on 'Show Guest Logs' button
    // it will return the data from data
    const getGuestLogCustomizedClick = async () => {
        try {
            const response = await fetch(`https://guestentryapp.herokuapp.com/react/list/guestlog?search=${guestLogsCustom}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 09f3a37a78991b0a86ccd07329f991d908b0ce5e',
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                setGuestLogs(jsonResponse)
                setShowTable(!showTable)
                console.log(jsonResponse)
            }
        } catch (error) {
            console.log(error)
        }

    };


    //when the input for guest logs history changes it will query base on what you type, that changed value is stored in setGuestLogsCuston
    //at the same time it will show the table for guest logs.
    const handleOnChangeForGuestLogs = (e) => {
        setGuestLogsCustom(e.target.value)
        setShowTable(true)
    };



    return (
        <>
            <div className='tableButtonAndInput'>
                <div
                    onMouseEnter={() => setIsPopUpGuestLogsShow(true)}
                    onMouseLeave={() => setIsPopUpGuestLogsShow(false)}>
                    <button type="button" className="btn btn-secondary"
                        onClick={getGuestLogCustomizedClick}

                        id='showTableButton'>Show Guest Logs</button>
                    {isPopUpGuestLogsShow && <PopUpOnHover message={
                        'Look at the history of guests allowed into the property. You can search for vehicle, plate, first and last name or address visited.'
                    } styles={{ maxWidth: 240 }} />}
                </div>

                <div>
                    <input value={guestLogsCustom} onChange={(e) => { handleOnChangeForGuestLogs(e) }}
                        id='logsInput' placeholder='Search By..' autoComplete="off" />
                </div>


            </div>
            <div class='Table'>
                {showTable ? <GuestLogTable guestLogs={guestLogs} /> : null}
            </div>
        </>
    )
};


export default GuestLog;