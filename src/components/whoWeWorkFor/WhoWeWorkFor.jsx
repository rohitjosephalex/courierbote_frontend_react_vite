import './style.css'

import business from '../../../src/assets/smallBusiness.png';
import individuals from '../../../src/assets/indi.png';
import onlineSellers from '../../../src/assets/shopingcart.png';
import resellers from '../../../src/assets/reseller.png';

export const WorkFor = ({ scrollToElementRef }) => {
    return (
        <div className="working-for" ref={scrollToElementRef}>
            <div>
                <h1 className=' heading'>Who We Work For</h1>

                <div className=' heading-answer'>At our courier company, we serve a wide range of clients, catering to diverse shipping needs regardless of your industry or scale of operations</div>
            </div>
            <div className='customer-type'>
                <div className='customer'>
                    <img src={business} alt="" />
                    <h3>Small, Medium, Large Scale Business</h3>
                    <p>Simplify your shipping requirements with our specialized corporate solutions.</p>
                </div>
                <div className='customer'>
                    <img src={individuals} alt="" />
                    <h3>Individuals</h3>
                    <p>Whether it's courier services or door-to-door delivery for your essentials, count on us for comprehensive coverage</p>
                </div>
                <div className='customer'>
                    <img src={onlineSellers} alt="" />
                    <h3>Online Sellers</h3>
                    <p>Experience hassle-free shipping with our dedicated service tailored just for you.</p>
                </div>
                <div className='customer'>
                    <img src={resellers} alt="" />
                    <h3>Resellers</h3>
                    <p>Easily ship your products anytime, anywhere with our seamless service.</p>
                </div>
            </div>
        </div>
    )
}