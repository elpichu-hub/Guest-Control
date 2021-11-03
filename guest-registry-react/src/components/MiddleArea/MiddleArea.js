import './MiddleArea.css';


const MiddleArea = ({ successOrFailureMessage, showGuestLogMessage }) => {

    const message = (
        <div className='successOrFailureMessage' style={successOrFailureMessage === 'Guest Logged Successfully!' ?
            { backgroundColor: 'green' } : { backgroundColor: 'red' }}>
            <p>{successOrFailureMessage}</p>
            
        </div>
    )


    return (
        <div className='QueryResultsTopDiv'>
            {showGuestLogMessage && successOrFailureMessage && message}
            
        </div>
    )
};



export default MiddleArea;