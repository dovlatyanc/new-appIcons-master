import { Link } from "react-router-dom"
import LanguageSwitcher from  "../Components/LanguageSwitcher"
import { useTranslation } from 'react-i18next';

export default function Navbar() {
   const { t } = useTranslation();
  return (
    <>
         <div>  
          <LanguageSwitcher />
          </div>
      <nav>
   
        <ul>
           <li>
            <Link to="/">{t('home')}</Link> 
          </li>
          <li>
            <Link to="/About">{t('about')}</Link> 
          </li>
          <li>
            <Link to="/418">{t('418')}</Link>
          </li>
           <li>
            <Link to="/game">{t('games')}</Link>
          </li>
            <li>
            <Link to="/2048">{t('game_2048')}</Link>
          </li>
            <li>
            <Link to="/tictactoe">{t('tictactoe')}</Link>
          </li>
          
        </ul>
      </nav>
    </>
  )
}
