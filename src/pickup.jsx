import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import "./pickup.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import indianPost from './assets/India Post LOGO.jpg';

function Pickup({ pickupPin, deliveryPin, deliverypart, rate,initialCard }) {
    // pickupPin = "691306";
    // deliveryPin = "686666";
    // deliverypart = "Indian Post"
    const [isPickupDetails, setPickupDetails] = useState(true)
    // const [deliveryPartner, setDeliveryPartner] = useState("Indian Post");
    // const [rate, setRate] = useState('50');
    const [pickupName, setPickupName] = useState("");
    const [pickupPhoneNumber, setPickupPhoneNumber] = useState("");
    const [pickupAddr1, setPickupAddr1] = useState("");
    const [pickupAddr2, setPickupAddr2] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupCity, setPickupCity] = useState("");
    const [pickupPincode, setPickupPincode] = useState(pickupPin);
    const [otpSent, setOtpSent] = useState("notSent");
    const [otp, setOtp] = useState("Indian Post");
    const [otpPhoneNumber, setOtpPhoneNumber] = useState();
    const [otpSentNumber, setOtpSentNumber] = useState();
    const [pickupInfo, setPickupInfo] = useState()
    const [pickupState, setPickupState] = useState("");
    const [deliveryName, setDeliveryName] = useState("");
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryAddrL1, setDeliveryAddrL1] = useState("");
    const [deliveryAddrL2, setDeliveryAddrL2] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliveryPincode, setDeliveryPincode] = useState(deliveryPin);
    const [deliveryState, setDeliveryState] = useState("");
    const [billingName, setBillingName] = useState("");
    const [billingPhoneNumber, setBillingPhoneNumber] = useState("");
    const [billingAddr, setBillingAddr] = useState("");
    const [itemValue, setItemValue] = useState("");
    const [itemDescription, setItemDescriptiont] = useState("");
    // const [itemCategory, setItemCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [otherCategoryInput, setOtherCategoryInput] = useState("");
    const [height, setHeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [weight, setWeight] = useState("");
    const [weightUnit, setWeightUnit] = useState("");
    const [isBillingChecked, setIsBillingChecked] = useState(false);
    const [isPackingNeeded, setIsPackingNeeded] = useState(false);
    // const [result, setResult] = useState("");
    const [courierBotePrice, setCourierBotePrice] = useState('');
    const [packingCharge, setPackingCharge] = useState('');
    const [pickupCharge, setPickupCharge] = useState('');
    // const [postalGSTPrice, setPostalGSTPrice] = useState('');
    // const [postalPrice, setPostalPrice] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentType, setPaymentType] = useState("");
	const [buttonLoading, setButtonLoading] = useState(false);


    const categories = [
        "Documents/Books",
        "Clothes Accessories",
        "Food",
        "Household Items",
        "Electronic Items",
        "Metal Items",
        "Machines and Tools",
        "Timber and Wood Products",
        "Automobile Equipment's",
        "Office Supplies",
        "Other"
    ];
const handleOk=()=>{



    initialCard();

    
}
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setSelectedCategory(selectedCategory);

        if (selectedCategory !== "Other") {
            setOtherCategoryInput("");
        }
    };


    const handleCalculate = () => {
        setButtonLoading(true);
        let newWeight = 0;
        if (weightUnit === "kg") {
            newWeight = weight * 1000;
        }
        else {
            newWeight = weight;

        }

        if (deliverypart === 'Indian Post') {
            const requestData = {
                pickupPincode: pickupPincode,
                destiantionPincode: deliveryPincode,
                weight: newWeight,
                packing: isPackingNeeded,
            };
            const getFinalPrice = async () => {
                try {
                    const response = await axios.post('https://backend.courierbote.com/api/landing/indianpostfinalrate', requestData,);
                    setCourierBotePrice(response.data.data.courierBote_price);
                    setPackingCharge(response.data.data.packing_charge);
                    setPickupCharge(response.data.data.pickup_charge);
                    setTotalPrice(response.data.data.totalPrice);
                    setPickupAddress(`${pickupName}\n ${pickupAddr1}\n ${pickupAddr2}\n ${pickupCity}\n ${pickupPincode}\n ${pickupState}`);
                    setDeliveryAddress(`${deliveryName}\n${deliveryAddrL1}\n${deliveryAddrL2}\n${deliveryCity}\n${deliveryPincode}\n${deliveryState}`);
                    setPickupInfo('summary')
                    setButtonLoading(false);
                    // console.log('result', result);
                }
                catch (error) {
                    console.error('Error fetching data from Indian post:', error);
                }
            }

            getFinalPrice();
        }
        else if (deliverypart === 'd2d') {
            const requestData = {
                pickupPincode: pickupPincode,
                destiantionPincode: deliveryPincode,
            };
            const getFinalPrice = async () => {
                try {
                    const response = await axios.post('https://backend.courierbote.com/api/landing/doortodoorrate', requestData,);
                    setPickupCharge(response.data.result.PickupPrice);
                    setTotalPrice(response.data.result.TotalPrice);
                    setPickupAddress(`${pickupName}\n ${pickupAddr1}\n ${pickupAddr2}\n ${pickupCity}\n ${pickupPincode}\n ${pickupState}`);
                    setDeliveryAddress(`${deliveryName}\n${deliveryAddrL1}\n${deliveryAddrL2}\n${deliveryCity}\n${deliveryPincode}\n${deliveryState}`);
                    setPickupInfo('summary')
                    setButtonLoading(false);
                    // console.log('result', result);
                }
                catch (error) {
                    console.error('Error fetching data from Indian post:', error);
                }
            }

            getFinalPrice();
        }

        // setPickupAddress(`${pickupName}\n ${pickupAddr1}\n ${pickupAddr2}\n ${pickupCity}\n ${pickupPincode}\n ${pickupState}`);
        // setDeliveryAddress(`${deliveryName}\n${deliveryAddrL1}\n${deliveryAddrL2}\n${deliveryCity}\n${deliveryPincode}\n${deliveryState}`);
        // setPickupInfo('summary')

    }

    const setBillingAddress = (checkeddata) => {
        const checked = checkeddata;
        setIsBillingChecked(checked)
        setBillingName(checked ? `${pickupName}` : '');
        setBillingPhoneNumber(checked ? `${pickupPhoneNumber}` : '');
        setBillingAddr(checked ? `${pickupAddr1} ${pickupAddr2} ${pickupCity} ${pickupPincode}` : '');

    }
    const handleProceed = () => {
        setOtpSent("notSent")
    }
    const handleOtpSend = () => {

        const requestData = {
            phoneNumber: otpPhoneNumber,
        };
        const sentOtp = async () => {
            try {
                const response = await axios.post('https://backend.courierbote.com/api/landing/otpSent', requestData,

                );
                console.log(response.data);
                if (response.data.data === 'accepted' && response.data.status === 200) {
                    setOtpSentNumber(response.data.number)
                    // setOtpSent("sent")
                }

                // else {
                //     alert('error sending otp')
                // }


            }
            catch (error) {
                if (error.response.data.statusCode === 400) {
                    alert('Invalid number')
                }
                console.error('Error sending otp:', error);
            }
        }
        // sentOtp();
        setOtpSent("sent");

    }
    const handleWrongNumbeer = () => {
        setOtpSent('notSent')
    }
    const handleValidate = () => {
        //if otp verifies
        const requestData = {
            phoneNumber: otpPhoneNumber,
            otp: otp
        };
        const verifyOtp = async () => {
            try {
                const response = await axios.post('https://backend.courierbote.com/api/landing/verifyotp', requestData,

                );
                console.log("##verify data", response);
                if (response.data.message === 'otp verified' && response.data.status === 200) {
                    // setPickupDetails(false);
                    // setPickupInfo(deliverypart);
                }

                // else {
                //     alert('otp verification issue')
                // }


            }
            catch (error) {
                if (error.response.data.statusCode === 400) {
                    alert('Invalid otp')
                }
                else {
                    console.error('Error fetching otp:', error);
                }
            }
        }
        // verifyOtp();
        setPickupDetails(false);
        setPickupInfo(deliverypart);


    }
    const handleConfirm = () => {
        let newWeight = 0;
        if (weightUnit === "kg") {
            newWeight = weight * 1000;
        }
        else {
            newWeight = weight;

        }
        const requestData = {
            serviceType: `${deliverypart}`,
            itemCategory: `${selectedCategory} ${otherCategoryInput}`,
            itemDescription: `${itemDescription}`,
            itemValue: `${itemValue}`,
            pickUpdetails: `${pickupAddress}`,
            pickPhoneNumber: `${pickupPhoneNumber}`,
            pickUpEmail: ``,
            pickUpDate: ``,
            billingAddress: `${billingName}\n${billingAddr}\n${billingPhoneNumber}`,
            deliveryDetails: `  ${deliveryAddress}`,
            deliveryPhoneNumber: `${deliveryPhoneNumber}`,
            packingNeeded: `${isPackingNeeded}`,
            weight: `${newWeight}`,
            lbh: `${length}x${width}x${height}`,
            paymentMode: `${paymentType}`,
            paymentAmount: ``,

        }
        const confirmOrder = async () => {
            try {
                const response = await axios.post('https://backend.courierbote.com/api/landing/orderconfirmation', requestData,

                );
                console.log("##verify_data", response.status);
                if (response.data.data === 'mail_sent' && response.status === 200) {
                    setOrderConfirmation(true);
                    console.log('confirmed')
                }

                // else {
                //     alert('otp verification issue')
                // }


            }
            catch (error) {
                if (error.response.data.statusCode === 400) {
                    alert('Error confirming order pls contact customer care if money has been debited')
                }
                else {
                    console.error('Error confirming order:', error);
                    alert('error confirming order')
                }
            }
        }
        confirmOrder()


    }

    return (

        <div className="details Screen">
            {isPickupDetails && (<div className="pickup-details view" >
                <h4 className="heading indian-post" >Pickup Details</h4>
                <div className="pickup-details code" >
                    <div className="pickup-details pincodeElement">
                        <h5>Pickup Pincode</h5>
                        <p>{pickupPin}</p>
                    </div >
                    <div className="pickup-details pincodeElements" >
                        <h5>Delivery Pincode</h5>
                        <p>{deliveryPin}</p>
                    </div>
                </div>
                <div className="pickup-details working">
                    <h5>Pickup Cutoff : Orders booked after the cut-off time will be selected for the pickup on next working day (Pick up cutoff before 12:00 pm).</h5>
                    <h5>Please Note : The post office service are closed for speed post bookings on Sundays and designated post office holiday </h5>
                </div>
                <div className="pickup-details route">

                    <div className="pickup-details route-elements">
                        <h5>PickUp</h5>
                        <p>courierBote</p>
                    </div>
                    <div className="pickup-details route-elements">
                        <h5>Delivery Partner</h5>
                        <p>{deliverypart}</p>
                    </div>
                    <div className="pickup-details route-elements">
                        <h5>Rate</h5>
                        <p>₹{rate}</p>
                    </div>
                </div>
                <div>
                    <Popup trigger=
                        {<button className='btn btn-primary proceed' id="confirm pickup" onClick={() => handleProceed()}> Proceed </button>}
                        modal nested>
                        {
                            close => (
                                <div className='popup-container otp' >
                                    <div className='popup-container content'  >
                                        <h5>OTP Verification</h5>
                                        {otpSent === "notSent" && <div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label className='label'>Phone Number:</label>
                                                <input
                                                    className='input'
                                                    type='text'
                                                    id='drop-pincode'
                                                    placeholder='Phone Number'
                                                    value={otpPhoneNumber}
                                                    onChange={(e) => setOtpPhoneNumber(e.target.value)}
                                                />

                                            </div>
                                            <button className="btn btn-primary otp" onClick={() => handleOtpSend()}>Send-OTP
                                            </button>
                                        </div>

                                        }
                                        {otpSent === "sent" && <div style={{ display: 'grid' }}>
                                            <p style={{ fontSize: '15px' }}>OTP has been sent to {otpSentNumber} </p>
                                            <div>
                                                <button className="btn btn-new" onClick={() => handleWrongNumbeer()}>Entered a wrong number?
                                                </button>
                                            </div>
                                            <div style={{ display: 'grid' }}>

                                                <label className='label'>OTP</label>
                                                <input
                                                    className='input'
                                                    type='number'
                                                    id='weight'
                                                    placeholder='otp'
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />

                                            </div>
                                            <button className="btn btn-primary otp" onClick={() => handleValidate()}>Validate
                                            </button>

                                        </div>}


                                        <div>
                                            <button className="popup-close" onClick=
                                                {() => { close(); handleProceed(); }}>

                                            </button>
                                        </div>
                                    </div>


                                </div>
                            )
                        }
                    </Popup>
                </div></div>)}
            {pickupInfo === "Indian Post" && (<div className="pickup info">
                <div className='pickupbooking'>
                    <img className="logo indian-post" src={indianPost} alt="Indian post logo" />
                    <h4 className="heading indian-post">Indian Post</h4>

                    <div className='inputfields'>
                        <div className="inputfields address" style={{ display: 'flex' }}>
                            <div className='Pickup-Adress'>
                                <h5>Pickup Adress</h5>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={pickupName}
                                    onChange={(e) => setPickupName(e.target.value)}
                                />

                                <input
                                    className='input'
                                    type='text'
                                    id='addrL1'
                                    placeholder='Adress Line 1'
                                    value={pickupAddr1}
                                    onChange={(e) => setPickupAddr1(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='addrL2'
                                    placeholder='Address Line 2'
                                    value={pickupAddr2}
                                    onChange={(e) => setPickupAddr2(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='PhoneNumber'
                                    placeholder='Phone Number'
                                    value={pickupPhoneNumber}
                                    onChange={(e) => setPickupPhoneNumber(e.target.value)}
                                />
                                <div >
                                    <input
                                        className='input'
                                        type='text'
                                        id='city'
                                        placeholder='city'
                                        value={pickupCity}
                                        onChange={(e) => setPickupCity(e.target.value)}
                                    />
                                    <input
                                        className='input'
                                        type='number'
                                        id='pincode'
                                        placeholder='pincode'
                                        value={pickupPincode}
                                        onChange={(e) => setPickupPincode(e.target.value)}
                                    />
                                    <input
                                        className='input'
                                        type='text'
                                        id='state'
                                        placeholder='State'
                                        value={pickupState}
                                        onChange={(e) => setPickupState(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className='Delivery-Address'>
                                <h5>Delivery Address</h5>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={deliveryName}
                                    onChange={(e) => setDeliveryName(e.target.value)}
                                />

                                <input
                                    className='input'
                                    type='text'
                                    id='addL1'
                                    placeholder='Adress Line 1'
                                    value={deliveryAddrL1}
                                    onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='addL2'
                                    placeholder='Adress Line 2'
                                    value={deliveryAddrL2}
                                    onChange={(e) => setDeliveryAddrL2(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='phoneNumber'
                                    placeholder='Phone Number'
                                    value={deliveryPhoneNumber}
                                    onChange={(e) => setDeliveryPhoneNumber(e.target.value)}
                                />
                                <div className="cityStatePin" >
                                    <input
                                        className='input'
                                        type='text'
                                        id='city'
                                        placeholder='city'
                                        value={deliveryCity}
                                        onChange={(e) => setDeliveryCity(e.target.value)}
                                    />
                                    <input
                                        className='input'
                                        type='number'
                                        id='pincode'
                                        placeholder='pincode'
                                        value={deliveryPincode}
                                        onChange={(e) => setDeliveryPincode(e.target.value)}
                                    />
                                    <input
                                        className='input'
                                        type='text'
                                        id='state'
                                        placeholder='State'
                                        value={deliveryState}
                                        onChange={(e) => setDeliveryState(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                        <div className="inputfields productdetails" >
                            <div className='Billing-Address'>
                                <h5>Billing Address</h5>
                                <label className='checkbox'>
                                    <input
                                        type='checkbox'
                                        name='shipment-type'
                                        value='Document'
                                        checked={isBillingChecked}
                                        onChange={(e) => setBillingAddress(e.target.checked)}
                                    />
                                    Use my pickup address
                                </label>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={billingName}
                                    onChange={(e) => setBillingName(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='address'
                                    placeholder='Address'
                                    value={billingAddr}
                                    onChange={(e) => setBillingAddr(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='text'
                                    id='phoneNumber'
                                    placeholder='PhoneNumber'
                                    value={billingPhoneNumber}
                                    onChange={(e) => setBillingPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className='product-dimension' >
                                <h5>Product Dimension</h5>
                                <input
                                    className='input'
                                    type='number'
                                    id='height'
                                    placeholder='Height'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='number'
                                    id='length'
                                    placeholder='Length'
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                />
                                <input
                                    className='input'
                                    type='number'
                                    id='width'
                                    placeholder='Width'
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                                <div style={{ display: 'flex' }}>

                                    <input
                                        className='input'
                                        type='number'
                                        id='weight'
                                        placeholder='Weight'
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                    <select
                                        className="input"
                                        id='weight-unit'
                                        value={weightUnit}
                                        onChange={(e) => setWeightUnit(e.target.value)}>
                                        <option>gm</option>
                                        <option>kg</option>
                                    </select>
                                </div>
                            </div>

                            <div className="about-item">
                                <h5>About the item</h5>
                                <label className='checkbox'>
                                    <input
                                        type='checkbox'
                                        name='shipment-type'
                                        value='Document'
                                        checked={isPackingNeeded}
                                        onChange={(e) => setIsPackingNeeded(e.target.checked)}
                                    />
                                    Is packing needed
                                </label>
                                <input
                                    className='input'
                                    type='text'
                                    id='height'
                                    placeholder='Item Description'
                                    value={itemDescription}
                                    onChange={(e) => setItemDescriptiont(e.target.value)}
                                />




                                <select className='input' value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="" disabled hidden>Select Item category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {selectedCategory === "Other" && (
                                    <input
                                        className='input'
                                        type="text"
                                        value={otherCategoryInput}
                                        onChange={(e) => setOtherCategoryInput(e.target.value)}
                                        placeholder="Enter other category"
                                    />
                                )}

                                <input
                                    className='input'
                                    type='number'
                                    id='pincode'
                                    placeholder='Estimated value'
                                    value={itemValue}
                                    onChange={(e) => setItemValue(e.target.value)}
                                />

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
                </div>
            </div>

            )
            }
            {
                // DIV to add the door to door option
                pickupInfo === "d2d" && (<div className="pickup info">
                    D2D
                </div>)
            }
            {
                pickupInfo === "summary" && (
                    <div className="pickup info">
                        <div className="order-summary">

                            <h3>Order Summary </h3>
                            <div className="order-elements-grp" >
                                <div className="order-elements address">
                                    <div className="order-elements" >
                                        <p>Pickup Address:</p>
                                        <p >{pickupName}<br />{pickupAddr1}<br />{pickupAddr2}<br />{pickupCity}<br />{pickupPincode}<br />{pickupState}</p>
                                    </div>
                                    <div className="order-elements">
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
                                        <p>LBH:</p>
                                        <p>{`${length} ${width} ${height}`}</p>
                                    </div>
                                </div>
                                <div className="order-elements billing">
                                    {
                                deliverypart === "Indian Post"&&(  <div className="billing-box">
                                        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                        <div className="billing-details">
                                            <div className="charge">
                                                <p className="charge name">Pickup Charge</p>
                                                <p>{pickupCharge}</p>
                                            </div>
                                            <div className="charge">
                                                <p className="charge name">Packing Charge</p>
                                                <p>{packingCharge}</p>
                                            </div>
                                            <div className="charge">
                                                <p className="charge name">Courier Charge</p>
                                                <p>{courierBotePrice}</p>
                                            </div>
                                            <div className="charge ">
                                                <p id="total" className="charge name">Total Charge</p>
                                                <p id="total">{totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>)}
                                    {
                                deliverypart === "d2d"&&(  <div className="billing-box">
                                        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                        <div className="billing-details">
                                            <div className="charge">
                                                <p className="charge name">Pickup Charge</p>
                                                <p>{pickupCharge}</p>
                                            </div>
                                            <div className="charge">
                                                <p className="charge name">Delivery Charge</p>
                                                <p>{totalPrice-pickupCharge}</p>
                                            </div>
                                            <div className="charge ">
                                                <p id="total" className="charge name">Total Charge</p>
                                                <p id="total">{totalPrice}</p>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                            <div className="order-payment">
                                <div className="order-elements">
                                    <label className='radio'>
                                        <input
                                            type='radio'
                                            name='shipment-type'
                                            value='Document'
                                            checked={paymentType === "razorPay"}
                                            onChange={() => setPaymentType("razorPay")}
                                        />
                                        Razor Pay
                                    </label>

                                    <label className='radio'>
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
                                {() => { setPickupInfo(deliverypart); setOrderConfirmation(false); }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                            <button
                                id='pickup-button'
                                className='btn btn-primary'
                                onClick={() => handleConfirm()}>Confirm and Pay</button>

                            {orderConfirmation && (
                                <div className="sucess-popup">


                                    <div className='popup-container ' >
                                        <div className="popup-container content">
                                            <div class="alert-popup-container">
                                                <div class="success-checkmark">
                                                    <div class="check-icon">
                                                        <span class="icon-line line-tip"></span>
                                                        <span class="icon-line line-long"></span>
                                                        <div class="icon-circle"></div>
                                                        <div class="icon-fix"></div>
                                                    </div>
                                                </div>
                                                <div class="alert-popup-title">Success!!!</div>
                                                <div class="alert-popup-message">
                                                    Your Pickup has been placed :)
                                                </div>
                                                <div class="alert-popup-confirm">
                                                    <button
                                                        id='finalok-button'
                                                        className='btn btn-primary'
                                                        onClick={()=>{handleOk();}}>OK</button>
                                                </div>
                                            </div>
                                            <button className="popup-close" onClick=
                                                {() => { setOrderConfirmation(false); }}>

                                            </button>
                                        </div>

                                    </div>


                                </div>)}
                        </div>

                    </div>)
            }
        </div>

    )
}

export default Pickup;