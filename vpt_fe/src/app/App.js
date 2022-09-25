import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState } from "react";

import HomePage from '../pages/homePage/homePage';
import GamesPage from '../pages/gamesPage/gamesPage';
import SingleGamePage from "../pages/singleGame/singleGamePage";
import SignUpPage from "../pages/signUpPage/signUpPage";
import LogInpage from "../pages/logInPage/logInPage";
import WatchListPage from "../pages/watchListPage/watchListPage";
import navbarSearchValue from "../functions/searchValue";
import ErrorPage from "../pages/errorPage/errorPage";

const App = () => {

  const [user, setUser] = useState(null);
  const navbarSearch = navbarSearchValue();

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage user={user} setUser={setUser} navbarSearch={navbarSearch}/>} />
          <Route path="/videogames/*" element={<GamesPage user={user} setUser={setUser} navbarSearch={navbarSearch} />} />
          <Route path="/videogamesAll/*" element={<GamesPage user={user} setUser={setUser} navbarSearch={navbarSearch}/>} />
          <Route path='/videogame/:title' element={<SingleGamePage user={user} setUser={setUser} navbarSearch={navbarSearch}/>} />
          <Route path='/log-in' element={<LogInpage setUser={setUser}/>} />
          <Route path='/sign-up' element={<SignUpPage setUser={setUser}/>} />
          <Route path='/watchlist' element={<WatchListPage user={user} setUser={setUser} navbarSearch={navbarSearch}/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;