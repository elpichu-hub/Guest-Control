import './GuestLogTable.css';


const GuestLogTable = ({guestLogs}) => {
    return (
        <div className='GuestLogTable'>
            <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Time And Date</th>
                    <th>Vehicle</th>
                    <th>Plate</th>
                    <th>Company</th>
                </tr>
                {Object.values(guestLogs).map((log, index) => (
                    <tr key={index}>
                                   
                        <td>{log.first_name}</td>
                        <td>{log.last_name}</td>
                        <td>{log.address}</td>
                        <td>{new Date(Date.parse(log.time_logged)).toLocaleString()}</td>
                        <td>{log.vehicle}</td>
                        <td>{log.plate}</td>
                        <td>{log.company}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
};



export default GuestLogTable;