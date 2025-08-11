import { Link } from "react-router-dom"
import LanguageSwitcher from  "../Components/LanguageSwitcher"

export default function Navbar() {
  return (
    <>
         <div>  
          <LanguageSwitcher />
          </div>
      <nav>
   
        <ul>
           <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About us</Link>
          </li>
          <li>
            <Link to="/418">I'm teapot</Link>
          </li>
           <li>
            <Link to="/game">Игра Бирюльки</Link>
          </li>
            <li>
            <Link to="/2048">Игра 2048</Link>
          </li>
            <li>
            <Link to="/tictactoe">Игра Крестики-Нолики</Link>
          </li>
          
        </ul>
      </nav>
    </>
  )
}
