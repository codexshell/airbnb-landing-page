import logo from '../../assets/logo.svg';
import './index.css';

export function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="airbnb logo" />
    </header>
  );
}
