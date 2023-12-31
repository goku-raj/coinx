import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./routes/Home"
import Signin from './routes/Signin';
import Signup from './routes/Signup';
import Account from './routes/Account';
import axios from "axios";
import { useEffect, useState } from "react";
import CoinPage from "./routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";



function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en'

  useEffect(()=>{
    axios.get(url).then(res =>{
      setCoins(res.data)
      // console.log(res.data)
    })
  },[url])

  return (
    <ThemeProvider>
    <AuthContextProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home coins= {coins}/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/coin/:coinId" element={<CoinPage/>}>
            <Route path=":coinId"/>
          </Route>
        </Routes>
    </AuthContextProvider>
      <Footer/>
    </ThemeProvider>
  )
}

export default App