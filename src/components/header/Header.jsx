import "./header.css";
import "./ResponsiveHeader.css";
import Modal from "react-modal";
import { useState } from "react";

import { BrowserRouter as Routes, Route, Link, useNavigate } from 'react-router-dom';

import courierBoteWhiteText from '../../assets/courierbote logo white transparent.png';
import courierBoteSmallLogo from '../../assets/favicon.png';


export const Header = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToServices = (target) => {
    // const target = "WorkFor";
    navigate(`/?scrollTo=${target}`);
    props.scrollToElement(target);
  };



  return (
    <header className="landing-header">
      <div className="wraper">
        <div className="logo">
        <a href="/">
          <img src={courierBoteWhiteText} alt="logo" className="courierbotelogos" />
          <img src={courierBoteSmallLogo} alt="logo" className="courierbotelogo-small" />
          </a>
        </div>
        <nav>
          <ul className="pc-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a onClick={() => scrollToServices('scrollToHowWeWorkElementRef')}>How it Works</a>
            </li>
            <li>
              <a onClick={() => scrollToServices('scrollToWorkForElementRef')} style={{ cursor: 'pointer' }}>Our Services</a>
            </li>
            <li>
              <a href="/corporate/signin">Corporate</a>
            </li>
          </ul>
          <div className="hamburger-menu">
            <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {isOpen && (
              <ul className="menu-items">
                <li><a href="/">Home</a></li>
                <li> <a onClick={() => scrollToServices('scrollToHowWeWorkElementRef')}>How it Works</a></li>
                <li><a onClick={() => scrollToServices('scrollToWorkForElementRef')} style={{ cursor: 'pointer' }}>Our Services</a></li>
                <li> <a href="/corporate/signin">Corporate</a></li>
              </ul>
            )}
          </div>
        </nav>

      </div>
    </header>
  );
};
