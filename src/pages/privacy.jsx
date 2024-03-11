import React from 'react'
import './privacyStyles.css'
import { Header } from "../components/header/Header";
import { Footer } from '../components/footer/Footer';
import PrivacyPolicy from '../components/dashboard/privacyPolicy';
export default function Privacy() {
    return (

        <div className='privacy'>
            <Header />
            <div className='privacy-policy'>

                <PrivacyPolicy />

            </div>
            <Footer />
        </div>
    )
}
