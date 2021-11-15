import './GuestLog.css';
import { useEffect, useState } from 'react';
import GuestLogTable from '../GuestLogTable/GuestLogTable';
import PopUpOnHover from '../PopUpOnHover/PopUpOnHover';



const GuestLog = () => {


    const [guestLogs, setGuestLogs] = useState({});
    const [guestLogsCustom, setGuestLogsCustom] = useState('');
    const [showTable, setShowTable] = useState(false);                           // this state will toggle the table for the guestlogs history                      
    const [isPopUpGuestLogsShow, setIsPopUpGuestLogsShow] = useState(false);     // will show pop up when hovering over a button to explain what it is for

    
    useEffect(() => {
        const getGuestLogCustomized = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/react/list/guestlog?search=${guestLogsCustom}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',
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


    const getGuestLogCustomizedClick = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/react/list/guestlog?search=${guestLogsCustom}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',
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


    const handleOnChangeForGuestLogs = (e) => {
        setGuestLogsCustom(e.target.value)                    // What is this??????????
        setShowTable(true)
    }



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