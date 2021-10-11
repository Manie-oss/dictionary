import Axios from 'axios';
import {React, useState} from 'react';
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import './App.css';

function App(){

  const [word, setWord] = useState('');
  const [previousWord, setPreviousWord] = useState('');
  const [data, setData] = useState('')

  function searchWord(){
    setPreviousWord(word);
    Axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  function pronounceWord(){
    let audio = new Audio(data[0].phonetics[0].audio);
    audio.play();
  }

  return(
    <div className = "flex-container">
      <h1>My dictionary</h1>
      <div className = "search-bar">
        <input type = "text" placeholder = "Search" onChange = {(e) => {setWord(e.target.value)}} />
        <button className = "button" onClick = { searchWord }><FaSearch size="23px" /></button>
      </div>
      {data && (word !== '' && word === previousWord  &&
      (<div className = "output"> 
        <div className = "show-data"><span style = {{color: "green"}}>Word: </span>{word}
          <button style = {{ marginLeft: "100px"}} onClick = { pronounceWord }><FcSpeaker size="23px" style = {{color: "green"}}/></button>
        </div> 
          <div className = "show-data"><span style = {{color: "green"}}>Part of speech: </span>{data[0].meanings[0].partOfSpeech}</div>
          <div className = "show-data"><span style = {{color: "green"}}>Meaning: </span>{data[0].meanings[0].definitions[0].definition}</div>
          <div className = "show-data"><span style = {{color: "green"}}>Example: </span>{data[0].meanings[0].definitions[0].example}</div>
      </div>))}
      
    </div>
  )
};

export default App; 