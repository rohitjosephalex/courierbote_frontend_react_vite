import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useSearchParams } from 'react-router-dom';

import Popup from 'reactjs-popup';
import "./pickup.css";
import "./App.css";
import './index.css'
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import indianPost from './assets/India Post LOGO.jpg';
import courierBoteWhiteText from './assets/courierbote logo white transparent.png';

import OtpContainer from "./components/otpColumn/otpcolumn";
import { useFormik } from "formik";

function Pickup() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pickupPin = params.get('pickupPin');
    const deliverypart = params.get('deliverypart');
    const deliveryPin = params.get('deliveryPin');
    const rate = params.get('rate');

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
    const [otpPhoneNumber, setOtpPhoneNumber] = useState();
    const [otpEmail, setotpEmail] = useState();
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
    const [weightUnit, setWeightUnit] = useState("gm");
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

    const [lengthUnit, setLengthUnit] = useState('');
    const [widthUnit, setWidthUnit] = useState('');
    const [heightUnit, setHeighthUnit] = useState('');
    const [error, setError] = useState("");
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
    const initialValues = {
        otp: [
            { digit: "" },
            { digit: "" },
            { digit: "" },
            { digit: "" }
        ]
    };
    const localPincode = [641001, 641002, 641003, 641004, 641005, 641006, 641007, 641008, 641009, 641010, 641011, 641012, 641013, 641014, 641015, 641016, 641017, 641018, 641021, 641022, 641023, 641024, 641025, 641026, 641027, 641028, 641029, 641030, 641031, 641033, 641034, 641035, 641036, 641037, 641038, 641041, 641042, 641043, 641044, 641045, 641046, 641048, 641049, 641103, 641105, 641108, 642128]


    const formik = useFormik({
        initialValues: {
            otp: [{ digit: "" }, { digit: "" }, { digit: "" }, { digit: "" }],
        },
        onSubmit: async (values) => {
            try {
                let finalOtp = values.otp.map((item) => item.digit).join("");
                if (!finalOtp) {
                    setError('! Please fill in all fields');
                    return;
                }
                else if (!/^\d{4}$/.test(finalOtp)) {
                    setError("! OTP cannot contain whitespace characters");
                    return;
                }

                else if (finalOtp) {
                    console.log(finalOtp)
                    setButtonLoading(true);
                    const requestData = {
                        email: otpEmail,
                        otp: finalOtp,
                    };
                    const response = await axios.post('https://backend.courierbote.comapi/landing/verifyotp', requestData);
                    if (response.data.message === 'otp verified' && response.data.status === 200) {
                        setPickupDetails(false);
                        setPickupInfo(deliverypart);
                        setButtonLoading(false);
                    }
                }


            } catch (error) {
                if (error.response.data.statusCode === 400) {
                    setError('Invalid otp');
                    setButtonLoading(false);
                }
                else {
                    console.error('Error fetching otp:', error);
                    setError('Error fetching otp');
                    setButtonLoading(false);
                }
            }
        },
    });


    const handleValidate = async () => {
        try {
            setButtonLoading(true);
            // Ensure Formik validation has completed
            await formik.validateForm();

            // If there are validation errors, stop processing
            if (Object.keys(formik.errors).length !== 0) {
                console.log("Form validation errors:", formik.errors);
                return;
            }

            // Proceed with Formik handleSubmit
            await formik.handleSubmit();


        }

        catch (error) {
            setButtonLoading(false);
            setError('Error during verfying otp')
            console.error('Error during verfying otp:', error);


        }
    };
    const handleOk = () => {



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
        console.log(weightUnit, weight)
        setButtonLoading(true);
        if (!localPincode.includes(parseInt(pickupPincode))) {
            setError("Sorry Service at this pincode is currently unavailable");
            setButtonLoading(false);
        }
        else if (!pickupName || !pickupAddr1 || !pickupAddr2 || !pickupPhoneNumber || !pickupEmail || !pickupCity || !pickupPincode || !pickupState || !deliveryName || !deliveryAddrL1 || !deliveryAddrL2 || !deliveryPhoneNumber || !deliveryCity || !deliveryPincode || !deliveryState || !billingName || !billingAddr || !billingPhoneNumber || !length || !width || !height || !weight || !itemDescription || !selectedCategory || !itemValue.trim()) {
            setError("Please enter all the input fields.");
            setButtonLoading(false);
        }
        else if (weightUnit == "gm" && weight < 50) {
            setError("Min Weight should be 50gm");
            setButtonLoading(false);
        }
        else {
            setError('');
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
                        console.log(response.data)
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
    const handleOtpSend = async () => {

        const requestData = {
            email: otpEmail,
        };

        try {
            setButtonLoading(true)
            const response = await axios.post('https://backend.courierbote.comapi/landing/otpSent', requestData,

            );
            console.log(response.data);
            if (response.data.data === 'mail_sent' && response.data.status === 200) {
                setButtonLoading(false)
                setOtpSentNumber(response.data.otpEmail);
                setOtpSent("sent")
            }



        }
        catch (error) {
            if (error.response.data.statusCode === 400) {
                setError('Invalid Email');
                setButtonLoading(false);
            }
            console.error('Error sending otp:', error);
            setError('Error Sending Otp');
            setButtonLoading(false);
        }

        // sentOtp();


    }
    const handleWrongNumbeer = () => {
        setOtpSent('notSent')
    }

    const handleConfirm = () => {
        if (!paymentType  ) {
            setError("Please Select Payment Type")
        }
        else {
            setError('');
            let unifiedLength = length;
            let unifiedBreadth = width;
            let unifiedHeight = height;
            if (lengthUnit === 'm') {
                unifiedLength = length * 100; // Convert meters to centimeters
            }

            if (widthUnit === 'm') {
                unifiedBreadth = width * 100; // Convert meters to centimeters
            }

            if (heightUnit === 'm') {
                unifiedHeight = height * 100; // Convert meters to centimeters
            }
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
                pickUpEmail: `${pickupEmail}`,
                pickUpDate: ``,
                billingAddress: `${billingName}\n${billingAddr}\n${billingPhoneNumber}`,
                deliveryDetails: `  ${deliveryAddress}`,
                deliveryPhoneNumber: `${deliveryPhoneNumber}`,
                packingNeeded: `${isPackingNeeded}`,
                weight: `${newWeight}`,
                lbh: `${unifiedLength}x${unifiedBreadth}x${unifiedHeight}`,
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
    }

    return (<div>
        <div className="shipping-calculator-big card">

            <div className="details Screen">

                {isPickupDetails && (<div className="pickup-details view" >
                    <h4 className="heading indian-post" >Pickup Details</h4>
                    <div className="pickup-details code" >
                        <div className="summary-heading">
                            <div className="summary-items">
                                <div className="items-heading">Pickup Pincode</div>
                                <div className="items-name">{pickupPin}</div>
                            </div>
                            <div className="summary-items">
                                <div className="items-heading">Delivery Pincode</div>
                                <div className="items-name">{deliveryPin}</div>
                            </div>
                        </div>
                    </div>
                    <div className="pickup-details-Please-Note">
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
                    <div className="pickup-details route">

                        <div className="summary-heading">
                            <div className="summary-items">
                                <div className="items-heading">Pickup</div>
                                <div className="items-name">CourierBote</div>
                            </div>


                            <div className="summary-items">
                                <div className="items-heading">Delivery</div>

                                {deliverypart === 'Indian Post' && <div className="items-name">Indian Post</div>}
                                {deliverypart === 'd2d' && <div className="items-name">CourierBote</div>}
                            </div>

                            <div className="summary-items">
                                <div className="items-heading">Amount</div>
                                <div className="items-name">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(rate)}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Popup trigger=
                            {<button className='btn btn-primary proceed' id="confirm pickup" onClick={() => handleProceed()}> Proceed </button>}
                            modal nested>
                            {
                                close => (
                                    <div className='popup-container otp' >
                                        <div className='popup-container contents'  >
                                            <h3>OTP Verification</h3>
                                            {otpSent === "notSent" && <div>
                                                <div className="Address-Elements-sub">
                                                    {/* <label className='label'>Phone Number:</label>
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
                                                    </div> */}
                                                    <label className='label'>Email:</label>
                                                    <div style={{ display: 'flex' }}>

                                                        <input
                                                            className='input'
                                                            type='text'
                                                            id='Phone number'
                                                            placeholder='Email'
                                                            value={otpEmail}
                                                            onChange={(e) => setotpEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="button-classs-pickup">
                                                    {error && (
                                                        <div className="error-text-container otp">
                                                            <p className="error-text">{error}</p>

                                                        </div>
                                                    )}
                                                    <button className="btn btn-primary otp" onClick={() => handleOtpSend()} style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>{!buttonLoading ? 'Send-OTP' : 'loading...'}
                                                    </button>
                                                </div>
                                            </div>

                                            }
                                            {otpSent === "sent" && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                                <p style={{ fontSize: '15px' }}>OTP has been sent to {otpSentNumber} </p>
                                                <div>
                                                    <button className="btn btn-new" onClick={() => handleWrongNumbeer()}>Entered a wrong Email?
                                                    </button>
                                                </div>

                                                <div className="card-otp">
                                                    <OtpContainer formik={formik} initialValues={initialValues} />
                                                </div>
                                                <div className="button-classs-pickup">
                                                    {error && (
                                                        <div className="error-text-container otp">
                                                            <p className="error-text">{error}</p>

                                                        </div>
                                                    )}
                                                    <button className="btn btn-primary otp" onClick={() => handleValidate()} style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>{!buttonLoading ? 'Validate' : 'loading...'}
                                                    </button>
                                                </div>

                                            </div>}


                                            <div>

                                                <button className="popup-close" onClick=
                                                    {() => { close(); handleProceed(); setError('') }}>

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
                            <div className="inputfields address">
                                <div className='Pickup-Adress'>
                                    <h4>Pickup Address</h4>
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
                                        placeholder='Address Line 1'
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
                                    <div>
                                        <div className="Address-Elements">
                                            <div className="Address-Elements-sub">
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
                                    <h4>Delivery Address</h4>
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
                                        placeholder='Address Line 1'
                                        value={deliveryAddrL1}
                                        onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                    />
                                    <input
                                        className='input'
                                        type='text'
                                        id='addL2'
                                        placeholder='Address Line 2'
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
                                    <div className="cityStatePin">
                                        <div className="Address-Elements-sub">
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
                            <div className="inputfields productdetails">
                                <div className='Billing-Address'>

                                    <h4>Billing Address</h4>
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
                                    <div className="productdetails-noheading">

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
                                </div>
                                <div className='product-dimension'>
                                    <h4>Product Dimension</h4>
                                    <div className="productdetails-noheading">
                                        <div className="product-weight-input-fields">
                                            <input
                                                className='input '
                                                type='number'
                                                id='length'
                                                placeholder="Length"
                                                value={length}
                                                onChange={(e) => setLength(e.target.value)}
                                            />
                                            <select
                                                className="input "
                                                id='dimensionUnit'
                                                value={lengthUnit}
                                                onChange={(e) => setLengthUnit(e.target.value)}>
                                                <option>cm</option>
                                                <option>m</option>
                                            </select>
                                        </div>
                                        <div className="product-weight-input-fields">
                                            <input
                                                className='input '
                                                type='number'
                                                id='Breadth'
                                                placeholder='Breadth'
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                            />
                                            <select
                                                className="input "
                                                id='dimensionUnit'
                                                value={widthUnit}
                                                onChange={(e) => setWidthUnit(e.target.value)}>
                                                <option>cm</option>
                                                <option>m</option>
                                            </select>
                                        </div>
                                        <div className="product-weight-input-fields">
                                            <input
                                                className='input'
                                                type='number'
                                                id='height'
                                                placeholder='Height'
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                            />
                                            <select
                                                className="input"
                                                id='dimensionUnit'
                                                value={heightUnit}
                                                onChange={(e) => setHeighthUnit(e.target.value)}>
                                                <option>cm</option>
                                                <option>m</option>
                                            </select>
                                        </div>

                                        <div className="product-weight-input-fields">
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
                                    <h4>About the item</h4>
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
                                    <div className="productdetails-noheading">

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
                            </div>
                            <div className="button-classs">
                                {error && (
                                    <div className="error-text-container proceed">
                                        <p className="error-text">{error}</p>

                                    </div>
                                )}
                                <button
                                    id='calculate-button'
                                    className='btn btn-primary'
                                    onClick={handleCalculate}
                                    style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>
                                    {!buttonLoading ? 'Proceed to Checkout' : 'loading...'}
                                </button>
                            </div>
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
                                <div className="inputfields address">
                                    <div className='Pickup-Adress'>
                                        <h4>Pickup Address</h4>
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
                                            placeholder='Address Line 1'
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
                                        <div>
                                            <div className="Address-Elements">
                                                <div className="Address-Elements-sub">
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
                                        <h4>Delivery Address</h4>
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
                                            placeholder='Address Line 1'
                                            value={deliveryAddrL1}
                                            onChange={(e) => setDeliveryAddrL1(e.target.value)}
                                        />
                                        <input
                                            className='input'
                                            type='text'
                                            id='addL2'
                                            placeholder='Address Line 2'
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
                                        <div className="cityStatePin">
                                            <div className="Address-Elements-sub">
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
                                <div className="inputfields productdetails">
                                    <div className='Billing-Address'>
                                        <h4>Billing Address</h4>
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
                                        <div className="productdetails-noheading">

                                            <div className="productdetails-noheading">
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
                                        </div>
                                    </div>
                                    <div className="about-item">
                                        <h4>About the item</h4>
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
                                        <div className="productdetails-noheading">

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
                                </div>
                                <div className="button-classs">
                                    {error && (
                                        <div className="error-text-container proceed">
                                            <p className="error-text">{error}</p>

                                        </div>
                                    )}
                                    <button
                                        id='calculate-button'
                                        className='btn btn-primary'
                                        onClick={handleCalculate}
                                        style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}>
                                        {!buttonLoading ? 'Proceed to Checkout' : 'loading...'}
                                    </button>
                                </div>
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
                                            <p className="order-elements add-heading">Pickup Details:</p>
                                            <div className="order-element address-details">
                                                <p>{pickupName}</p>
                                                {pickupAddr1 && <p>{pickupAddr1}</p>}
                                                {pickupAddr2 && <p>{pickupAddr2}</p>}
                                                <p>{pickupCity}</p>
                                                <p>{pickupPincode}</p>
                                                <p>{pickupState}</p>
                                                <p>Phone Number: {pickupPhoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="order-elements add">
                                            <p className="order-elements add-heading">Delivery Details:</p>
                                            <div className="order-element address-details">
                                                <p>{deliveryName}</p>
                                                {deliveryAddrL1 && <p>{deliveryAddrL1}</p>}
                                                {deliveryAddrL2 && <p>{deliveryAddrL2}</p>}
                                                <p>{deliveryCity}</p>
                                                <p>{deliveryPincode}</p>
                                                <p>{deliveryState}</p>
                                                <p>Phone Number: {deliveryPhoneNumber}</p>
                                            </div>  </div>
                                    </div>
                                    <div className=" order-elements desc">
                                        <div className="order-elements items">
                                            <p className="order-elements heading">Item Description</p>
                                            <p className="order-elements values">{itemDescription}</p>
                                        </div>
                                        <div className="order-elements items">
                                            <p className="order-elements heading">Item Category</p>
                                            <p className="order-elements values">{selectedCategory}</p>
                                        </div>
                                        <div className="order-elements items">
                                            <p className="order-elements heading">Item Value</p>
                                            <p className="order-elements values">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(itemValue)}</p>
                                        </div>
                                    </div>
                                    <div className="order-elements size">
                                        <div className="order-elements">
                                            <p className="order-elements heading">Weight:</p>
                                            <p className="order-elements values">{weight}</p>
                                        </div>
                                        <div className="order-elements">
                                            <p className="order-elements heading">LBH:</p>
                                            <p className="order-elements values">{length}*{width}*{height}</p>
                                        </div>
                                    </div>
                                    <div className="order-elements billing">
                                        {
                                            deliverypart === "Indian Post" && (<div className="billing-box dark">
                                                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                                <div className="billing-details dark">
                                                    <div className="charge dark">
                                                        <p className="charge name">Pickup Charge</p>
                                                        <p>{pickupCharge}</p>
                                                    </div>
                                                    <div className="charge dark">
                                                        <p className="charge name">Packing Charge</p>
                                                        <p>{packingCharge}</p>
                                                    </div>
                                                    <div className="charge dark">
                                                        <p className="charge name">Courier Charge</p>
                                                        <p>{courierBotePrice}</p>
                                                    </div>
                                                    <div className="charge dark ">
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
                                            COP
                                        </label>
                                    </div>
                                </div>
                                <button className="card-back" onClick=
                                    {() => { setPickupInfo(deliverypart); setOrderConfirmation(false); setError("") }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                                <div className="button-classs">
                                    {error && (
                                        <div className="error-text-container proceed">
                                            <p className="error-text">{error}</p>

                                        </div>
                                    )}
                                    <button
                                        id='pickup-button'
                                        className='btn btn-primary'
                                        onClick={() => handleConfirm()}>Confirm and Pay</button>
                                </div>

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

        </div>
    </div>)
}

export default Pickup;