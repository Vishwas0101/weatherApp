import './App.css'
import Text from './Text'
import CurrentLocation from "./components/CurrentLocation";
import EarthBackground from './components/EarthBackground'

function App() {
  return (
    <>
      <div className="relative">
        <EarthBackground />

        <div className="absolute inset-0 z-10">
          <div className="flex justify-center items-center mt-5 shadow-inner">
            <Text />
          </div>
          <div className='container'>
            <CurrentLocation />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
