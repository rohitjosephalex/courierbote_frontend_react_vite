// import React from "react";
import React, { useState } from "react";
import Popup from 'reactjs-popup';
import sizeOfPacking from '../../assets/Size_Packing.jpg';
import securityOfPacking from '../../assets/Security_Items.jpg';
import softPacking from '../../assets/Soft_Packing.jpg';
import qualityPacking from '../../assets/Quality_packing.jpg';
import Modal from 'react-modal';
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
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("kg");

    // About the Item
    const [isPackingNeeded, setIsPackingNeeded] = useState(false);
    const [itemDescription, setItemDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [otherCategoryInput, setOtherCategoryInput] = useState("");
    const [itemValue, setItemValue] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    // Other States
    const [buttonLoading, setButtonLoading] = useState(false);
    const [amount, setAmount] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const handleConfirm = () => {
        setOrderConfirmation(true)
    }
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
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
            setButtonLoading(true);
            let unifiedperBoxWeight=perBoxWeight;
            let unifiedTotalWeight=wholeWeight;
            if(weightUnit==='gm'){
                unifiedperBoxWeight=perBoxWeight/1000;
                unifiedTotalWeight=wholeWeight/1000
            }
            if (shipmentType === 'By Air') {
                const requestData = {
                    pickupPincode: pickupPincode,
                    destiantionPincode: deliveryPincode,
                    totalWeight:unifiedTotalWeight,
                    perBoxWeight:unifiedperBoxWeight,
                    noOfBOx:noOfBox
                };
                const response = await axios.post('http://localhost:80/api/corporatedashboard/byairrate', requestData);
                console.log(response.data)
                if(response.data.status===200){
                    setAmount(response.data.data.courierCharge) ;
                    setButtonLoading(false);
                    setCardName("summary")
                }
            }
            else if(shipmentType === 'By surface'){
                const requestData = {
                    pickupPincode: pickupPincode,
                    destiantionPincode: deliveryPincode,
                    totalWeight:unifiedTotalWeight,
                    perBoxWeight:unifiedperBoxWeight,
                    noOfBOx:noOfBox
                };
                const response = await axios.post('http://localhost:80/api/corporatedashboard/byroadrate', requestData);
                console.log(response.data)
                if(response.data.status===200){
                    setAmount(response.data.data.courierCharge) ;
                    setButtonLoading(false);
                    setCardName("summary")
                }   
            }
        }
        catch (error) {
            console.log(error)
        }




    };
    const handleProceed = () => {
        // Your logic for handling the calculate button click
        if (isChecked) {
            // Set buttonLoading to true during processing
            setButtonLoading(true);

            // Simulate an asynchronous operation (e.g., API call)
            setTimeout(() => {
                // After completion, set buttonLoading back to false
                setButtonLoading(false);
                setAmount(250)
                setCardName("billing")
                // Your further logic after the operation is complete
            }, 2000)
        } else {
            // Handle the case when the checkbox is not checked
            alert('Please agree to the Terms and Conditions');
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
                                                <div className='popup-container otp' >
                                                    <div className='popup-container content'  >



                                                        <div>
                                                            <button className="popup-close" onClick=
                                                                {() => { close(); }}>

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
                                                <div className='popup-container otp' >
                                                    <div className='popup-container content'  >



                                                        <div>
                                                            <button className="popup-close" onClick=
                                                                {() => { close(); }}>

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
                                            id='noOfBox'
                                            placeholder='No of Box'
                                            value={noOfBox}
                                            onChange={(e) => setNoOfBox(e.target.value)}
                                        />
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

                        <button
                            id='calculate-button'
                            className='btn btn-primary'
                            onClick={handleCalculate}>
                            {!buttonLoading ? 'Proceed to Checkout' : 'loading...'}
                        </button>
                        <div id='result'></div>
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
                                    <div className="items-name">{amount}</div>
                                </div>
                            </div>
                            <div className="summary-information">
                                <div className="Please-note" >
                                    Service Cut off Time: 12:30 PM
                                    All parcels that are booked for pick up after service cut off time:12:30 PM, Will be scheduled for delivery on the next working day

                                </div>
                                <div className="Please-note" >
                                    Pick up service is available 24/7 but
                                    Delivery of the parcels will not be scheduled on Sundays and the Delivery partner designated holiday

                                </div>
                                <div className="packing-guide">
                                    <div>
                                        <h3>How To Pack Your Courier</h3>
                                        <div className="packing-image-section">
                                            <div className="packing-items">
                                                <img src={sizeOfPacking} alt="sizeOfPacking" className="packingLogo" />
                                                <h5 className="packing-item-heading">Size of Packing</h5>
                                                <p className="packing-item-desc">Ensure the box is not overloaded</p>
                                            </div>
                                            <div className="packing-items">
                                                <img src={qualityPacking} alt="qualityPacking" className="packingLogo" />
                                                <h5 className="packing-item-heading">Quality of Packing</h5>
                                                <p className="packing-item-desc">Ensure that the box is sturdy and thick. Do not under or overfill</p>
                                            </div>
                                            <div className="packing-items">
                                                <img src={securityOfPacking} alt="securityOfPacking" className="packingLogo" />
                                                <h5 className="packing-item-heading">Securing Items</h5>
                                                <p className="packing-item-desc">Use 5-6 cm cushioning between each item and line box with bubble wrap or newspaper</p>
                                            </div>
                                            <div className="packing-items">
                                                <img src={softPacking} alt="softPacking" className="packingLogo" />
                                                <h5 className="packing-item-heading">Soft Packing</h5>
                                                <p className="packing-item-desc">Ensure that the package is properly sealed Do not use paper or fabric bags </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="items-restriction">
                                    <div className="readme">
                                        <div className="readme-restricteditems">

                                            <p
                                                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                                onClick={handleTextClick}
                                            >
                                                Click here to read the Terms and Conditions
                                            </p>

                                            <Modal
                                                isOpen={isModalOpen}
                                                onRequestClose={closeModal}
                                                contentLabel="Terms and Conditions Modal"
                                            >
                                                <h2>Terms and Conditions</h2>
                                                {/* Add your Terms and Conditions content here */}
                                                <p>Your terms and conditions go here.</p>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    I agree to the Terms and Conditions
                                                </label>
                                                <button onClick={closeModal}>Close</button>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <button className="card-back" onClick=
                                    {() => { setCardName('Initial') }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                                <button
                                    id='dashboard-button'
                                    className='btn btn-primary'
                                    onClick={handleProceed}>
                                    {!buttonLoading ? 'Proceed to Checkout' : 'loading...'}
                                </button>
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
                                    <p>Pickup Address:</p>
                                    <p >{pickupName}<br />{pickupAddr1}<br />{pickupAddr2}<br />{pickupCity}<br />{pickupPincode}<br />{pickupState}</p>
                                </div>
                                <div className="order-elements add">
                                    <p>Delivery Address:</p>
                                    <p >{deliveryName}<br />{deliveryAddrL1}<br />{deliveryAddrL2}<br />{deliveryCity}<br />{deliveryPincode}<br />{deliveryState}</p>
                                </div>
                            </div>
                            <div className=" order-elements">
                                <p>Item description:</p>
                                <p>{itemDescription}</p>
                            </div>
                            <div className="order-elements size">
                                <div className="order-elements">
                                    <p>Weight:</p>
                                    <p>{weight}</p>
                                </div>
                                <div className="order-elements">
                                    <p>NO of Boxes:</p>
                                    <p>{noOfBox}</p>
                                </div>
                                <div className="order-elements">
                                    <p>Per Box Weight:</p>
                                    <p>{perBoxWeight}</p>
                                </div>
                                <div className="order-elements">
                                    <p>Total Weight:</p>
                                    <p>{wholeWeight}</p>
                                </div>
                            </div>
                            <div className="order-elements billing">
                                <div className="billing-box">
                                    <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                    <div className="billing-details">
                                        <div className="charge">
                                            <p className="charge name">Pickup Charge</p>
                                            <p>25</p>
                                        </div>
                                        <div className="charge">
                                            <p className="charge name">Packing Charge</p>
                                            <p>65</p>
                                        </div>
                                        <div className="charge">
                                            <p className="charge name">Courier Charge</p>
                                            <p>100</p>
                                        </div>
                                        <div className="charge ">
                                            <p id="total" className="charge name">Total Charge</p>
                                            <p id="total">650</p>
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

export default AddressCard;