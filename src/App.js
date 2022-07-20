import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios'
import InputForm from './components';
import debounce from 'lodash.debounce';

function App() {
  const [input, setInput] = useState('')
  const [dataUsers, setDataUsers] = useState([])
  const [show, setShow] = useState(false)

  const handleInputChange = debounce((e) => {
    setInput(e.target.value);
    if (e.target.value !== '')
      setShow(true)
    else
      setShow(false)
  }, 500);

  const getUserData = (inputText) => {
    const dataReceive = axios.get(`https://api.github.com/users/${inputText}`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log(err);
      })
    return dataReceive;
  }


  useEffect(() => {
    (async () => {
      const response = await getUserData(input);
      setDataUsers(response);
    })();
  }, [input])

  return (
    <div className="App">
      <InputForm
        handleInputChange={handleInputChange}
      />
      {show &&
        <div className='app_showInfo'>
          <div className='app_text'>
            <div>Role:
              {dataUsers?.type}
            </div>
            <div>Company:
              {dataUsers?.company}
            </div>
            <div>Email:
              {dataUsers?.email}
            </div>
            <div>Number of followers:
              {dataUsers?.followers}
            </div>
          </div>
          <div className='app_img'>
            <img src={dataUsers?.avatar_url} />
          </div>
        </div>}
    </div>
  );
}

export default App;
