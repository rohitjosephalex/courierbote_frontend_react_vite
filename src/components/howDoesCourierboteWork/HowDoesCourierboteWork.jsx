import './Styles.css'
import './ResponsiveService.css'
import ServPic from '../../../src/assets/10098.jpg'

export const Working = () => {
    return (
        <section className="services">
            <div className="servicesWrapper">
                <div className="leftServices">
                    <img src={ServPic} alt='txt' />

                </div>

                <div className="rigthServices">
                    <h2>How does CourierBote work?</h2>

                    <ul>
                        <li>We promptly pick up your order, no matter where you are. We package both individuals and commercial clients.</li>
                        <li>Schedule a pickup.</li>
                        <li>Your package will be picked up by our team.</li>
                    </ul>
                    <h2>Services offered</h2>

                    <ul>
                        <li>Packing and 24-hour pickup</li>
                        <li>Regular updates from pickup to delivery</li>
                        <li>Round-the-clock client assistance</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}