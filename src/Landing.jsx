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
					<div className="landing-page text" style={{ display: 'flex' }}>
						<span style={{ display: 'grid', fontSize: '40px' }}>
							<h2 style={{ margin: '10px' }}>
							Serving   
							</h2>
							<h2 style={{ display: 'inline', margin: '10px' }}>
							with  Care 
							</h2>
							<h2 style={{ margin: '10px' }}>
							Always
							</h2>
							<p style={{ color: 'grey' }}>Express Transit</p>
							< img src={courierBoteWhiteText} alt="logo" className="courierbotelogo" />
							<img src={logistics} alt="new" className="logisticslogo" />
						</span>

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
