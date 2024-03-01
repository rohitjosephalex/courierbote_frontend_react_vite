import './Styles.css'
import './ResponsiveService.css'
import ServPic from '../../../src/assets/bloco_services.svg'

export const BestServices = () => {
    return (
        <section className="services">
            <div className="servicesWrapper">
                <div className="leftServices">
                    <img src={ServPic} alt='txt' />

                </div>

                <div className="rigthServices">
                    <h2>How does CourierBote work?</h2>

                    <p>We promptly pick up your order, no matter where you are. We package both individuals and commericl clients</p>

                    <p>Schedule a pickup</p>

                    <p>Your package will be picked up by our team</p>
                    <h2>Services offered</h2>

                    <p>Packing and 24 hour pickup</p>

                    <p>Regular updates from pickup to delivery</p>

                    <p>Round the clock client assistance</p>
                </div>
            </div>
        </section>
    )
}