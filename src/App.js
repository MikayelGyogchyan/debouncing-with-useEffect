import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [title, setTitle ] = useState('');
  const [data, setData ] = useState('');

  useEffect(() => {
    if(title.length === 2) {
      const handle = setTimeout(() => {
        fetch(`https://corona-api.com/countries/${title}`)
        .then(stream => stream.json())
        .then(results => setData(results.data))
      }, 1000)

      return () => {
        clearTimeout(handle)
      }
    }
  }, [title])

  let confirmed = ''
  let name = ''
  if(data !== undefined) { 
    confirmed = data.latest_data?.confirmed
    name = data.name
  }

  return (
    <div className="App">
      <input
        type="text"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
      ></input>

      <h1>{name} {confirmed}</h1>

    </div>
  );
}

export default App;
