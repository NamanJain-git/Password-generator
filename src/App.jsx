import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  //useState hook
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

  //password generator method through useCallback hook
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!~@#$%^&*+=?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setpassword(pass);


  }, [length, number, character, setpassword])

  //copy password method through useCallback hook
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  //useEffect hook
  useEffect(() => { passwordgenerator() }, [length, number, character, passwordgenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="password"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassword} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
            type="range"
            className="cursor-pointer"
            min={8}
            max={20}
            value={length}
            onChange={(e) => { setlength(e.target.value) }}
          />
          <label>Length {length}</label>
        </div>
        <div className="flex item-center mx-2 gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={number}
            id="numberInput"
            onChange={() => { setnumber((prev) => !prev) }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex item-center mx-2 gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={character}
            id="characterInput"
            onChange={() => { setcharacter((prev) => !prev) }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
