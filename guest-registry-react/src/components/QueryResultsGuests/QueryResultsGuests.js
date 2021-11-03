import './QueryResultsGuests.css';
import QueryResultsGuestsForHouseContainer from '../QueryResultsGuestsForHouseContainer/QueryResultsGuestsForHouseContainer';



const QueryResultsGuests = ({ getGuestInfoClick, response }) => {
    const overflowStyle = Object.keys(response).length;
    return (
        <div className='QueryResultsTopDiv' style={{ overflowY: overflowStyle > 8 ? 'scroll' : 'hidden' }} >
            {Object.values(response).map((element, index) => (
                <QueryResultsGuestsForHouseContainer value={element} key={index}
                    getGuestInfoClick={getGuestInfoClick} />
            ))}
        </div>
    )
};



export default QueryResultsGuests;