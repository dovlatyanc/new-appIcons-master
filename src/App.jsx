
import './App.css';
import Navbar   from './pages/NavBar';
import NotFound from './pages/notFound';
import AboutUs from './pages/AboutUs';
import Game from './pages/Game';
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"
import { Outlet } from "react-router-dom"


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
  


  return (

      <div>
          <RouterProvider router={router}/>
        
    </div>
  );
}

export default App;