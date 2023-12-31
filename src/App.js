// @ts-nocheck
import {useState, createContext} from 'react';
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

export const AppContext=createContext();

function App() {
  const [username, setUserName]=useState('hoang hiep');
  const client=new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  }
});

  return (
    <div className='App'>
      <AppContext.Provider value={{username, setUserName}}>
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
      </AppContext.Provider>
    </div>
  );
}


export default App;

/*const fetchdata=()=>fetch('https://catfact.ninja/fact')
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data);
    setCatFact(data.fact);
  }
  );*/