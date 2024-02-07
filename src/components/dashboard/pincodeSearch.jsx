import { useState } from "react";

function PincodeSearch({setProceedToAddress}) {
    const [pickupPincode, setPickupPincode] = useState("");
    const [dropPincode, setDropPincode] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const handleProceed = async () => {
        try {
            setButtonLoading(true);
            // Assume search is successful
            // You can replace this with your actual search logic
            // In this example, we're setting isSuccess to true after 2 seconds

            setProceedToAddress(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setButtonLoading(false);
     // Set proceedToAddress to true if search is successful
            document.getElementById('address-card').scrollIntoView({ behavior: 'smooth' }); // Scroll to AddressCard section
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setButtonLoading(false);
        }
    }
    return (
        <div>
            <div className='pincode-entry'>
                <div className="pincode-heading">courierBote</div>
                <div className="pincode-desc">An Efficient Digital Shipping Solution</div>
                <div className="pincode-inputs">
                    <div >
                        <label className='label'>
                            <input
                                className='input corporate' // Changed class name here
                                maxLength="6"
                                type='text'
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
                                type='text'
                                inputMode="numeric"
                                id='drop-pincode'
                                placeholder='Destination Pincode'
                                value={dropPincode}
                                onChange={(e) => setDropPincode(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <button
                        id='calculate-button'
                        className='btn btn-primary'
                        style={{ pointerEvents: buttonLoading ? 'none' : 'auto' }}
                        onClick={handleProceed}
                    >
                        {!buttonLoading ? 'Proceed' : 'loading...'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PincodeSearch;
