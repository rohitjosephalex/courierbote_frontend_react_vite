import React from 'react'

import './bookAPickup.css'

import { Header } from "../components/header/Header";
import { Footer } from '../components/footer/Footer';
import Pickup from '../pickup';
export default function BookAPickup() {
    return (
        <div>
            <Header />
            <div className='book-a-pickup'>
            <Pickup  />
            </div>
            <Footer />

        </div>
    )
}
