import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Analytics, BotUserSending, Home, NotFound } from './pages';


var App = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Home />}/>
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/bot-user-sending' element={<BotUserSending />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
