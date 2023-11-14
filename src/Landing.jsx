// import React from "react";
import App from "./App";
import "./Landing.css";
import "./App.css";
import "./index.css";
import postBox from './assets/background postbox.jpg';
import courierBoteWhiteText from './assets/courierbote logo white transparent.png';
import logistics from './assets/logistics.png';

function LandingPage() {
	return (
		<div className='landing-page  '  >
			<header></header>

			<main>
				<div className='background-pic'>
					<div className="background-black">{/* This is an empty div */}</div>
					<img src={postBox} alt="background logo" className="backgroundlogo" />

				</div>
				<div className="vertical-line" ></div>

				<div className="landing_style" >
					<div className="landing-page text">
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
					</div>

					<div>
						<h3 className="courierbote" >CourierBote</h3>

						<App />
					</div>
				</div>

			</main>
			<footer></footer>
		</div>
	);
}

export default LandingPage;
