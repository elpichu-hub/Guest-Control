import './PopUpOnHover.css'




// This component is pop over that will appear when you hover over certain elements
const PopUpOnHover = ({ message, styles }) => {
    return (
        <div className='PopUpOnHover' style={styles}>
            <p>{message}</p>
        </div>
    )
};




export default PopUpOnHover;