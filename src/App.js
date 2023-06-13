// import logo from './logo.svg';
import React,{useEffect, useRef, useState} from 'react'
import './App.css';
import {
  number,
  letter,
  character
}from './password'


function App() {

  const[password,setpassword] = useState('')
  const[letters,setletters]=useState(false)
  const[numbers,setnumbers]=useState(false)
  const[characters,setcharacters]=useState(false)
  const[list,setlists]=useState([])

  // Generate Password Function
  const generatePassword =(e)=>{
    e.preventDefault();
      let characterList =''

      if(letters){
        characterList = characterList+letter
      }

      if(numbers){
        characterList = characterList+number
      }

      if(characters){
        characterList=characterList+character
      }

      setpassword(createPassword(characterList))
  }

    const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    // Generating Random Passwords
    for (let i = 0; i < 15; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }

    const data = {password}
    if(password){
      setlists((ls)=>[...ls,data])
      setpassword("")
    }
   
    return password

    
  }

  // Copy function
  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }



  useEffect(()=>{
    localStorage.setItem('passwords',JSON.stringify(list))
  },[password])

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">
            Password Generator
          </h2>
          <div className="generator_password">
            <h3 className='password'>{password}</h3>
             <button onClick={copyToClipboard} className="copy_btn"><i class="fa-regular fa-clipboard"></i></button>
          </div>

          <div className="form_group">
            <label htmlFor="letters">Letters</label>
            <input
              checked={letters}
              onChange={(e) => setletters(e.target.checked)}
              type="checkbox"
              id="letters"
              name="letters"
            />
          </div>

          <div className="form_group">
            <label htmlFor="numbers">Numbers</label>
            <input
              checked={numbers}
              onChange={(e) => setnumbers(e.target.checked)}
              type="checkbox"
              id="numbers"
              name="numbers"
            />
          </div>

          <div className="form_group">
            <label htmlFor="characters">Characters</label>
            <input
              checked={characters}
              onChange={(e) => setcharacters(e.target.checked)}
              type="checkbox"
              id="characters"
              name="characters"
            />
          </div>
          <button onChange={(e)=>setpassword(e.target.value)} onClick={generatePassword} className="generator_btn">Generate Password</button>
        </div>

        <div className='recently_generated'>
          <h4 className='title'>Recently Generated Password</h4>
            {
              list.slice(-5).map((a)=><div>
              <li className='list'>{a.password}</li>
              </div>)
            }
      </div>
      </div>
    </div>
  );
}

export default App;
