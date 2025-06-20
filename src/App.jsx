
import './App.css';
import Navbar   from './pages/NavBar';
import NotFound from './pages/notFound';
import AboutUs from './pages/AboutUs';
import Game from './pages/Game';
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';


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
                path: "/About",
                element: <AboutUs />
            },
            {
                path: "/418",
                element: <NotFound/>
            }, {
                path: "/",
                element: <Game/>
            }
        ]
    }
])





function App() {
  
 const clickCount = useSelector(state => state.save_game.clickCount);

  return (

      <div>
          <RouterProvider router={router}/>
           
    
    <div>
      <p>Clicks: {clickCount}</p>

    </div>
        
    </div>
  );
}

export default App;