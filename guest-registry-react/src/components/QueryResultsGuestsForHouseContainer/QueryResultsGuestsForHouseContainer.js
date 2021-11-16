import './QueryResultsGuestsForHouseContainer.css';



// This Component will render guests for a specific house.
const QueryResultsGuestsForHouseContainer = ({ getGuestInfoClick, value }) => {
    return (
        <>
            {
                <div className='QueryResultsGuests' onClick={() => { getGuestInfoClick(value) }}  >
                    <p>{`${value.guest_last_name} ${value.guest_first_name} - 
                        ${value.special_note ? value.special_note : 'Visitor'} - 
                        ${value.address_visiting}`}</p>
                </div>
            }
        </>
    )
};




export default QueryResultsGuestsForHouseContainer;



