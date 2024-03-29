// import React from "react";
import React, { useState, useEffect, useRef } from "react";
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


function AddressCard({ setProceedToAddress, name, add1, add2, phoneNumber, email, city, pincode, state, gstNo }) {
    const [cardName, setCardName] = useState("Initial");

    // Pickup Address
    const [pickupName, setPickupName] = useState(name);
    const [pickupAddr1, setPickupAddr1] = useState(add1);
    const [pickupAddr2, setPickupAddr2] = useState(add2);
    const [pickupPhoneNumber, setPickupPhoneNumber] = useState(phoneNumber);
    const [pickupEmail, setPickupEmail] = useState(email);
    const [pickupCity, setPickupCity] = useState(city);
    const [pickupPincode, setPickupPincode] = useState(pincode);
    const [pickupState, setPickupState] = useState(state);
    const [customerGstin, setCustomerGstin] = useState(gstNo);

    // Delivery Address
    const [deliveryName, setDeliveryName] = useState("");
    const [deliveryAddrL1, setDeliveryAddrL1] = useState("");
    const [deliveryAddrL2, setDeliveryAddrL2] = useState("");
    const [deliveryPhoneNumber, setDeliveryPhoneNumber] = useState("");
    const [deliveryCity, setDeliveryCity] = useState("");
    const [deliveryPincode, setDeliveryPincode] = useState("");
    const [deliveryState, setDeliveryState] = useState("");
    const [shipmentType, setShipmentType] = useState("");

    // Product Dimensions
    const [wholeWeight, setWholeWeight] = useState("");
    const [perBoxWeight, setPerBoxWeight] = useState("");
    const [noOfBox, setNoOfBox] = useState("");
    // const [weightUnit, setWeightUnit] = useState("kg");
    const [perBoxWeightUnit, setPerBoxWeightUnit] = useState('kg');
    const [wholeBoxWeightUnit, setWholeBoxWeightUnit] = useState('kg');
    const [length, setLength] = useState("");
    const [breadth, setBreadth] = useState("");
    const [height, setHeight] = useState("");
    // const [dimensionUnit, setDimensionUnit] = useState("m");
    const [lengthUnit, setLengthUnit] = useState('cm');
    const [breadthUnit, setBreadthUnit] = useState('cm');
    const [heightUnit, setHeightUnit] = useState('cm');
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
    const [courierAmount, setCourierAmount] = useState(0);
    const [pickUpAmount, setPickUpAmount] = useState(0);
    const [courierBoteAmount, setCourierBoteAmount] = useState(0);
    const [serviceGstCharge, setServiceGstCharge] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentType, setPaymentType] = useState('');
    const [error, setError] = useState("");
    const [save, setSave] = useState(false);
    const [loading, setLoading] = useState(false);
    const [orderFail, setOrderFail] = useState(false);
    const [courierBoteOrderId, setCourierBoteOrderId] = useState("");
    const localPincode = [641001, 641002, 641003, 641004, 641005, 641006, 641007, 641008, 641009, 641010, 641011, 641012, 641013, 641014, 641015, 641016, 641017, 641018, 641021, 641022, 641023, 641024, 641025, 641026, 641027, 641028, 641029, 641030, 641031, 641033, 641034, 641035, 641036, 641037, 641038, 641041, 641042, 641043, 641044, 641045, 641046, 641048, 641049, 641103, 641105, 641108, 642128]
    const apiToken = sessionStorage.getItem('api_token');
    const dashboardDetailsRef = useRef(null);
    useEffect(() => {
        // Whenever cardName changes, or any other relevant state/prop changes
        // Set scrollTop to 0 to ensure the dashboard-details starts from the top
        if (dashboardDetailsRef.current) {
            dashboardDetailsRef.current.scrollTop = 0;
        }
    }, [cardName, /* Add other relevant dependencies here */]);
    useEffect(() => {
        if (noOfBox && perBoxWeight) {
            const totalWeight = parseFloat(noOfBox) * parseFloat(perBoxWeight);
            setWholeWeight(totalWeight);
        }
    }, [noOfBox, perBoxWeight]);
    const handleConfirm = async () => {
        let timeoutId = 0;
        try {
            let isTimedOut = false;
            if (paymentType !== "razorPay") {
                setError("Please Select Payment Type")
            }
            else {
                setButtonLoading(true);
                // setOrderConfirmation(true)
                // Set a timeout to stop loading after 20 seconds
                timeoutId = setTimeout(() => {
                    isTimedOut = true;
                    setButtonLoading(false);
                    alert('Request timed out. Please try again.');
                }, 20000);
                setError("");
                let unifiedperBoxWeight = perBoxWeight;
                let unifiedTotalWeight = wholeWeight;

                if (shipmentType === 'By Air') {
                    if (perBoxWeightUnit === 'kg') {
                        unifiedperBoxWeight = perBoxWeight * 1000; // Convert kilograms to grams
                    }
                    if (wholeBoxWeightUnit === 'kg') {
                        unifiedTotalWeight = wholeWeight * 1000; // Convert kilograms to grams
                    }// By air calculation is to be done in gms 
                }
                else if (shipmentType === 'By surface') {//By surface calculation are done in kg
                    if (perBoxWeightUnit === 'gm') {
                        unifiedperBoxWeight = perBoxWeight / 1000; // Convert grams to kilograms
                    }
                    if (wholeBoxWeightUnit === 'gm') {
                        unifiedTotalWeight = wholeWeight / 1000; // Convert grams to kilograms
                    }
                }
                let unifiedLength = length;
                let unifiedBreadth = breadth;
                let unifiedHeight = height;
                if (lengthUnit === 'm') {
                    unifiedLength = length * 100; // Convert meters to centimeters
                }
            
                if (breadthUnit === 'm') {
                    unifiedBreadth = breadth * 100; // Convert meters to centimeters
                }
            
                if (heightUnit === 'm') {
                    unifiedHeight = height * 100; // Convert meters to centimeters
                }
                const requestData = {
                    pickupName: pickupName,
                    pickupAddr1: pickupAddr1,
                    pickupAddr2: pickupAddr2,
                    pickupPhoneNumber: pickupPhoneNumber,
                    pickupEmail: pickupEmail,
                    pickupCity: pickupCity,
                    pickupState: pickupState,
                    pickupPincode: pickupPincode,
                    totalWeight: unifiedTotalWeight,
                    perBoxWeight: unifiedperBoxWeight,
                    noOfBOx: noOfBox,
                    deliveryName: deliveryName,
                    deliveryAddrL1: deliveryAddrL1,
                    deliveryAddrL2: deliveryAddrL2,
                    deliveryPhoneNumber: deliveryPhoneNumber,
                    deliveryCity: deliveryCity,
                    deliveryState: deliveryState,
                    deliveryPincode: deliveryPincode,
                    shipmentType: shipmentType,
                    itemDescription: itemDescription,
                    selectedCategory: selectedCategory,
                    itemValue: itemValue,
                    paymentType: paymentType,
                    length: unifiedLength,
                    breadth: unifiedBreadth,
                    height: unifiedHeight,
                    gstNo: customerGstin,
                    courierBoteOrderId:courierBoteOrderId

                };
                const response = await axios.post('https://backend.courierbote.com/api/corporatedashboard/billing', requestData,
                    {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    });
                setButtonLoading(false);
                console.log(response.status);
                if (response.status === 200) {
                    if (!isTimedOut) {
                        clearTimeout(timeoutId);
                    }
                }
                const courierBoteOrderID = response.data.receipt;
                setCourierBoteOrderId(response.data.receipt);
                const amount = response.data.amount;
                var options = {
                    "key": "rzp_test_8Tzc3XN5iQ4jrB", // Enter the Key ID generated from the Dashboard
                    "amount": response.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Courierbote",
                    "description": "Transaction for delivery",
                    "image": "https://i.imgur.com/9L39rc3.png",
                    "order_id": response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "handler": async function (response) {
                        console.log("response.razorpay_payment_id");
                        // console.log(response.razorpay_order_id);
                        // console.log(response.razorpay_signature);
                        setButtonLoading(false);
                        setLoading(true);
                        const requestData = {
                            pickupName: pickupName,
                            pickupAddr1: pickupAddr1,
                            pickupAddr2: pickupAddr2,
                            pickupPhoneNumber: pickupPhoneNumber,
                            pickupEmail: pickupEmail,
                            pickupCity: pickupCity,
                            pickupState: pickupState,
                            pickupPincode: pickupPincode,
                            totalWeight: unifiedTotalWeight,
                            perBoxWeight: unifiedperBoxWeight,
                            noOfBOx: noOfBox,
                            deliveryName: deliveryName,
                            deliveryAddrL1: deliveryAddrL1,
                            deliveryAddrL2: deliveryAddrL2,
                            deliveryPhoneNumber: deliveryPhoneNumber,
                            deliveryCity: deliveryCity,
                            deliveryState: deliveryState,
                            deliveryPincode: deliveryPincode,
                            shipmentType: shipmentType,
                            itemDescription: itemDescription,
                            selectedCategory: selectedCategory,
                            itemValue: itemValue,
                            paymentType: paymentType,
                            length: length,
                            breadth: breadth,
                            height: height,
                            gstNo: customerGstin,
                            courierBoteOrderID: courierBoteOrderID,
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            razorPaySignature: response.razorpay_signature
                        };
                        const responsepayment = await axios.post('https://backend.courierbote.com/api/corporatedashboard/razorpayvalidatepayment', requestData,
                            {
                                headers: {
                                    Authorization: `Bearer ${apiToken}`,
                                },
                            });
                        console.log(responsepayment);
                        if (responsepayment.status === 200) {
                            setLoading(false);
                            console.log(responsepayment.data);
                            setOrderConfirmation(true);
                            setCourierBoteOrderId("");
                        }

                    },
                    "prefill": {
                        "name": pickupName,
                        "email": pickupEmail,
                        "contact": pickupPhoneNumber
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    setButtonLoading(false);
                    console.log(response.error)
                    setLoading(false);
                    setOrderFail(true)
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                    throw (response.error);
                });
                rzp1.open();
                e.preventDefault();
            }
        }
        catch (error) {

            setButtonLoading(false);
            setLoading(false);
            clearTimeout(timeoutId)
            console.log(error)
        }
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
    const handleSaveAddress = async () => {
        try {
            const requestData = {
                pickupName: pickupName,
                pickupAddr1: pickupAddr1,
                pickupAddr2: pickupAddr2,
                pickupPhoneNumber: pickupPhoneNumber,
                pickupEmail: pickupEmail,
                pickupCity: pickupCity,
                pickupPincode: pickupPincode,
                pickupState: pickupState,
                gstNo: customerGstin
            };
            const response = await axios.post('https://backend.courierbote.com/api/corporatedashboard/saveaddress', requestData, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });
            if (response.status === 200) {
                console.log("saved")
                setTimeout(() => {
                    setSave(true);
                }, 2000);

            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // Function to handle calculate button click
    const handleCalculate = async () => {
        let timeoutId = 0;
        try {
            let isTimedOut = false;



            if (!localPincode.includes(parseInt(pickupPincode))) {
                setError("Sorry Service at this pincode is currently unavailable");
                setButtonLoading(false);
            } else if (!pickupName || !pickupAddr1 || !pickupAddr2 || !pickupPhoneNumber || !pickupEmail || !pickupCity || !pickupPincode || !pickupState || !deliveryName || !deliveryAddrL1 || !deliveryAddrL2 || !deliveryPhoneNumber || !deliveryCity || !deliveryPincode || !deliveryState || !noOfBox || !perBoxWeight || !wholeWeight || !length || !breadth || !height || !itemDescription || !selectedCategory || !itemValue.trim() || (shipmentType !== "By Air" && shipmentType !== "By surface")) {
                setError("Please enter all the input fields.");
                setButtonLoading(false);
            }
            else if (!isCheckedShipping) {
                setError("Please read what items can be Shipped");
                setButtonLoading(false);
            }
            else {
                setButtonLoading(true);
                // Set a timeout to stop loading after 20 seconds
                timeoutId = setTimeout(() => {
                    isTimedOut = true;
                    setButtonLoading(false);
                    alert('Request timed out. Please try again.');
                }, 20000);
                setError("");
                let unifiedperBoxWeight = perBoxWeight;
                let unifiedTotalWeight = wholeWeight;
                let unifiedLength = length;
                let unifiedBreadth = breadth;
                let unifiedHeight = height;
                if (lengthUnit === 'm') {
                    unifiedLength = length * 100; // Convert meters to centimeters
                }
            
                if (breadthUnit === 'm') {
                    unifiedBreadth = breadth * 100; // Convert meters to centimeters
                }
            
                if (heightUnit === 'm') {
                    unifiedHeight = height * 100; // Convert meters to centimeters
                }
                console.log(length, unifiedLength)
                if (shipmentType === 'By Air') {
                    if (perBoxWeightUnit === 'kg') {
                        unifiedperBoxWeight = perBoxWeight * 1000; // Convert kilograms to grams
                    }
                    if (wholeBoxWeightUnit === 'kg') {
                        unifiedTotalWeight = wholeWeight * 1000; // Convert kilograms to grams
                    }// By air calculation is to be done in gms 
                    const requestData = {
                        pickupPincode: pickupPincode,
                        destiantionPincode: deliveryPincode,
                        totalWeight: unifiedTotalWeight,
                        perBoxWeight: unifiedperBoxWeight,
                        noOfBOx: noOfBox,
                        length: unifiedLength,
                        breadth: unifiedBreadth,
                        height: unifiedHeight,
                    };
                    const response = await axios.post('http://localhost/api/corporatedashboard/byairrate', requestData, {
                        headers: {
                            Authorization: `Bearer ${apiToken}`,
                        },
                    });
                    console.log(response.data);
                    if (!isTimedOut) {
                        clearTimeout(timeoutId); // Clear the timeout if response is received before timeout
                        if (response.data.status === 200) {
                            setCourierAmount(response.data.data.courierCharge.toFixed(2));
                            setCourierBoteAmount(response.data.data.CourierBotePrice);
                            setPickUpAmount(response.data.data.pickupCharge);
                            setTotalAmount(response.data.data.totalCharge);
                            setServiceGstCharge((response.data.data.totalCharge - response.data.data.courierCharge).toFixed(2));
                            setButtonLoading(false);
                            setCardName("summary");
                        }
                    }
                } else if (shipmentType === 'By surface') {// By surface calculation is to be done in kg
                    if (perBoxWeightUnit === 'gm') {
                        unifiedperBoxWeight = perBoxWeight / 1000; // Convert grams to kilograms
                    }
                    if (wholeBoxWeightUnit === 'gm') {
                        unifiedTotalWeight = wholeWeight / 1000; // Convert grams to kilograms
                    }
                   // By air calculation is to be done in gms 
                    if (!isTimedOut) {
                        clearTimeout(timeoutId); // Clear the timeout if response is received before timeout
                        const requestData = {
                            pickupPincode: pickupPincode,
                            destiantionPincode: deliveryPincode,
                            totalWeight: unifiedTotalWeight,
                            perBoxWeight: unifiedperBoxWeight,
                            noOfBOx: noOfBox,
                            length: unifiedLength,
                            breadth: unifiedBreadth,
                            height: unifiedHeight,
                        };
                        const response = await axios.post('https://backend.courierbote.com/api/corporatedashboard/byroadrate', requestData, {
                            headers: {
                                Authorization: `Bearer ${apiToken}`,
                            },
                        });
                        console.log(response.data);
                        if (response.data.status === 200) {
                            console.log("hello", response.data.data.CourierBotePrice, response.data.data.pickupCharge, response.data.data.totalCharge, response.data.data.courierCharge)
                            setCourierAmount(response.data.data.courierCharge.toFixed(2));
                            setCourierBoteAmount(response.data.data.CourierBotePrice);
                            setPickUpAmount(response.data.data.pickupCharge);
                            setTotalAmount(response.data.data.totalCharge);
                            setServiceGstCharge(((response.data.data.CourierBotePrice - response.data.data.courierCharge) + response.data.data.pickupCharge).toFixed(2));
                            setButtonLoading(false);
                            setCardName("summary");
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            clearTimeout(timeoutId);
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
        setOrderConfirmation(false);
        setProceedToAddress(false);
    }

    return (
        <div className="dashboard-card">
            <div className="dashboard-details" ref={dashboardDetailsRef} style={{ overflowY: 'scroll', maxHeight: '90vh' }}>
                {cardName === 'Initial' && (<div className='pickupbooking'>
                    <div className='inputfields'>
                        <div className="corporate-address">
                            <div className='Pickup-Adress-corporate'>
                                <h4>Pickup Address</h4>
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
                                        <button
                                            className="save-address-button"
                                            title="Save the address for convenient future checkouts"
                                            onClick={handleSaveAddress}
                                        >
                                            {!save ? 'Save' : 'Saved'}
                                        </button>
                                    </div>
                                    <div className="Address-Elements-sub">
                                        <input
                                            className='input corporate'
                                            type='text'
                                            id='pincode'
                                            placeholder='Customer GSTIN'
                                            value={customerGstin}
                                            onChange={(e) => setCustomerGstin(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='Delivery-Address-corporate'>
                                <h4>Delivery Address</h4>
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
                                            value='shipmentType'
                                            checked={shipmentType === "By Air"}
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
                                            value='shipmentType'
                                            checked={shipmentType === "By surface"}
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
                                <h4>Parcel Details</h4>
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
                                            value={perBoxWeightUnit}
                                            onChange={(e) => setPerBoxWeightUnit(e.target.value)}>
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
                                            value={wholeBoxWeightUnit}
                                            onChange={(e) => setWholeBoxWeightUnit(e.target.value)}>
                                            <option>kg</option>
                                            <option>gm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='product-weight-corporate'>
                                <h4>Parcel Dimension</h4>
                                <div className="product-weight-inputs">
                                    <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='length'
                                            placeholder="Length"
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}
                                        />
                                        <select
                                            className="input corporate"
                                            id='dimensionUnit'
                                            value={lengthUnit}
                                            onChange={(e) => setLengthUnit(e.target.value)}>
                                            <option>cm</option>
                                            <option>m</option>
                                        </select>
                                    </div>
                                    <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='Breadth'
                                            placeholder='Breadth'
                                            value={breadth}
                                            onChange={(e) => setBreadth(e.target.value)}
                                        />
                                        <select
                                            className="input corporate"
                                            id='dimensionUnit'
                                            value={breadthUnit}
                                            onChange={(e) => setBreadthUnit(e.target.value)}>
                                            <option>cm</option>
                                            <option>m</option>
                                        </select>
                                    </div>
                                    <div className="product-weight-input-fields">
                                        <input
                                            className='input corporate'
                                            type='number'
                                            id='height'
                                            placeholder='Height'
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                        <select
                                            className="input corporate"
                                            id='dimensionUnit'
                                            value={heightUnit}
                                            onChange={(e) => setHeightUnit(e.target.value)}>
                                            <option>cm</option>
                                            <option>m</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="about-item-corporate">
                                <h4>About the item</h4>
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
                                                    <div className='popup-container popup-container terms-and-condition'>
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
                                    <div className="items-name">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(courierAmount)}</div>
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
                                                <td>Soft Packing</td>
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
                                <div className="button-class">
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
                        <div className="bill">

                            <h3>Order Summary </h3>
                            <div className="order-elements-grp" >
                                <div className="order-elements address">
                                    <div className="order-elements add">
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
                                        </div>
                                    </div>

                                </div>
                                <div className="order-elements desc">
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
                                        <p className="order-elements heading">NO of Boxes:</p>
                                        <p className="order-elements values">{noOfBox}</p>
                                    </div>
                                    <div className="order-elements">
                                        <p className="order-elements heading">Per Box Weight:</p>
                                        <p className="order-elements values">{perBoxWeight}</p>
                                    </div>
                                    <div className="order-elements">
                                        <p className="order-elements heading">Total Weight:</p>
                                        <p className="order-elements values">{wholeWeight}</p>
                                    </div>
                                    <div className="order-elements">
                                        <p className="order-elements heading">LBH:</p>
                                        <p className="order-elements values">{length}*{breadth}*{height}</p>
                                    </div>
                                </div>
                                <div className="order-elements billing">
                                    <div className="billing-box light">
                                        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>Billing Details</h4>
                                        <div className="billing-details light">
                                            <div className="charge light">
                                                <p className="charge name">Courier Charge</p>
                                                <p className="charge value">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(courierAmount)}</p>
                                            </div>
                                            <div className="charge light">
                                                <p className="charge name">Service Charge + GST</p>
                                                <p className="charge value">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(serviceGstCharge)}</p>
                                            </div>
                                            <div className="charge light">
                                                <p id="total" className="charge name">Total Charge</p>
                                                <p id="total" className="charge value">{Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(totalAmount)}</p>
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
                                            value='paymentType'
                                            checked={paymentType === "razorPay"}
                                            onChange={() => setPaymentType("razorPay")}
                                        />
                                        Razor Pay
                                    </label>

                                    {/* <label className='radios'>
                                    <input
                                        type='radio'
                                        name='shipment-type'
                                        value='Parcel'
                                        checked={paymentType === "cod"}
                                        onChange={() => setPaymentType("cod")}
                                    />
                                    COD
                                </label> */}
                                </div>
                            </div>
                            <button className="card-back" onClick=
                                {() => { setCardName('summary') }}> <FontAwesomeIcon icon={faArrowLeft} className="search-icon" /></button>
                            <div className="button-class">
                                {error && (
                                    <div className="error-text-container">
                                        <p className="error-text">{error}</p>
                                    </div>
                                )}
                                <button
                                    id='pickup-button'
                                    className='btn btn-primary'
                                    onClick={handleConfirm} style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}> {!buttonLoading ? 'Confirm and Pay' : 'loading...'}</button>
                            </div>
                            {loading && (<div className="loading-screen">
                                <div className="loader"></div>
                            </div>)}
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
                                            {/* <button className="popup-close" onClick=
                                            {() => { setOrderConfirmation(false); }}>

                                        </button> */}
                                        </div>

                                    </div>


                                </div>)}
                            {orderFail && (
                                <div className="sucess-popup">


                                    <div className='popup-container ' >
                                        <div className="popup-container content">
                                            <div className="alert-popup-container">
                                                <div className="circle-container">
                                                    <div className="circle-border"></div>
                                                    <div className="circle">
                                                        <div className="error"></div>
                                                    </div>
                                                </div>
                                                <div className="alert-popup-title fail">!!!Failed</div>
                                                <div className="alert-popup-message">
                                                    Something Went Wrong  Please Contact Customer Care
                                                </div>
                                                <div className="alert-popup-confirm">
                                                    <button
                                                        id='finalok-button'
                                                        className='btn btn-primary'
                                                        onClick={() => { handlOk(); }}>OK</button>
                                                </div>
                                            </div>
                                            {/* <button className="popup-close" onClick=
                                            {() => { setOrderConfirmation(false); }}>

                                        </button> */}
                                        </div>

                                    </div>


                                </div>)}
                        </div>
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