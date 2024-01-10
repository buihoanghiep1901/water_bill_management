// @ts-nocheck
import {useState, createContext, useContext} from 'react';
import { BrowserRouter  as Router,Routes, Route } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
// import Axios from 'axios';
import { IconContext } from "react-icons";
import './App.css';
//Routes
import Login from './Routes/login/Login';
import Main from './Routes/Main';
import Clients from './Routes/Clients/Clients';
import Users from './Routes/Users/Users'
import Categories from './Routes/Categories/Categories'
import Billings from './Routes/Billings/Billings'
import Home from './Routes/Dashboard/Dashboard';
import AppContextProvider from './Context/AppContextProvioder';

function App() {
  
  const client=new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  }
});

  return (
    <div className='App'>
      <AppContextProvider >
        <QueryClientProvider client={client}>
          <IconContext.Provider value={{ className: "Icon" }}>
            <Router>
              <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/main' element={<Main/>}>
                  <Route path='' element={<Home/>}/>
                  <Route path='users' element={<Users/>}/>
                  <Route path='clients' element={<Clients/>}/>
                  <Route path='billings' element={<Billings/>}/>
                  <Route path='categories' element={<Categories/>}/>
                </Route>
                <Route path='*' element={<h1>Page not found</h1>}/>
              </Routes>
            </Router>
          </IconContext.Provider>
        </QueryClientProvider>
      </AppContextProvider>
    </div>
  );
}


export default App;
