import './QueryResultsGuestsForHouse.css';
import QueryResultsGuestsForHouseContainer from '../QueryResultsGuestsForHouseContainer/QueryResultsGuestsForHouseContainer';



// this component will render the guests for a specific resident's house after clicking on that resident
// A LogNewGuest suggestions will render here className = 'addNewGuest'
const QueryResultsGuestsForHouse = ({ getGuestInfoClick, response, logNewGuestNotInGuestListClick }) => {
    const overflowStyle = Object.keys(response).length;
    return (
        <div className='QueryResultsTopDiv' style={{ overflowY: overflowStyle > 8 ? 'scroll' : 'hidden' }} >
            <h5 className='addNewGuest' style={{ color: 'blue' }} onClick={() => logNewGuestNotInGuestListClick()}>
                <i class="bi bi-plus-square" style={{ fontSize: 40, color: 'blue' }}></i>
                Add New Guest</h5>
            {Object.values(response).map((element, index) => (
                <QueryResultsGuestsForHouseContainer value={element} key={index}
                    getGuestInfoClick={getGuestInfoClick} />
            ))}
        </div>
    )
};




export default QueryResultsGuestsForHouse;