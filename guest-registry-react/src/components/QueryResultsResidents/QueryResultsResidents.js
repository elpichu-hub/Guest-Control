import './QueryResultsResidents.css';
import QueryResultsResidentsContainer from '../QueryResultsResidentsContainer/QueryResultsResidentsContainer';




const QueryResultsResidents = ({ showGuestsForHouseClick, queryResponseResidents }) => {

    const overflowStyle = Object.keys(queryResponseResidents).length;
    return (
        <div className='QueryResultsTopDiv' style={{ overflowY: overflowStyle > 9 ? 'scroll' : 'hidden' }} >
            {Object.values(queryResponseResidents).map((element, index) => (
                <QueryResultsResidentsContainer value={element} key={index}
                    showGuestsForHouseClick={showGuestsForHouseClick} />
            ))}
        </div>
    )


};


export default QueryResultsResidents;




