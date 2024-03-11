// import React from "react";
import ShippingCalculator from "./Card";
import { useLocation } from 'react-router-dom';
import "./Landing.css";
import "./App.css";
import "./index.css";
import { Header } from "./components/header/Header";
import courierBoteWhiteText from './assets/courierbote logo white transparent.png';
import logistics from './assets/logistics.png';
import InitialLanding from './pages/initialLanding'
import { Working } from './components/howDoesCourierboteWork/HowDoesCourierboteWork';
import { People } from "./components/dearPeople/DearPeople";
// import { BestRecipes } from "./components/ourBestRecipes/BestRecipes";
import { WorkFor } from './components/whoWeWorkFor/WhoWeWorkFor';
import { Results } from './components/results/results';
import { Footer } from './components/footer/Footer';
import { Review } from './components/review/Review';
import {Contact} from './components/contact/Contact';
import TermsAndConditions from './pages/termsAndCondition';
import React, { useRef, useEffect } from 'react';

function LandingPage({ Active }) {
	const scrollToWorkForElementRef = useRef(null);
	const scrollToHowWeWorkElementRef = useRef(null);

	const location = useLocation(); // Get the current location

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const target = params.get('scrollTo');

		if (target) {
			// Scroll to the specified section
			scrollToElement(target);
		}
	}, [location.search]);
	const scrollToElement = (target) => {
		console.log("target", target)

		switch (target) {
			case 'scrollToWorkForElementRef':
				if (scrollToWorkForElementRef.current) {
					scrollToWorkForElementRef.current.scrollIntoView({ behavior: 'smooth' });
				}
				break;
			case 'scrollToHowWeWorkElementRef':
				if (scrollToHowWeWorkElementRef.current) {
					scrollToHowWeWorkElementRef.current.scrollIntoView({ behavior: 'smooth' });
				}
				break;
		}


	};
	return (
		<div className='landing-page'  >
			<Header scrollToElement={scrollToElement} />
			<main>
				{Active === 'normalLanding' && <div>
					<div className="landing-page-start">
						<span className="landing-page-Text" >
							<div className="landing-page-heading">
								<h2 >
									Moving Customers
								</h2>
								<h2 >
									with Care
								</h2>
							</div>
							<p style={{ color: 'grey' }}>We unite people with affordable shipping. <br />With a click, we deliver your essentials <br /> to your doorstep, wherever you are.</p>
						</span>

						<ShippingCalculator />
					</div>
					<Results />
					<People />
					<WorkFor scrollToElementRef={scrollToWorkForElementRef} />
					<Working scrollToElementRef={scrollToHowWeWorkElementRef} />
					<Review />
					<Contact/>
					</div>}

				<Footer />

			</main>
		</div>
	);
}

export default LandingPage;
