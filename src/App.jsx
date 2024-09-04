import './App.css'
import './../node_modules/antd/dist/antd.css'
import HomeLogin from './components/HomeLogin/Login/Login'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { Route, Routes,Navigate } from 'react-router'
import MainComponent from './components/MainPage/MainComponent'
import Favorite from './components/MainPage/FavoritePage/Favorite'
import SearchPage from './components/MainPage/SearchPage/Searchpage'


function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<HomeLogin />} />
          <Route element={<PrivateRoute />} >
            <Route path="/main" element={<MainComponent />} >
                <Route path ='favorite' element = {<Favorite/>} />
                <Route path ='search' element = {<SearchPage />} />
                <Route path="" element={<Navigate to="search" />} />
              </Route>
            </Route>
          
        </Routes>
      </div>
    </div>
  )
}

export default App

