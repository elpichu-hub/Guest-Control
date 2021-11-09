import './GuestLog.css';
import { useEffect, useState } from 'react';
import GuestLogTable from '../GuestLogTable/GuestLogTable';



const GuestLog = () => {


    const [guestLogs, setGuestLogs] = useState({})
    const [guestLogsCustom, setGuestLogsCustom] = useState('')
    const [showTable, setShowTable] = useState(false)

    const developmentToken = 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c';
    const productionToken = 'Token 09f3a37a78991b0a86ccd07329f991d908b0ce5e';

    useEffect(() => {
        const getGuestLogCustomized = async () => {
            try {
                const response = await fetch(`https://guestentryapp.herokuapp.com/react/list/guestlog?search=${guestLogsCustom}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': productionToken,
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
            const response = await fetch(`https://guestentryapp.herokuapp.com/react/list/guestlog?search=${guestLogsCustom}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': productionToken,
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
        setGuestLogsCustom(e.target.value)
        setShowTable(true)
    }

    return (
        <div className='tableDivision'>
            <div className='ButtonsGuestLogs'>

                <button type="button" className="btn btn-secondary" onClick={getGuestLogCustomizedClick}
                    id='showTableButton'>Show Guest Logs</button>

                <input value={guestLogsCustom} onChange={(e) => { handleOnChangeForGuestLogs(e) }}
                    id='logsInput' placeholder='Search By..' />



            </div>
            {showTable ? <GuestLogTable guestLogs={guestLogs} /> : null}
        </div>
    )
};


export default GuestLog;