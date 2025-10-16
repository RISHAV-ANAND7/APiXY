import { makeStyles } from '@mui/styles';
import Logo from '../assets/Logo.png';

import './header.css';

const useStyle = makeStyles({
  logo: {
    width:140
  }
})

const Header = () => {
  const classes = useStyle();

  return (
    <div className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <img src={Logo} alt="logo" className={classes.logo} />
        </div>
        <div className="nav-title">Hey Whatsapp...</div>
      </div>
    </div>
  );
};

export default Header