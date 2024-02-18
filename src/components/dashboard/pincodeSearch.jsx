import { useState } from "react";
import {
    ErrorText
} from "../signup/components/accountBox/common";
import courierBoteWhiteText from '../../assets/courierbote logo white transparent.png';

function PincodeSearch({ setProceedToAddress,pincode }) {
    const localPincode = [641001, 641002, 641003, 641004, 641005, 641006, 641007, 641008, 641009, 641010, 641011, 641012, 641013, 641014, 641015, 641016, 641017, 641018, 641021, 641022, 641023, 641024, 641025, 641026, 641027, 641028, 641029, 641030, 641031, 641033, 641034, 641035, 641036, 641037, 641038, 641041, 641042, 641043, 641044, 641045, 641046, 641048, 641049, 641103, 641105, 641108, 642128]
    const [pickupPincode, setPickupPincode] = useState(pincode);
    const [dropPincode, setDropPincode] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");
    const handleProceed = async () => {
        try {
            if (localPincode.includes(parseInt(pickupPincode))&&dropPincode) {
                setButtonLoading(true);
                // Assume search is successful
                // You can replace this with your actual search logic
                // In this example, we're setting isSuccess to true after 2 seconds

                setProceedToAddress(true);
                await new Promise(resolve => setTimeout(resolve, 100));
                setButtonLoading(false);
                // Set proceedToAddress to true if search is successful
                document.getElementById('address-card').scrollIntoView({ behavior: 'smooth' }); // Scroll to AddressCard section
                setError("")
            }
            else if(!pickupPincode||!dropPincode){
                setError('Please Enter Both The Pincodes'); 
            }
            else {
                setError('Sorry Service at this pincode is currently unavailable');
            }
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setButtonLoading(false);
        }
    }
    return (
        <div>
            <div className='pincode-entry'>
                {/* <div className="pincode-heading">Courierbote</div> */}
                <img src={courierBoteWhiteText} alt="CourierBote Logo"  style={{
                width: window.innerWidth > 768 ? '20vw' : '65vw', // 50px for larger screens, 35px for mobile view
                height: 'auto',
                marginTop: '5px',
                paddingTop: window.innerWidth > 768 ? '5px':"5px"
            }}/>
                <div className="pincode-desc">Moving Customers With Care</div>
                <div className="pincode-inputs">
                    <div >
                        <label className='label'>
                            <input
                                className='input corporate' // Changed class name here
                                maxLength="6"
                                type='number'
                                id='pickup-pincode'
                                placeholder='Pickup Pincode'
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={pickupPincode}
                                onChange={(e) => setPickupPincode(e.target.value)}
                            />
                        </label>
                    </div>
                    <div >
                        <label className='label'>
                            <input
                                className='input corporate' // Changed class name here
                                maxLength="6"
                                pattern="[0-9]*"
                                type='number'
                                inputMode="numeric"
                                id='drop-pincode'
                                placeholder='Destination Pincode'
                                value={dropPincode}
                                onChange={(e) => setDropPincode(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="button-class">
                    <button
                        id='calculate-button'
                        className='btn btn-primary'
                        style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}
                        onClick={handleProceed}
                    >
                        {!buttonLoading ? 'Proceed' : 'loading...'}
                    </button>
                    {error && (
                        <div className="error-text-container">
                            <p className="error-text">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PincodeSearch;
