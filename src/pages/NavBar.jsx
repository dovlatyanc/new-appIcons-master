import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/About">About us</Link>
          </li>
          <li>
            <Link to="/418">I'm teapot</Link>
          </li>
           <li>
            <Link to="/">Игра Бирюльки</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
