import React, { useState } from "react";

import "./App.css";
import "./pickup.css";
import Pickup from './pickup';
import axios from 'axios';


function ShippingCalculator() {
	const [shipmentType, setShipmentType] = useState("Document");
	const [pickupPincode, setPickupPincode] = useState("");
	const [dropPincode, setDropPincode] = useState("");
	const [weight, setWeight] = useState("");
	const [weightUnit, setWeightUnit] = useState("G");

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

	const handleButtonClick = (button) => {
		if (button === "domestic" || button === "international") {
			setSelectedButton(button);
			setCourierType(button);
			setIsBookingVisible(false);
			setResult('');

		}
		else if (button === "Indian Post" || button === "d2d") {
			setSelectedPosrD2dButton(button);
			setPosrOrD2d(button);
			setIsBookingVisible(false);
			setResult('');
		}
	};




	const handleCalculate = () => {
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
			const requestData = {
				pickupPincode: pickupPincode,
				destiantionPincode: dropPincode,
				weight: newWeight,
			};
			const getPrice = async () => {
				try {
					const response = await axios.post('http://courierbotenodeserver-env.eba-ksi4mky6.us-east-1.elasticbeanstalk.com/api/landing/indianpostrate', requestData,

					);
					console.log(response.data.data.CourierBotePrice);
					setResult(response.data.data.CourierBotePrice);
					setIsBookingVisible(true);
					setButtonLoading(false);
				}
				catch (error) {
					console.error('Error fetching data from Indian post:', error);
				}
			}
			getPrice();
		}
		else if (selectedPosrD2dButton === 'd2d') {
			console.log('Door to door')
			const requestData = {
				pickupPincode: pickupPincode,
				destiantionPincode: dropPincode,
			};
			const getPrice = async () => {
				try {
					const response = await axios.post('http://courierbotenodeserver-env.eba-ksi4mky6.us-east-1.elasticbeanstalk.com/api/landing/doortodoorrate', requestData,

					);
					console.log(response.data.result.TotalPrice);
					setResult(response.data.result.TotalPrice);
					setIsBookingVisible(true);
				}
				catch (error) {
					console.error('Error fetching data from Indian post:', error);
				}
			}
			getPrice();
		}

		// const calculatedResult = `Calculated result: ${shipmentType}, ${pickupPincode}, ${dropPincode}, ${weight}, ${newWeight}`;
		// console.log(calculatedResult)
		// setResult(250);


	};

	const handlePickup = () => {
		setIsInitialCard(false);
		setIsPickupCard(true);
		setBigShippingCalculator('Big');
	}
	const changeToInitialCard = () => {
		setIsInitialCard(true);
		setBigShippingCalculator('Small');
		setIsPickupCard(false);
		setPickupPincode('');
		setDropPincode('');
		setWeight('');
		setIsBookingVisible(true);
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
									<button type='button' onClick={() => handleButtonClick("Indian Post")} className={selectedPosrD2dButton === 'Indian Post' ? 'btn btn-new active' : 'btn btn-new'} >
										Indian Post
									</button>
									<button type='button' onClick={() => handleButtonClick("d2d")} className={selectedPosrD2dButton === 'd2d' ? 'btn btn-new active' : 'btn btn-new'}>
										Door To Door
									</button>
								</div>
								{postOrD2d === "Indian Post" && <div className="post">
									<div className='field'>
										<div className='control'>
											<div style={{ display: 'grid' }}>
												<label className='label'>Delivery Pincode:</label>
												<input
													className='input'
													type='text'
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
													type='text'
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



									<button
										id='calculate-button'
										className='btn btn-primary'
										onClick={handleCalculate}>
										{!buttonLoading ? 'Calculate' : 'loading...'}
									</button>

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
													type='text'
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
													type='text'
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
													id='product_description'
													placeholder='Product description'
													value={description}
													onChange={(e) => setdescription(e.target.value)}
												/>
											</div>
										</div>
									</div>

									<button
										id='calculate-button'
										className='btn btn-primary'
										onClick={handleCalculate}>
										Calculate
									</button>
									{isBookingVisible && (<div>
										<div className='price' id='result'>
											<div>Rate=₹</div>{result}
											</div>
										<button
											id='pickup-button'
											className='btn btn-primary'
											onClick={handlePickup}>Book a Pickup</button>
									</div>)}
								</div>}


							</div>}
						{courierType === "international" && <div className="international section">Coming Soon</div>}
					</div>)}
					{isPickupCard && (<Pickup pickupPin={pickupPincode} deliveryPin={dropPincode} deliverypart={postOrD2d} rate={result}  initialCard={changeToInitialCard} />
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
