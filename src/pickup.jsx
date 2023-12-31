import React, { useState, useEffect, useRef } from "react";
import Popup from 'reactjs-popup';
import "./pickup.css";
import axios from 'axios';
import OtpInput from 'react-otp-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import indianPost from './assets/India Post LOGO.jpg';
import courierBoteWhiteText from './assets/courierbote logo white transparent.png';
function Pickup({ pickupPin, deliveryPin, deliverypart, rate, initialCard }) {
    // pickupPin = "691306";
    // deliveryPin = "686666";
    // deliverypart = "Indian Post"
    const [isPickupDetails, setPickupDetails] = useState(true)
    // const [deliveryPartner, setDeliveryPartner] = useState("Indian Post");
    // const [rate, setRate] = useState('50');
    const [pickupName, setPickupName] = useState("");
    const [pickupPhoneNumber, setPickupPhoneNumber] = useState("");
    const [pickupEmail, setPickupEmail] = useState("");
    const [pickupAddr1, setPickupAddr1] = useState("");
    const [pickupAddr2, setPickupAddr2] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupCity, setPickupCity] = useState("");
    const [pickupPincode, setPickupPincode] = useState(pickupPin);
    const [otpSent, setOtpSent] = useState("notSent");
    const [otp, setOtp] = useState('');
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
    const handleOk = () => {



        initialCard();


    }
    const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));
    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        if (value !== '' && index < otp.length - 1) {
            // Move to the next column when a digit is filled
            inputRefs.current[index + 1].current.focus();
        }
        // You can add additional validation if needed
        setOtp(newOtp);
    };

    const handleBackspace = (index) => {
        if (index > 0 && index <= 5) {
            // Move to the previous column when backspaced
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1].current.focus();
        } else if (index === 6 && otp[index] !== '') {
            // Clear the current column if it's the first one and not already cleared
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };


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
            paymentAmount: `Pickup Charge: ${pickupCharge} Packing Charge: ${packingCharge} Courier Charge: ${courierBotePrice} Total Charge: ${totalPrice}`,

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
                        {deliverypart === 'Indian Post' && <p>Indian Post</p>}
                        {deliverypart === 'd2d' && <p>courierBote</p>}
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
                                        <h3>OTP Verification</h3>
                                        {otpSent === "notSent" && <div>
                                            <div className="Address-Elements-sub">
                                                <label className='label'>Phone Number:</label>
                                                <div style={{ display: 'flex' }}>
                                                    <input className='input phonecode'
                                                        type='text'
                                                        id='Phone number'
                                                        readOnly
                                                        value={'+91'}
                                                    />
                                                    <input
                                                        className='input phonenumber'
                                                        type='text'
                                                        id='Phone number'
                                                        placeholder='Phone Number'
                                                        maxLength="10"
                                                        pattern="[0-9]*"
                                                        inputMode="numeric"
                                                        value={otpPhoneNumber}
                                                        onChange={(e) => setOtpPhoneNumber(e.target.value)}
                                                    />
                                                </div>

                                            </div>
                                            <button className="btn btn-primary otp" onClick={() => handleOtpSend()}>Send-OTP
                                            </button>
                                        </div>

                                        }
                                        {otpSent === "sent" && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <p style={{ fontSize: '15px' }}>OTP has been sent to {otpSentNumber} </p>
                                            <div>
                                                <button className="btn btn-new" onClick={() => handleWrongNumbeer()}>Entered a wrong number?
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

                                                <label className='label'>OTP</label>
                                                <OtpInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    numInputs={6}
                                                    renderSeparator={<span>{ } </span>}
                                                    containerStyle={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        gap: '4px',
                                                        margin: '15px auto',
                                                    }}
                                                    inputStyle={{
                                                        width: '30px',
                                                        height: '30px',
                                                        fontSize: '18px',
                                                        textAlign: 'center',
                                                        margin: '0',
                                                        borderRadius: '6px',
                                                        outline: 'none',
                                                    }}
                                                    renderInput={(props) => <input {...props}
                                                    />}
                                                />

                                            </div>
                                            <button className="btn btn-primary otp" onClick={() => handleValidate()}>Validate
                                            </button>

                                        </div>}


                                        <div>
                                            <button className="popup-close" onClick=
                                                {() => { close(); handleProceed(); setOtp('')}}>

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
                        <div className="inputfields address" >
                            <div className='Pickup-Adress'>
                                <h5>Pickup Adress</h5>
                                <label htmlFor='name'>Name:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={pickupName}
                                    onChange={(e) => setPickupName(e.target.value)}
                                />
                                <label htmlFor='addrL1'>Address Line 1:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='addrL1'
                                    placeholder='Adress Line 1'
                                    value={pickupAddr1}
                                    onChange={(e) => setPickupAddr1(e.target.value)}
                                />
                                <label htmlFor='addrL2'>Address Line 2:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='addrL2'
                                    placeholder='Address Line 2'
                                    value={pickupAddr2}
                                    onChange={(e) => setPickupAddr2(e.target.value)}
                                />
                                <label htmlFor='PhoneNumber'>Phone Number:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='PhoneNumber'
                                    placeholder='Phone Number'
                                    value={pickupPhoneNumber}
                                    onChange={(e) => setPickupPhoneNumber(e.target.value)}
                                />

                                <div  >
                                    <div className="Address-Elements">
                                        <div className="Address-Elements-sub">
                                            <label htmlFor='Email'>Email:</label>
                                            <input
                                                className='input'
                                                type='text'
                                                id='Email'
                                                placeholder='Email'
                                                value={pickupEmail}
                                                onChange={(e) => setPickupEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements-sub">
                                            <label htmlFor='city'>City:</label>
                                            <input
                                                className='input'
                                                type='text'
                                                id='city'
                                                placeholder='city'
                                                value={pickupCity}
                                                onChange={(e) => setPickupCity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="Address-Elements" >
                                        <div className="Address-Elements-sub">
                                            <label htmlFor='pincode'>Pincode:</label>
                                            <input
                                                className='input'
                                                type='number'
                                                id='pincode'
                                                placeholder='pincode'
                                                value={pickupPincode}
                                                onChange={(e) => setPickupPincode(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements-sub">
                                            <label htmlFor='state'>State:</label>
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
                                </div>
                            </div>
                            <div className='Delivery-Address'>
                                <h5>Delivery Address</h5>
                                <label htmlFor="name">Name:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={deliveryName}
                                    onChange={(e) => setDeliveryName(e.target.value)}
                                />
                                <label htmlFor="Address Line 1"> Address Line 1:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='addL1'
                                    placeholder='Adress Line 1'
                                    value={deliveryAddrL1}
                                    onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                />
                                <label htmlFor="Address Line 2"> Address Line 2:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='addL2'
                                    placeholder='Adress Line 2'
                                    value={deliveryAddrL2}
                                    onChange={(e) => setDeliveryAddrL2(e.target.value)}
                                />
                                <label htmlFor="Phone Number">Phone Number:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='phoneNumber'
                                    placeholder='Phone Number'
                                    value={deliveryPhoneNumber}
                                    onChange={(e) => setDeliveryPhoneNumber(e.target.value)}
                                />
                                <div className="cityStatePin" >

                                    <div className="Address-Elements-sub">
                                        <label htmlFor="City">City:</label>
                                        <input
                                            className='input'
                                            type='text'
                                            id='city'
                                            placeholder='city'
                                            value={deliveryCity}
                                            onChange={(e) => setDeliveryCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="Address-Elements">
                                        <div className="Address-Elements-sub">
                                            <label htmlFor="Pincode">Pincode:</label>
                                            <input
                                                className='input'
                                                type='number'
                                                id='pincode'
                                                placeholder='pincode'
                                                value={deliveryPincode}
                                                onChange={(e) => setDeliveryPincode(e.target.value)}
                                            />
                                        </div>

                                        <div className="Address-Elements-sub">
                                            <label htmlFor="State">State:</label>
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
                                <label htmlFor="">Name:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='name'
                                    placeholder='Name'
                                    value={billingName}
                                    onChange={(e) => setBillingName(e.target.value)}
                                />
                                <label htmlFor="">Address:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='address'
                                    placeholder='Address'
                                    value={billingAddr}
                                    onChange={(e) => setBillingAddr(e.target.value)}
                                />
                                <label htmlFor="">Phone Number:</label>
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
                                <label htmlFor="">Height</label>
                                <input
                                    className='input'
                                    type='number'
                                    id='height'
                                    placeholder='Height'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <label htmlFor="">Length:</label>
                                <input
                                    className='input'
                                    type='number'
                                    id='length'
                                    placeholder='Length'
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                />
                                <label htmlFor="">Width:</label>
                                <input
                                    className='input'
                                    type='number'
                                    id='width'
                                    placeholder='Width'
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                                <div >
                                    <label htmlFor="">Weight:</label>
                                    <div className="Weight-input">
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
                                <label htmlFor="">Item Name:</label>
                                <input
                                    className='input'
                                    type='text'
                                    id='height'
                                    placeholder='Item Description'
                                    value={itemDescription}
                                    onChange={(e) => setItemDescriptiont(e.target.value)}
                                />



                                <label htmlFor="">Item Category:</label>
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
                                <label htmlFor="">Item Value:</label>
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
                    <div className='pickupbooking'>
                        <img className="logo courierBote" src={courierBoteWhiteText} alt="CourierBote logo" />
                        <h4 className="heading indian-post">Door To Door</h4>

                        <div className='inputfields'>
                            <div className="inputfields address" >
                                <div className='Pickup-Adress'>
                                    <h5>Pickup Adress</h5>
                                    <label htmlFor='name'>Name:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='name'
                                        placeholder='Name'
                                        value={pickupName}
                                        onChange={(e) => setPickupName(e.target.value)}
                                    />
                                    <label htmlFor='addrL1'>Address Line 1:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='addrL1'
                                        placeholder='Adress Line 1'
                                        value={pickupAddr1}
                                        onChange={(e) => setPickupAddr1(e.target.value)}
                                    />
                                    <label htmlFor='addrL2'>Address Line 2:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='addrL2'
                                        placeholder='Address Line 2'
                                        value={pickupAddr2}
                                        onChange={(e) => setPickupAddr2(e.target.value)}
                                    />
                                    <label htmlFor='PhoneNumber'>Phone Number:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='PhoneNumber'
                                        placeholder='Phone Number'
                                        value={pickupPhoneNumber}
                                        onChange={(e) => setPickupPhoneNumber(e.target.value)}
                                    />

                                    <div  >
                                        <div className="Address-Elements">
                                            <div className="Address-Elements-sub">
                                                <label htmlFor='Email'>Email:</label>
                                                <input
                                                    className='input'
                                                    type='text'
                                                    id='Email'
                                                    placeholder='Email'
                                                    value={pickupEmail}
                                                    onChange={(e) => setPickupEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="Address-Elements-sub">
                                                <label htmlFor='city'>City:</label>
                                                <input
                                                    className='input'
                                                    type='text'
                                                    id='city'
                                                    placeholder='city'
                                                    value={pickupCity}
                                                    onChange={(e) => setPickupCity(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="Address-Elements">
                                            <div className="Address-Elements-sub">
                                                <label htmlFor='pincode'>Pincode:</label>
                                                <input
                                                    className='input'
                                                    type='number'
                                                    id='pincode'
                                                    placeholder='pincode'
                                                    value={pickupPincode}
                                                    onChange={(e) => setPickupPincode(e.target.value)}
                                                />
                                            </div>
                                            <div className="Address-Elements-sub">
                                                <label htmlFor='state'>State:</label>
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
                                    </div>
                                </div>
                                <div className='Delivery-Address'>
                                    <h5>Delivery Address</h5>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='name'
                                        placeholder='Name'
                                        value={deliveryName}
                                        onChange={(e) => setDeliveryName(e.target.value)}
                                    />
                                    <label htmlFor="Address Line 1"> Address Line 1:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='addL1'
                                        placeholder='Adress Line 1'
                                        value={deliveryAddrL1}
                                        onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                    />
                                    <label htmlFor="Address Line 2"> Address Line 2:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='addL2'
                                        placeholder='Adress Line 2'
                                        value={deliveryAddrL2}
                                        onChange={(e) => setDeliveryAddrL2(e.target.value)}
                                    />
                                    <label htmlFor="Phone Number">Phone Number:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='phoneNumber'
                                        placeholder='Phone Number'
                                        value={deliveryPhoneNumber}
                                        onChange={(e) => setDeliveryPhoneNumber(e.target.value)}
                                    />
                                    <div className="cityStatePin" >

                                        <div className="Address-Elements-sub">
                                            <label htmlFor="City">City:</label>
                                            <input
                                                className='input'
                                                type='text'
                                                id='city'
                                                placeholder='city'
                                                value={deliveryCity}
                                                onChange={(e) => setDeliveryCity(e.target.value)}
                                            />
                                        </div>
                                        <div className="Address-Elements">
                                            <div className="Address-Elements-sub">
                                                <label htmlFor="Pincode">Pincode:</label>
                                                <input
                                                    className='input'
                                                    type='number'
                                                    id='pincode'
                                                    placeholder='pincode'
                                                    value={deliveryPincode}
                                                    onChange={(e) => setDeliveryPincode(e.target.value)}
                                                />
                                            </div>

                                            <div className="Address-Elements-sub">
                                                <label htmlFor="State">State:</label>
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
                                    <label htmlFor="">Name:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='name'
                                        placeholder='Name'
                                        value={billingName}
                                        onChange={(e) => setBillingName(e.target.value)}
                                    />
                                    <label htmlFor="">Address:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='address'
                                        placeholder='Address'
                                        value={billingAddr}
                                        onChange={(e) => setBillingAddr(e.target.value)}
                                    />
                                    <label htmlFor="">Phone Number:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='phoneNumber'
                                        placeholder='PhoneNumber'
                                        value={billingPhoneNumber}
                                        onChange={(e) => setBillingPhoneNumber(e.target.value)}
                                    />

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
                                    <label htmlFor="">Item Name:</label>
                                    <input
                                        className='input'
                                        type='text'
                                        id='height'
                                        placeholder='Item Description'
                                        value={itemDescription}
                                        onChange={(e) => setItemDescriptiont(e.target.value)}
                                    />



                                    <label htmlFor="">Item Category:</label>
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
                                    <label htmlFor="">Item Value:</label>
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
                </div>)
            }
            {
                pickupInfo === "summary" && (
                    <div className="pickup info">
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
                                        <p>LBH:</p>
                                        <p>{`${length} ${width} ${height}`}</p>
                                    </div>
                                </div>
                                <div className="order-elements billing">
                                    {
                                        deliverypart === "Indian Post" && (<div className="billing-box">
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
                                        deliverypart === "d2d" && (<div className="billing-box">
                                            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                            <div className="billing-details">
                                                <div className="charge">
                                                    <p className="charge name">Pickup Charge</p>
                                                    <p>{pickupCharge}</p>
                                                </div>
                                                <div className="charge">
                                                    <p className="charge name">Delivery Charge</p>
                                                    <p>{totalPrice - pickupCharge}</p>
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
                                                        onClick={() => { handleOk(); }}>OK</button>
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