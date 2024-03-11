import React, { useState } from "react";

import "./App.css";
import "./pickup.css";
import Pickup from './pickup';
import axios from 'axios';
import { BrowserRouter as Routes, Route, Link, useNavigate } from 'react-router-dom';


function ShippingCalculator() {
	const [shipmentType, setShipmentType] = useState("Document");
	const [pickupPincode, setPickupPincode] = useState("");
	const [dropPincode, setDropPincode] = useState("");
	const [weight, setWeight] = useState("");
	const [weightUnit, setWeightUnit] = useState("gm");
	const [error, setError] = useState("");
	const [description, setdescription] = useState("");
	const [isBookingVisible, setIsBookingVisible] = useState(false);
	const [isInitialCard, setIsInitialCard] = useState(true);
	const [isPickupCard, setIsPickupCard] = useState(false);
	const [bigShippingCalculator, setBigShippingCalculator] = useState('Small');
	const [result, setResult] = useState("");
	const [courierType, setCourierType] = useState("domestic")
	const [postOrD2d, setPosrOrD2d] = useState("Indian Post")
	const [selectedButton, setSelectedButton] = useState('domestic');
	const [selectedPosrD2dButton, setSelectedPosrD2dButton] = useState('Indian Post');
	const [buttonLoading, setButtonLoading] = useState(false);

	const navigate = useNavigate();
	const handleButtonClick = (button) => {
		if (button === "domestic" || button === "international") {
			setSelectedButton(button);
			setCourierType(button);
			setIsBookingVisible(false);
			setResult('');
			setError('');
		}
		else if (button === "Indian Post" || button === "d2d") {
			setSelectedPosrD2dButton(button);
			setPosrOrD2d(button);
			setIsBookingVisible(false);
			setResult('');
			setError('');
		}
	};




	const handleCalculate = () => {

		// console.log('button clicked')
		// console.log('true inputs');
		setButtonLoading(true);
		// Perform calculation logic here
		let newWeight = 0;
		if (weightUnit === "kg") {
			newWeight = weight * 1000;
		}
		else {
			newWeight = weight;

		}
		if (selectedPosrD2dButton === 'Indian Post') {
			const validateInputs = () => {
				if (!pickupPincode || !dropPincode || !weight || !shipmentType) {
					setError("Please fill in all required fields");
					setButtonLoading(false);
					return false;
				}
				else if (weightUnit == 'gm' && weight < 50) {
					setError("Min weight should be 50 grams");
					setButtonLoading(false);
					return false;

				}
				else if (pickupPincode === dropPincode) {
					setError('Pickup Pincode cannot be same as Drop Pincode')
					setButtonLoading(false);
					return false;
				}
				return true;
			};
			if (validateInputs() === true) {
				const requestData = {
					pickupPincode: pickupPincode,
					destiantionPincode: dropPincode,
					weight: newWeight,
				};
				const getPrice = async () => {
					try {

						const response = await axios.post('https://backend.courierbote.com/api/landing/indianpostrate', requestData,

						);
						console.log(response.data.data.CourierBotePrice);
						setResult(response.data.data.CourierBotePrice);

						setIsInitialCard(false);
						setIsPickupCard(true);
						setBigShippingCalculator('Big');
						setIsBookingVisible(false);
						setButtonLoading(false);
						const url = `/book-a-pickup?pickupPin=${pickupPincode}&deliveryPin=${dropPincode}&deliverypart=${postOrD2d}&rate=${response.data.data.CourierBotePrice}`;
						navigate(url);
					}
					catch (error) {
						setError("Error Fetching Data");
						console.error('Error fetching data from Indian post:', error);
					}
				}
				getPrice();
			}
		}
		else if (selectedPosrD2dButton === 'd2d') {


			console.log('Door to door')
			const validateInputs = () => {
				if (!pickupPincode || !dropPincode) {
					setError("Please fill in all required fields.");
					setButtonLoading(false);
					return false;
				}
				return true;
			};
			if (validateInputs() === true) {
				const requestData = {
					pickupPincode: pickupPincode,
					destiantionPincode: dropPincode,
				};
				const getPrice = async () => {
					try {
						const response = await axios.post('https://backend.courierbote.com/api/landing/doortodoorrate', requestData,

						);
						console.log(response.data.result.TotalPrice);
						setResult(response.data.result.TotalPrice);
						setButtonLoading(false);
						const url = `/book-a-pickup?pickupPin=${pickupPincode}&deliveryPin=${dropPincode}&deliverypart=${postOrD2d}&rate=${response.data.result.TotalPrice}`;
						navigate(url);
					}
					catch (error) {
						setError("Error Fetching Data");
						console.error('Error fetching data from Indian post:', error);
					}
				}
				getPrice();


				// const calculatedResult = `Calculated result: ${shipmentType}, ${pickupPincode}, ${dropPincode}, ${weight}, ${newWeight}`;
				// console.log(calculatedResult)
				// setResult(250);
			}
		}
	};

	const handlePickup = () => {
		setIsInitialCard(false);
		setIsPickupCard(true);
		setBigShippingCalculator('Big');
		setIsBookingVisible(false);
	}
	const changeToInitialCard = () => {
		setIsInitialCard(true);
		setBigShippingCalculator('Small');
		setIsPickupCard(false);
		setPickupPincode('');
		setDropPincode('');
		setWeight('');
		setIsBookingVisible(false);
		setResult('');
	}

	return (
		<div className={bigShippingCalculator === 'Small' ? 'shipping-calculator' : 'shipping-calculator big'} >
			<div className='card'>
				{/* <img  src="https://drive.google.com/uc?export=view&id=1t7ml6UBAwGtRGlpXyNCvzZ7X53BrNYEP" alt="background logo" className="card-background-img"/> */}
				<div className='card-content'>
					{isInitialCard && (<div className="initial-card">
						<div className='btn-group' role='group' aria-label='Basic example'>
							<button type='button' onClick={() => handleButtonClick("domestic")} className={selectedButton === 'domestic' ? 'btn btn-option active domestic' : 'btn btn-option domestic '}>
								Domestic
							</button>
							<button type='button' onClick={() => handleButtonClick("international")} className={selectedButton === 'international' ? 'btn btn-option active international' : 'btn btn-option international'}>
								International
							</button>
						</div>
						{courierType === "domestic" &&
							<div className="domestic">
								<div className='btn-group' role='group' aria-label='Basic example'>
									<button type='button' onClick={() => { handleButtonClick("Indian Post"); setButtonLoading(false); }} className={selectedPosrD2dButton === 'Indian Post' ? 'btn btn-new active' : 'btn btn-new'} >
										Residencial
									</button>
									<button type='button' onClick={() => { handleButtonClick("d2d"); setButtonLoading(false); }} className={selectedPosrD2dButton === 'd2d' ? 'btn btn-new active' : 'btn btn-new'}>
										Pick and Drop
									</button>
								</div>
								{postOrD2d === "Indian Post" && <div className="post">
									<div className='field'>
										<div className='control'>
											<div style={{ display: 'grid' }}>
												<label className='label'>Pickup Pincode:</label>
												<input
													className='input'
													maxLength="6"
													type='text'
													id='pickup-pincode'
													placeholder='Pickup Pincode'
													inputMode="numeric"
													pattern="[0-9]*"
													value={pickupPincode}
													onChange={(e) => setPickupPincode(e.target.value)}
												/>
											</div>
											<div style={{ display: 'grid' }}>
												<label className='label'>Delivery Pincode:</label>
												<input

													className='input'
													maxLength="6"
													pattern="[0-9]*"
													type='text'
													inputMode="numeric"
													id='drop-pincode'
													placeholder='Drop Pincode'
													value={dropPincode}
													onChange={(e) => setDropPincode(e.target.value)}
												/>
											</div>
										</div>
									</div>

									<div className='field'>
										<div className='control' style={{ display: 'grid' }}>
											<label className='label'>Weight:</label>
											<div className='select'>

												<div>

													<input
														className='input'
														type='number'
														id='weight'

														placeholder='Weight'
														value={weight}
														onChange={(e) => setWeight(e.target.value)}
													/>
													<select
														id='weight-unit'
														value={weightUnit}
														onChange={(e) => setWeightUnit(e.target.value)}>
														<option>gm</option>
														<option>kg</option>
													</select>
												</div>
											</div>
										</div>
									</div>

									<div className='item-ty'>
										<div className='item-pe'>
											<label className='radio'>
												<input
													type='radio'
													name='shipment-type'
													value='Document'
													checked={shipmentType === "Document"}
													onChange={() => setShipmentType("Document")}
												/>
												Document
											</label>
											<label className='radio'>
												<input
													type='radio'
													name='shipment-type'
													value='Parcel'
													checked={shipmentType === "Parcel"}
													onChange={() => setShipmentType("Parcel")}
												/>
												Parcel
											</label>
										</div>
									</div>


									<div className="button-classs">
										{error && (
											<div className="error-text-container">
												<p className="error-text">{error}</p>
											</div>
										)}
										<button
											id='calculate-button'
											className='btn btn-primary'
											disabled={buttonLoading}
											onClick={handleCalculate}
											style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}
										>
											{!buttonLoading ? 'Calculate' : 'loading...'}
										</button>
									</div>
									{isBookingVisible && (<div>
										<div className='price' id='result'>
											<div>Rate=₹</div>{result}
										</div>
										<button
											id='pickup-button'
											className='btn btn-primary'
											onClick={handlePickup}>Book a Pickup</button>
									</div>)}
								</div>
								}
								{postOrD2d === "d2d" && <div>
									<div className='field'>
										<div className='control'>
											<div style={{ display: 'grid' }}>
												<label className='label'>Pickup Pincode:</label>
												<input
													className='input'
													maxLength="6"
													pattern="[0-9]*"
													type='text'
													inputMode="numeric"
													id='pickup-pincode'
													placeholder='Pickup Pincode'
													value={pickupPincode}
													onChange={(e) => setPickupPincode(e.target.value)}
												/>
											</div>
											<div style={{ display: 'grid' }}>
												<label className='label'>Delivery Pincode:</label>
												<input
													className='input'
													maxLength="6"
													pattern="[0-9]*"
													type='text'
													inputMode="numeric"
													id='drop-pincode'
													placeholder='Drop Pincode'
													value={dropPincode}
													onChange={(e) => setDropPincode(e.target.value)}
												/>
											</div>
											<div style={{ display: 'grid' }}>
												<label className='label'>Product Description:</label>
												<input
													className='input'
													type='text'
													id='drop-pincode'
													placeholder='Product Description'
													value={description}
													onChange={(e) => setdescription(e.target.value)}
												/>
											</div>
										</div>
									</div>
									<div className="button-classs">
										{error && (
											<div className="error-text-container">
												<p className="error-text">{error}</p>
											</div>
										)}
									<button
										id='calculate-button'
										className='btn btn-primary'
										disabled={buttonLoading}
										onClick={handleCalculate}
										style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}
									>
										{!buttonLoading ? 'Calculate' : 'loading...'}
									</button>
									</div>
								</div>}


							</div>}
						{courierType === "international" && <div className="international section">Coming Soon</div>}
					</div>)}
					{isPickupCard && (<Pickup pickupPin={pickupPincode} deliveryPin={dropPincode} deliverypart={postOrD2d} rate={result} initialCard={changeToInitialCard} />
					)}
					{isPickupCard && (<button className="card-minimize-btn" onClick=
						{() => { setIsPickupCard(false); setBigShippingCalculator('Small'); setIsInitialCard(true) }}></button>
					)}

				</div>


			</div>

		</div>
	);
}

export default ShippingCalculator;
