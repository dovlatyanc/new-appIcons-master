
import './App.css';
import Navbar   from './pages/NavBar';
import NotFound from './pages/notFound';
import AboutUs from './pages/AboutUs';
import Game from './pages/Game';
import Home from './pages/Home';
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Game2048 from './pages/Game2048';
import TicTacToe from './pages/TicTacToe';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function NavbarWrapper(){
    return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavbarWrapper/>,
        children:[
             {
                path: "/",
                element: <Home/>
            },
            {
                path: "/About",
                element: <AboutUs />
            },
            {
                path: "/418",
                element: <NotFound/>
            },
            {
                path: "/game",
                element: <Game/>,
                
            },
              {
                path: "/2048",
                element: <Game2048/>,
                
            }  ,
            {
                path: "/tictactoe",
                element: <TicTacToe/>,
                
            }
           
        ]
    }
])





function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch({ type: 'auth/checkAuth' });
    }
  }, [dispatch]);


  return (

      <div>
          <RouterProvider router={router}/> 
    </div>
  );
}

export default App;