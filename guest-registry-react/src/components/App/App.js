import './App.css';
import TopArea from '../TopArea/TopArea';
import MiddleArea from '../MiddleArea/MiddleArea';
import GuestLog from '../GuestLog/GuestLog';
import React, { useState, useEffect } from 'react';
import GuestLogForm from '../GuestLogForm/GuestLogForm';
import QueryResultsGuests from '../QueryResultsGuests/QueryResultsGuests';
import QueryResultsResidents from '../QueryResultsResidents/QueryResultsResidents';
import QueryResultsGuestsForHouse from '../QueryResultsGuestsForHouse/QueryResultsGuestsForHouse';





function App() {

  // This is what you are gonna be querying by can be 'Resident' or 'Guest'
  const [searchBy, setSearchBy] = useState('Resident');

  /* this is what you type into the input element on TopArea component, it is used to
  query residents or guest that start with what is typed*/
  const [inputText, setInputText] = useState('');

  // this is the query response for when you are looking for a Resident
  const [queryResponseResidents, setQueryResponseResidents] = useState({})

  // if true will show the residents that match the 'inputText'
  const [showResidents, setShowResidents] = useState(false)

  // this is the query response for when you are looking for a Guest
  const [queryResponseGuests, setQueryResponseGuests] = useState({})

  // if true, will show the guests lists. Will be true if 'SearchBy' === 'Guests'
  const [showGuests, setShowGuests] = useState(false)

  /* if logging a new guest, after selecting a resident, this state will save that
  address so when you are filling out the form to log the new guest, this address is
  going to be in that form automatically */
  const [addressToLogNewGuest, setAddressToLogNewGuest] = useState('')

  /* when you select a resident, that resident's address will be used to call
  getGuestsForAddress() and get all the residents in that resident's address */
  const [queryResponseGuestsForHouse, setQueryResponseGuestsForHouse] = useState({})

  /* after selecting a resident, if true the app will show all the guests for that
  resident's address */
  const [showGuestsForHouse, setShowGuestsForHouse] = useState(false)


  /* after clicking on a resident, then guest, if true the app will show the form
  to log a guest into that resident's address */
  const [showForm, setShowForm] = useState(false)

  /* when you select a guest, getGuestInfoClick() will execute getGuestInfo()
  which will collect all the info known for that guest by setting guestData state.
  If logging a guest not in the database,  logNewGuestNotInGuestListClick() will
  only take the address by using 'addressToLogNewGuest' State */
  const [guestData, setGuestData] = useState({})

  const [successOrFailureMessage, setSuccessOrFailureMessage] = useState('')
  const [showGuestLogMessage, setShowGuestLogMessage] = useState(false)




  const handleSearchBy = (e) => {
    if (e.target.innerHTML === 'Search Resident') {

      setInputText('')
      setSearchBy('Resident')
      setAddressToLogNewGuest('')
      setShowGuestsForHouse(false)
      setShowGuests(false)
      console.log('Search Residents')
      document.getElementById('input-for-search').focus()

    } else {

      setInputText('')
      setSearchBy('Guest')
      setShowResidents(false)
      setShowGuestsForHouse(false)
      console.log('Search Guests')
      document.getElementById('input-for-search').focus()

    }
  };


  //This will make sure to refocus to the search input after 4 seconds of not being unless at the form view
  useEffect(() => {
    const focusOnInput = setInterval(() => {
      if (!showForm) {
        document.getElementById('input-for-search').focus()
      }
    }, 2000)
    return () => clearInterval(focusOnInput)
  })


  // Everytime you type into input at 'TopArea', inputText state is getting set
  // inputText will be used to query the database based on what you typed
  const handleTextOnChange = (e) => {
    setInputText(e.target.value)
  };


  /* if 'searchBy or inputText' and inputText === true, getQueryResults() will be called, there are endpoints for residents and another for guests
   the call will depend on the value of 'searchBy'. */
  useEffect(() => {
    if (searchBy === 'Resident') {
      const getQueryResults = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/react/list/resident?search=${inputText}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',
            }
          })
          if (response.ok) {
            const jsonResponse = await response.json();
            setQueryResponseResidents(jsonResponse)
            setShowGuestsForHouse(false)
            setShowResidents(true)
            console.log(jsonResponse)
          }
        } catch (error) {
          console.log(error)
        }
      };
      if (inputText) {
        getQueryResults()
      } else {
        console.log('No input to search by!')
      }
    } else {
      const getQueryResults = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/react/list/guest?search=${inputText}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',
            }
          })
          if (response.ok) {
            const jsonResponse = await response.json();
            setQueryResponseGuests(jsonResponse)
            setQueryResponseGuestsForHouse({})
            setShowGuests(true)
            console.log(jsonResponse)
          }
        } catch (error) {
          console.log(error)
        }
      };
      if (inputText) {
        getQueryResults()
      } else {
        console.log('No input to search by!')
      }
    }
  }, [inputText, searchBy])


  // this function will get all the guest for that residents house;
  const getGuestsForAddress = async (address) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/react/list/guest?search=${address}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',

        }
      })
      if (response.ok) {
        const jsonResponse = await response.json();
        setQueryResponseGuestsForHouse(jsonResponse)
        setAddressToLogNewGuest(address)

        setShowResidents(false)
        setShowGuestsForHouse(true)

        console.log(jsonResponse)
      }
    } catch (error) {
      console.log(error)
    }
  };


  //when clicked will get all the guest for a resident's house and clear the 'queryResponseResidents' state.
  const showGuestsForHouseClick = (address) => {
    getGuestsForAddress(address)
    console.log(address)
    setQueryResponseResidents({})
  };

  // creates the data object and pass it to Guest Data state
  const getGuestInfo = (value) => {
    if (!value) {
      const data = {
        address: '',
        last_name: '',
        first_name: '',
        special_note: '',

      }
      console.log(data)
      setGuestData(data)
    } else {
      const data = {
        address: value.address_visiting,
        last_name: value.guest_last_name,
        first_name: value.guest_first_name,
        special_note: value.special_note
      }
      console.log(data)
      setGuestData(data)
    }
  };

  //This click will call getGuestInfo, clear the guests suggestions and will set showForm to true
  const getGuestInfoClick = (value) => {
    getGuestInfo(value)

    setShowGuestsForHouse(false)
    setShowGuests(false)
    setShowForm(true)

  };




  const logNewGuestNotInGuestListClick = () => {
    const data = {
      address: addressToLogNewGuest,
      special_note: null
    }

    setGuestData(data)
    setShowForm(true)
    setShowGuests(false)
    setShowGuestsForHouse(false)

  };



  // the intention of this is to make sure that showForm remains false
  useEffect(() => {
    setShowForm(false)
    setSuccessOrFailureMessage('')
  }, [inputText, searchBy])



  // will make a POST request to the data base using the data gathered with getGuestInfoClick()
  const createGuestLog = async (guestData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/react/create/guestlog/", {
        method: 'POST',
        body: JSON.stringify(guestData),
        headers: {
          'Content-Type': 'application/json',
          'Transfer-Encoding': 'chunked',
          'Authorization': 'Token 72e2f76284aa92d0d2eda68192c98072195eaf0c',
        }
      })

      console.log(response)
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        setSuccessOrFailureMessage('Guest Logged Successfully!')
      } else {
        setSuccessOrFailureMessage('An Error Occurred , Please Try Again!')
      }
    } catch (error) {
      console.log(error);
    }

  };



  // will execute createGuestLog(). This func will be passed to GuestLogForm component. Will create an error in setError
  // and pass it to guestlogForm to show missing fields if any when clicked
  const createGuestLogClick = (guestData, setError) => {

    if (guestData.first_name && guestData.last_name && guestData.address && guestData.vehicle && guestData.plate) {
      setShowForm(false);
      setShowGuestLogMessage(true)
      createGuestLog(guestData);

      setInputText('')

      document.getElementById('input-for-search').focus()

    } else {

      if (!guestData.first_name) {
        setError(guestData.first_name);
      };
      if (!guestData.last_name) {
        setError(guestData.first_name);
      };
      if (!guestData.address) {
        setError(guestData.address);
      };
      if (!guestData.vehicle) {
        setError(guestData.vehicle);
      };
      if (!guestData.plate) {
        setError(guestData.plate);
      };
    };
  };




  return (
    <div className='container-1'>
      <div className='child-1'>
        <TopArea handleTextOnChange={handleTextOnChange} inputText={inputText} handleSearchBy={handleSearchBy}
          searchBy={searchBy} />


        {showResidents ? <QueryResultsResidents queryResponseResidents={queryResponseResidents}
          showGuestsForHouseClick={showGuestsForHouseClick} /> : null}


        {showGuestsForHouse ? <QueryResultsGuestsForHouse response={queryResponseGuestsForHouse}
          getGuestInfoClick={getGuestInfoClick} logNewGuestNotInGuestListClick={logNewGuestNotInGuestListClick}
        /> : null}


        {showGuests ? <QueryResultsGuests response={queryResponseGuests}
          getGuestInfoClick={getGuestInfoClick} /> : null}


        {!showGuests && !showResidents && !showGuestsForHouse && !showForm ? <MiddleArea successOrFailureMessage={successOrFailureMessage}
          showGuestLogMessage={showGuestLogMessage} /> : null}


        {showForm && <GuestLogForm guestData={guestData} createGuestLogClick={createGuestLogClick}
          setGuestData={setGuestData} />}

        <GuestLog addressToLogNewGuest={addressToLogNewGuest} />
      </div>
    </div>
  )
};



export default App;
