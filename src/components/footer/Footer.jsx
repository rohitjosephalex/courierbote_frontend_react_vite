import './Footer.css';
import './ResponsiveFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="leftContent">
                    <div className='address'>
                        <div className='address'>
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>
                                    Sowdambikal Nagar, Sivandhapuram <br /> Saravanampatty P.O, Coimbatore 641035
                                </span>
                            </p>
                        </div>

                    </div>
                    <div className='phone'>
                        <div className='enquirynumber'>
                            <p className='numbers'> <FontAwesomeIcon icon={faPhone} /> Enquiry : <a href="tel:+919994195253">+91-99941&nbsp;95253</a></p>
                        </div>
                        <div className='supportnumber'>
                            <p className='numbers'><FontAwesomeIcon icon={faPhone} /> Support : <a href="tel:+919626834622">+91-96268&nbsp;34622</a></p>
                        </div>
                        <div className='supportnumber'>
                            <p className='numbers'><FontAwesomeIcon icon={faPhone} /> Help Line : <a href="tel:+918675096803">+91-86750&nbsp;96803</a></p>
                        </div>
                    </div>
                    <div className='email'>
                        <p className='numbers'><FontAwesomeIcon icon={faEnvelope} /> Email : <a href="mailto:courierbote@gmail.com">courierbote@gmail.com</a></p>
                    </div>
                </div>

                <div className="rigthContent">
                    <p><a href='./privacy-policy'>Privacy Policy</a></p>
                    <p><a href='./terms-and-condition'>Terms and Conditions</a></p>
                    <p><a href='./'>Contact</a></p>
                </div>
            </div>
        </footer>
    )
}
