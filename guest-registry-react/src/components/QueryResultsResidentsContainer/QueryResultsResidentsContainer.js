import './QueryResultsResidentsContainer.css';




// this component will render residents
const QueryResultsResidentsContainer = ({ showGuestsForHouseClick, value }) => {
    return (
        <>
            {
                <div className='QueryResultsResidents' onClick={() => { showGuestsForHouseClick(value.address) }}  >
                    <p>{`${value.resident_last_name} ${value.resident_first_name} - ${value.address} - ${value.resident_phone}`}</p>
                </div>
            }
        </>
    )
};




export default QueryResultsResidentsContainer;