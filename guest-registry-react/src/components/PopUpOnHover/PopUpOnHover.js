import './PopUpOnHover.css'


const PopUpOnHover = ({ message, styles }) => {
    return (
        <div className='PopUpOnHover' style={styles}>
            <p>{message}</p>
        </div>
    )
};


export default PopUpOnHover;