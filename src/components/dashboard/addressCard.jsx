// import React from "react";
import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import sizeOfPacking from '../../assets/Size_Packing.jpg';
import securityOfPacking from '../../assets/Security_Items.jpg';
import softPacking from '../../assets/Soft_Packing.jpg';
import qualityPacking from '../../assets/Quality_packing.jpg';
import TermsAndCondition from "./termsAndCondition";
import RestrictedItems from "./restrictedItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function AddressCard() {
    const [cardName, setCardName] = useState("Initial");

    // Pickup Address
    const [pickupName, setPickupName] = useState("");
    const [pickupAddr1, setPickupAddr1] = useState("");
    const [pickupAddr2, setPickupAddr2] = useState("");
    const [pickupPhoneNumber, setPickupPhoneNumber] = useState("");
    const [pickupEmail, setPickupEmail] = useState("");
    const [pickupCity, setPickupCity] = useState("");
    const [pickupPincode, setPickupPincode] = useState("");
    const [pickupState, setPickupState] = useState("");

    // Delivery Address
    const [deliveryName, setDeliveryName] = useState("");
    const [deliveryAddrL1, setDeliveryAddrL1] = useState("");
    const [deliveryAddrL2, setDeliveryAddrL2] = useState("");
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliveryPincode, setDeliveryPincode] = useState("");
    const [deliveryState, setDeliveryState] = useState("");
    const [shipmentType, setShipmentType] = useState("By Air");

    // Product Dimensions
    const [wholeWeight, setWholeWeight] = useState("");
    const [perBoxWeight, setPerBoxWeight] = useState("");
    const [noOfBox, setNoOfBox] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");

    // About the Item
    const [isPackingNeeded, setIsPackingNeeded] = useState(false);
    const [itemDescription, setItemDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [otherCategoryInput, setOtherCategoryInput] = useState("");
    const [itemValue, setItemValue] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [isCheckedShipping, setCheckedShipping] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    // Other States
    const [buttonLoading, setButtonLoading] = useState(false);
    const [courierAmount, setCourierAmount] = useState('');
    const [pickUpAmount, setPickUpAmount] = useState('');
    const [courierBoteAmount, setCourierBoteAmount] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [error, setError] = useState("");
    const localPincode = [641001, 641002, 641003, 641004, 641005, 641006, 641007, 641008, 641009, 641010, 641011, 641012, 641013, 641014, 641015, 641016, 641017, 641018, 641021, 641022, 641023, 641024, 641025, 641026, 641027, 641028, 641029, 641030, 641031, 641033, 641034, 641035, 641036, 641037, 641038, 641041, 641042, 641043, 641044, 641045, 641046, 641048, 641049, 641103, 641105, 641108, 642128]

    const handleConfirm = () => {
        setOrderConfirmation(true)
    }
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };
    const handleCheckboxShippingChange = () => {
        setCheckedShipping(!isCheckedShipping);
    };


    const handleTextClick = () => {

        setModalOpen(true);

    };

    const closeModal = () => {
        // Close the modal
        setModalOpen(false);
    };
    // Function to handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Function to handle calculate button click
    const handleCalculate = async () => {
        try {
            let isTimedOut = false;
    
            // Set a timeout to stop loading after 20 seconds
            const timeoutId = setTimeout(() => {
                isTimedOut = true;
                setButtonLoading(false);
                alert('Request timed out. Please try again.');
            }, 20000);
    
            if (!isCheckedShipping) {
                setError("Please read what items can be Shipped");
                setButtonLoading(false);
            } else if (!localPincode.includes(parseInt(pickupPincode))) {
                setError("Sorry Service at this pincode is currently unavailable");
                setButtonLoading(false);
            } else {
                setButtonLoading(true);
                setError("");
                const apiToken = sessionStorage.getItem('api_token');
                let unifiedperBoxWeight = perBoxWeight;
                let unifiedTotalWeight = wholeWeight;
                if (weightUnit === 'gm') {
                    unifiedperBoxWeight = perBoxWeight / 1000;
                    unifiedTotalWeight = wholeWeight / 1000;
                }
                if (shipmentType === 'By Air') {
                    const requestData = {
                        pickupPincode: pickupPincode,
                        destiantionPincode: deliveryPincode,
                        totalWeight: unifiedTotalWeight,
                        perBoxWeight: unifiedperBoxWeight,
                        noOfBOx: noOfBox
                    };
                    const response = await axios.post('https://backend.courierbote.com/api/corporatedashboard/byairrate', requestData, {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    });
                    console.log(response.data);
                    if (!isTimedOut) {
                        clearTimeout(timeoutId); // Clear the timeout if response is received before timeout
                        if (response.data.status === 200) {
                            setCourierAmount(response.data.data.courierCharge);
                            setCourierBoteAmount(response.data.data.CourierBotePrice);
                            setPickUpAmount(response.data.data.pickupCharge);
                            setTotalAmount(response.data.data.totalCharge);
                            setButtonLoading(false);
                            setCardName("summary");
                        }
                    }
                } else if (shipmentType === 'By surface') {
                    if (!isTimedOut) {
                        clearTimeout(timeoutId); // Clear the timeout if response is received before timeout
                        const requestData = {
                            pickupPincode: pickupPincode,
                            destiantionPincode: deliveryPincode,
                            totalWeight: unifiedTotalWeight,
                            perBoxWeight: unifiedperBoxWeight,
                            noOfBOx: noOfBox
                        };
                        const response = await axios.post('https://backend.courierbote.com/api/corporatedashboard/byroadrate', requestData, {
                            headers: {
                                Authorization: `Bearer ${apiToken}`,
                            },
                        });
                        console.log(response.data);
                        if (response.data.status === 200) {
                            setCourierAmount(response.data.data.courierCharge);
                            setCourierBoteAmount(response.data.data.courierCharge.CourierBotePrice);
                            setPickUpAmount(response.data.data.courierCharge.pickupCharge);
                            setTotalAmount(response.data.data.courierCharge.totalCharge);
                            setButtonLoading(false);
                            setCardName("summary");
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError("An error occurred. Please try again.");
            setButtonLoading(false);
        }
    };
    
    const handleProceed = () => {
        // Your logic for handling the calculate button click
        if (isChecked) {
            // Set buttonLoading to true during processing
            setButtonLoading(true);

                setButtonLoading(false);
                setCardName("billing")

        } else {
            // Handle the case when the checkbox is not checked
            setError('Please agree to the Terms and Conditions');
        }
    };
    const handlOk = () => {

    }

    return (
        <div className="dashboard-card">
            <div className="dashboard-details">
                {cardName === 'Initial' && (<div className='pickupbooking'>
                    <div className='inputfields'>
                        <div className="corporate-address">
                            <div className='Pickup-Adress-corporate'>
                                <h5>Pickup Address</h5>
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={pickupName}
                                    onChange={(e) => setPickupName(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='addrL1'
                                    placeholder='Address Line 1'
                                    value={pickupAddr1}
                                    onChange={(e) => setPickupAddr1(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='addrL2'
                                    placeholder='Address Line 2'
                                    value={pickupAddr2}
                                    onChange={(e) => setPickupAddr2(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='PhoneNumber'
                                    placeholder='Phone Number'
                                    value={pickupPhoneNumber}
                                    onChange={(e) => setPickupPhoneNumber(e.target.value)}
                                />
                                <div>
                                    <div className="Address-Elements">
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='text'
                                                id='Email'
                                                placeholder='Email'
                                                value={pickupEmail}
                                                onChange={(e) => setPickupEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='text'
                                                id='city'
                                                placeholder='City'
                                                value={pickupCity}
                                                onChange={(e) => setPickupCity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="Address-Elements">
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='number'
                                                id='pincode'
                                                placeholder='Pincode'
                                                value={pickupPincode}
                                                onChange={(e) => setPickupPincode(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='text'
                                                id='state'
                                                placeholder='State'
                                                value={pickupState}
                                                onChange={(e) => setPickupState(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='Delivery-Address-corporate'>
                                <h5>Delivery Address</h5>
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={deliveryName}
                                    onChange={(e) => setDeliveryName(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='addL1'
                                    placeholder='Address Line 1'
                                    value={deliveryAddrL1}
                                    onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='addL2'
                                    placeholder='Address Line 2'
                                    value={deliveryAddrL2}
                                    onChange={(e) => setDeliveryAddrL2(e.target.value)}
                                />
                                <input
                                    className='input corporate'
                                    type='text'
                                    id='phoneNumber'
                                    placeholder='Phone Number'
                                    value={deliveryPhoneNumber}
                                    onChange={(e) => setDeliveryPhoneNumber(e.target.value)}
                                />
                                <div className="cityStatePin">
                                    <div className="Address-Elements-sub">
                                        <input
                                            className='input corporate'
                                            type='text'
                                            id='city'
                                            placeholder='City'
                                            value={deliveryCity}
                                            onChange={(e) => setDeliveryCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="Address-Elements">
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='number'
                                                id='pincode'
                                                placeholder='Pincode'
                                                value={deliveryPincode}
                                                onChange={(e) => setDeliveryPincode(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements-sub">
                                            <input
                                                className='input corporate'
                                                type='text'
                                                id='state'
                                                placeholder='State'
                                                value={deliveryState}
                                                onChange={(e) => setDeliveryState(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shipping-type">
                            <div className="shipping-elements">
                                <label className='radio-corperate'>

                                    <Popup trigger=
                                        {<input
                                            type='radio'
                                            name='shipment-type'
                                            value='Document'
                                            onChange={() => setShipmentType("By Air")}
                                        />}
                                        modal nested>
                                        {
                                            close => (
                                                <div className='popup-container parcel-type' >
                                                    <div className='popup-container parcel-type-content'  >

                                                        <div>
                                                            <div className="question">
                                                                What is 'By Air'?
                                                            </div>
                                                            <p>
                                                                Speed Post is used for delivering parcels, especially for long-distance and international courier services, utilizing air transport. The use of air transport significantly reduces transit time, making Speed Post a fast and efficient service.
                                                            </p>
                                                            <div className="question">
                                                                How long will it take?
                                                            </div>
                                                            <p>
                                                                By air, delivery typically takes 2 to 3 working days within India, depending on the destination. However, delivery times may vary based on factors such as distance, weather conditions, and the efficiency of the local postal service.
                                                            </p>

                                                        </div>

                                                        <div>
                                                            <button className="btn btn-primary" onClick=
                                                                {() => { close(); }}>
                                                                close
                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>
                                            )
                                        }
                                    </Popup>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <label>By Air</label>
                                        <label className="button-sub-text" htmlFor="">(Speed Post)</label>
                                    </div>
                                </label>

                                <label className='radio-corperate'>

                                    <Popup trigger=
                                        {<input
                                            type='radio'
                                            name='shipment-type'
                                            value='Document'
                                            onChange={() => setShipmentType("By surface")}
                                        />}
                                        modal nested>
                                        {
                                            close => (
                                                <div className='popup-container parcel-type' >
                                                    <div className='popup-container parcel-type-content'  >
                                                        <div>
                                                            <div className="question">
                                                                What is 'By Surface'?
                                                            </div>
                                                            <p>
                                                                Business Parcel is a premium surface service to suit the requirements of business customers for an economical and reliable distribution solution.​ Features​​ Network. Business Parcel is available throughout the country.
                                                            </p>
                                                            <div className="question">
                                                                How long will it take?
                                                            </div>
                                                            <table>
                                                                <tr>
                                                                    <td>Local</td>
                                                                    <td>2 days</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Within State</td>
                                                                    <td>3 to 5 days</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>State to State</td>
                                                                    <td>4 to 6 days</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Rest of the country</td>
                                                                    <td>6 to 7 days</td>
                                                                </tr>
                                                            </table>
                                                            <div className="question">
                                                                Permisible Dimension and Weight
                                                            </div>
                                                            <p>
                                                                The maximum length should not surpass 150 centimeters in any single dimension, or 300 centimeters when considering the length and the largest circumference measured in a direction perpendicular to the length.                                                           </p>
                                                            <p>
                                                                Maximum weight per parcel shall not exceed 35kg
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-primary" onClick=
                                                                {() => { close(); }}>
                                                                close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Popup>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <label>By Surface</label>
                                        <label className="button-sub-text" htmlFor="">(Business Parcel)</label>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="productdetails-corporate">
                            <div className='product-weight-corporate'>
                                <h5>Parcel Details</h5>
                                <div className="product-weight-inputs">
                                <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='noOfBox'
                                            placeholder="No of Box's"
                                            value={noOfBox}
                                            onChange={(e) => setNoOfBox(e.target.value)}
                                        />
                                    </div>
                                <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='perBoxWeight'
                                            placeholder='Per Box Weight'
                                            value={perBoxWeight}
                                            onChange={(e) => setPerBoxWeight(e.target.value)}
                                        />
                                        <select
                                            className="input corporate"
                                            id='weightUnit'
                                            value={weightUnit}
                                            onChange={(e) => setWeightUnit(e.target.value)}>
                                            <option>kg</option>
                                            <option>gm</option>
                                        </select>
                                    </div>                       
                                    <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='wholeWeight'
                                            placeholder='Total Weight'
                                            value={wholeWeight}
                                            onChange={(e) => setWholeWeight(e.target.value)}
                                        />
                                        <select
                                            className="input corporate"
                                            id='weightUnit'
                                            value={weightUnit}
                                            onChange={(e) => setWeightUnit(e.target.value)}>
                                            <option>kg</option>
                                            <option>gm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="about-item-corporate">
                                <h5>About the item</h5>
                                <div className="about-item-list">
                                    <div className="about-item-input-fields">
                                        <input
                                            className='input corporate'
                                            type='text'
                                            id='itemDescription'
                                            placeholder='Item Description'
                                            value={itemDescription}
                                            onChange={(e) => setItemDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="about-item-input-fields">
                                        <input
                                            className='input corporate'
                                            type='text'
                                            id='selectedCategory'
                                            placeholder='Item Category'
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="about-item-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='itemValue'
                                            placeholder='Estimated value'
                                            value={itemValue}
                                            onChange={(e) => setItemValue(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="items-restriction">
                            <div className="readme">
                                <div className="readme-restricteditems">
                                    <Popup trigger=
                                        {
                                            <p
                                                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                onClick={handleTextClick}
                                            >
                                                Please read what can be shipped
                                            </p>}
                                        modal nested>
                                        {
                                            close => (
                                                <div className='popup-container parcel-type'>
                                                    <div className='popup-container terms-and-condition'>
                                                        <h2>What items can be shipped?</h2>
                                                        {/* Add your Terms and Conditions content here */}
                                                        <RestrictedItems />
                                                        <div className="iHave-read">
                                                            <input
                                                                type="checkbox"
                                                                checked={isCheckedShipping}
                                                                onChange={handleCheckboxShippingChange}
                                                            />
                                                            <p>I have read and understand what can and cannot be shipped</p>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-primary" onClick={() => { close(); }}>
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <ScrollToTopOnMount /> {/* Scroll to top when the component mounts */}
                                                </div>
                                            )
                                        }

                                    </Popup>
                                </div>
                            </div>
                        </div>

                        <div className="button-class">
                            {error && (
                                <div className="error-text-container">
                                    <p className="error-text">{error}</p>
                                </div>
                            )}
                            <button
                                id='calculate-button'
                                className='btn btn-primary'
                                onClick={handleCalculate}
                                style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>
                                {!buttonLoading ? 'Proceed to Summary' : 'loading...'}
                            </button>

                        </div>
                    </div>
                </div>)}
                {cardName === "summary" && (
                    <div>
                        <div className="summary-content">
                            <div className="summary-heading">
                                <div className="summary-items">
                                    <div className="items-heading">Pickup</div>
                                    <div className="items-name">CourierBote</div>
                                </div>

                                <div className="summary-items">
                                    <div className="items-heading">Delivery</div>
                                    <div className="items-name">Indian Post</div>
                                </div>

                                <div className="summary-items">
                                    <div className="items-heading">Service</div>
                                    <div className="items-name">{shipmentType}</div>
                                </div>

                                <div className="summary-items">
                                    <div className="items-heading">Amount</div>
                                    <div className="items-name">{courierAmount}</div>
                                </div>
                            </div>
                            <div className="summary-information">
                                <div className="summary-information-please">
                                    <h4>Please Note:</h4>
                                    <ul>
                                        <li className="Please-note">
                                            Any parcels booked for pick-up after the cut-off time (12:30 PM) will be scheduled for delivery on the next working day.
                                        </li>
                                        <li className="Please-note">
                                            Pick-up service is available 24/7, but deliveries are not scheduled for Sundays and designated holidays.
                                        </li>
                                    </ul>
                                </div>

                                <div className="packing-guide">
                                    <div>
                                        <h3>How To Pack Your Courier</h3>
                                        <div className="packing-image-section">
                                            <table>
                                                <tr>
                                                    <td><img src={sizeOfPacking} alt="sizeOfPacking" className="packingLogo" /></td>
                                                    <td><img src={qualityPacking} alt="qualityPacking" className="packingLogo" /> </td>
                                                    <td><img src={securityOfPacking} alt="securityOfPacking" className="packingLogo" /></td>
                                                    <td><img src={softPacking} alt="softPacking" className="packingLogo" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Size of Packing</td>
                                                    <td>Quality of Packing</td>
                                                    <td>Securing Item</td>
                                                    <td>Size of Packing</td>
                                                </tr>
                                                <tr>
                                                    <td>Ensure the box is not overloaded</td>
                                                    <td>Ensure that the box is sturdy and thick. Do not under or overfill</td>
                                                    <td>Use 5-6 cm cushioning between each item and line box with bubble wrap or newspaper</td>
                                                    <td>Ensure that the package is properly sealed Do not use paper or fabric bags</td>
                                                </tr>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="items-restriction">
                                    <div className="readme">
                                        <div className="readme-restricteditems">

                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />

                                            <p>I agree to the&nbsp; </p>
                                            <Popup trigger=
                                                {
                                                    <p
                                                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                        onClick={handleTextClick}
                                                    >
                                                        Terms and Conditions
                                                    </p>}
                                                modal nested>
                                                {
                                                    close => (
                                                        <div className='popup-container parcel-type' >
                                                            <div className='popup-container terms-and-condition'  >
                                                                <h2>Terms and Conditions</h2>
                                                                {/* Add your Terms and Conditions content here */}
                                                                <TermsAndCondition />

                                                                <div>
                                                                    <button className="btn btn-primary" onClick=
                                                                        {() => { close(); }}>
                                                                        close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <ScrollToTopOnMount />
                                                        </div>
                                                    )
                                                }
                                            </Popup>


                                        </div>
                                    </div>
                                </div>
                                <button className="card-back" onClick=
                                    {() => { setCardName('Initial') }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                                <div  className="button-class">
                                <button
                                    id='dashboard-button'
                                    className='btn btn-primary'
                                    onClick={handleProceed}>
                                    {!buttonLoading ? 'Proceed to Checkout' : 'loading...'}
                                </button>
                                {error && (
                        <div className="error-text-container">
                            <p className="error-text">{error}</p>
                        </div>
                    )}
                    </div>
                            </div>

                        </div>

                    </div>
                )}
                {cardName === 'billing' && (
                    <div className="order-summary">

                        <h3>Order Summary </h3>
                        <div className="order-elements-grp" >
                            <div className="order-elements address">
                                <div className="order-elements add" >
                                    <p className="order-elements heading">Pickup Details</p>
                                    <p >{pickupName}<br />{pickupAddr1}<br />{pickupAddr2}<br />{pickupCity}<br />{pickupPincode}<br />{pickupState}<br />Phone Number {pickupPhoneNumber}</p>
                                </div>
                                <div className="order-elements add">
                                    <p className="order-elements heading">Delivery Details</p>
                                    <p >{deliveryName}<br />{deliveryAddrL1}<br />{deliveryAddrL2}<br />{deliveryCity}<br />{deliveryPincode}<br />{deliveryState}<br />Phone Number {deliveryPhoneNumber}</p>
                                </div>
                            </div>
                            <div className="order-elements desc">
                                <div className="order-elements items">
                                <p className="order-elements heading">Item description:</p>
                                <p>{itemDescription}</p>
                                </div>
                                <div className="order-elements items">
                                <p className="order-elements heading">Item Category:</p>
                                <p>{selectedCategory}</p>
                                </div>
                                <div className="order-elements items">
                                <p className="order-elements heading">Item Value:</p>
                                <p>{itemValue}</p>
                                </div>
                            </div>
                            <div className="order-elements size">
                                <div className="order-elements">
                                    <p className="order-elements heading">NO of Boxes:</p>
                                    <p>{noOfBox}</p>
                                </div>
                                <div className="order-elements">
                                    <p className="order-elements heading">Per Box Weight:</p>
                                    <p>{perBoxWeight}</p>
                                </div>
                                <div className="order-elements">
                                    <p className="order-elements heading">Total Weight:</p>
                                    <p>{wholeWeight}</p>
                                </div>
                            </div>
                            <div className="order-elements billing">
                                <div className="billing-box">
                                    <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                    <div className="billing-details">
                                        <div className="charge">
                                            <p className="charge name">Courier Charge</p>
                                            <p>{courierAmount}</p>
                                        </div>
                                        <div className="charge">
                                            <p className="charge name">Pickup Charge</p>
                                            <p>{pickUpAmount}</p>
                                        </div>
                                        <div className="charge">
                                            <p className="charge name">Service Charge + GST</p>
                                            <p>{(courierBoteAmount-courierAmount).toFixed(2)}</p>
                                        </div>
                                        <div className="charge ">
                                            <p id="total" className="charge name">Total Charge</p>
                                            <p id="total">{totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-payment">
                            <div className="order-elements">
                                <label className='radios'>
                                    <input
                                        type='radio'
                                        name='shipment-type'
                                        value='Document'
                                        checked={paymentType === "razorPay"}
                                        onChange={() => setPaymentType("razorPay")}
                                    />
                                    Razor Pay
                                </label>

                                <label className='radios'>
                                    <input
                                        type='radio'
                                        name='shipment-type'
                                        value='Parcel'
                                        checked={paymentType === "cod"}
                                        onChange={() => setPaymentType("cod")}
                                    />
                                    COD
                                </label>
                            </div>
                        </div>
                        <button className="card-back" onClick=
                            {() => { setCardName('summary') }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                        <button
                            id='pickup-button'
                            className='btn btn-primary'
                            onClick={() => handleConfirm()}>Confirm and Pay</button>

                        {orderConfirmation && (
                            <div className="sucess-popup">


                                <div className='popup-container ' >
                                    <div className="popup-container content">
                                        <div className="alert-popup-container">
                                            <div className="success-checkmark">
                                                <div className="check-icon">
                                                    <span className="icon-line line-tip"></span>
                                                    <span className="icon-line line-long"></span>
                                                    <div className="icon-circle"></div>
                                                    <div className="icon-fix"></div>
                                                </div>
                                            </div>
                                            <div className="alert-popup-title">Success!!!</div>
                                            <div className="alert-popup-message">
                                                Your Pickup has been placed :)
                                            </div>
                                            <div className="alert-popup-confirm">
                                                <button
                                                    id='finalok-button'
                                                    className='btn btn-primary'
                                                    onClick={() => { handlOk(); }}>OK</button>
                                            </div>
                                        </div>
                                        <button className="popup-close" onClick=
                                            {() => { setOrderConfirmation(false); }}>

                                        </button>
                                    </div>

                                </div>


                            </div>)}
                    </div>
                )

                }
            </div>
        </div>

    );
}
function ScrollToTopOnMount() {
    useEffect(() => {
        document.querySelector('.terms-and-condition').scrollTop = 0; // Scroll to top when opened
    }, []); // Empty dependency array ensures this effect runs only once
    return null;
}
export default AddressCard;