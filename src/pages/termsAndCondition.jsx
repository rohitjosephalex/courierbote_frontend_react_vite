import React from 'react';

import './privacyStyles.css';

import { Header } from "../components/header/Header";
import { Footer } from '../components/footer/Footer';
import  TermsAndCondition  from '../components/dashboard/termsAndCondition';
export default function TermsAndConditions() {
  return (
    <div>
        <div className='tNc'>
            <h3>Terms and Conditions</h3>
        <TermsAndCondition/>
        </div>
    </div>
  )
}
