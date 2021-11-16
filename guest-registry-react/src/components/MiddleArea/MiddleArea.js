import './MiddleArea.css';




// this component will show empty when first ran, after creating a log
// then a success or failure message will show in it. 
///////Work to improve this///////
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