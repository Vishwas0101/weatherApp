import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Text from './Text'
import CurrentLocation from "./components/CurrentLocation";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center items-center mt-5 shadow-inner">
        <Text />
      </div>
      <div className='container'>
        <CurrentLocation />
      </div>
    </>
  )
}

export default App
