import './QueryResultsGuests.css';
import QueryResultsGuestsForHouseContainer from '../QueryResultsGuestsForHouseContainer/QueryResultsGuestsForHouseContainer';



// response comes from queryResults() at app.js, the response will be looped over
// and for each item in the response a QueryResultsGuestsForHouseContainer will render
// This will render when you query for guest under 'searchBy === Guest'
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