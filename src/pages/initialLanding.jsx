import React from 'react'
import './initialLanding.css'
import ShippingCalculator from "../Card";
import truck from '../assets/landingTruck.svg'
import scooterDelivery from '../assets/deliveryboy.svg'

export default function InitialLanding() {
    return (
        <div className='initial-landing'>
            <div className='initial-landing-heading'>
                {/* <h3>Moving Customers with Care</h3>
                <h6>We aim to bring people together by providing economical shipping services. With just a click, we can transport your necessities to your doorstep, regardless of your location
                </h6> */}
            </div>
            {/* < img src={scooterDelivery} alt="logo" className="trucklogo" /> */}
            <ShippingCalculator />
        </div>
    )
}
