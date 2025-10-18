import { useState, useCallback, useEffect,  useRef } from 'react'


function App() {

  const [length, setlength] = useState();
  const [numberAllowed, serNumberAllowed] = useState(false);
  const [charAllowed, serCharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "@~!$%^&*(){}`"

    for(let i=1; i<=length; i++){
      let index = Math.floor(Math.random() * str.length + 1)   //index-value
      pass += str.charAt(index)
    }
    setpassword(pass);

    }, [length, numberAllowed, charAllowed, setpassword]);


  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(()=> {passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator]);
    

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-9 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center text-xl my-5'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full py-2 px-3' placeholder='Password' ref={passwordRef} readOnly />
          <button onClick={copyPasswordClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
         <div className='flex text-lg gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-poiter' 
            onChange={(e) => {setlength(e.target.value)}} />
            <lebel> length: {length}</lebel>
          </div>

          <div className='flex-items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput'
            onChange={() => {serNumberAllowed((prev) => !prev)}} />
            <lebel htmlFor="numberInput" >Numbers</lebel>
          </div> 

          <div className='flex-items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='numberInput'
            onChange={() => {serCharAllowed((prev) => !prev)}} />
            <lebel htmlFor="characterInput" >Character</lebel>
          </div> 

         </div>
    </div>
    </>
        
  )
}

export default App
