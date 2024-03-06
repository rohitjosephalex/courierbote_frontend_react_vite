// import React from "react";
import ShippingCalculator from "./Card";
import "./Landing.css";
import "./App.css";
import "./index.css";
import { Header } from "./components/header/Header";
import courierBoteWhiteText from './assets/courierbote logo white transparent.png';
import logistics from './assets/logistics.png';

import {Working} from './components/howDoesCourierboteWork/HowDoesCourierboteWork';
import { People } from "./components/dearPeople/DearPeople";
// import { BestRecipes } from "./components/ourBestRecipes/BestRecipes";
import {WorkFor} from './components/whoWeWorkFor/WhoWeWorkFor';
import {Results} from './components/results/results';
import {Footer} from './components/footer/Footer';
import {Review} from './components/review/Review'
function LandingPage() {
	return (
		<div className='landing-page'  >
			<Header />

			<main>

				<div className="landing-page-start">
					
					<span className="landing-page-Text" >
						<h2 >
							Serving
						</h2>
						<h2 >
							with  Care
						</h2>
						<h2 >
							Always
						</h2>
						<p style={{ color: 'grey' }}>Express Transit</p>
					</span>

					< img src={courierBoteWhiteText} alt="logo" className="courierbotelogo" />
					<img src={logistics} alt="new" className="logisticslogo" />
					<h3 className="courierbote" >CourierBote</h3>
					<ShippingCalculator />
				</div>
				<Results/>\
				<People/>
				<WorkFor/>
				{/* <BestRecipes/> */}
				<Working/>
				<Review/>
				<Footer/>
				
			</main>
			<footer></footer>
		</div>
	);
}

export default LandingPage;
