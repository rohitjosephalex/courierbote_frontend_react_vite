import './Styles.css'
import './ResponsiveService.css'
import ServPic from '../../../src/assets/10098.jpg'

export const Working = ({scrollToElementRef}) => {
    return (
        <section className="services" ref={scrollToElementRef}>
            <div className="servicesWrapper">
                <div className="leftServices">
                    <img src={ServPic} alt='txt' />

                </div>

                <div className="rigthServices">
                    <h2 className='rightservices-heading'>How does CourierBote work?</h2>

                    <ul className='rightservices-li'>
                        <li className='rightservices-li'>We promptly pick up your order, no matter where you are. We package both individuals and commercial clients.</li>
                        <li className='rightservices-li'>Schedule a pickup.</li>
                        <li className='rightservices-li'>Your package will be picked up by our team.</li>
                    </ul>
                    <h2 className='rightservices-heading'>Services offered</h2>

                    <ul className='rightservice-ul'>
                        <li className='rightservices-li'>Packing and 24-hour pickup</li>
                        <li className='rightservices-li'>Regular updates from pickup to delivery</li>
                        <li className='rightservices-li'>Round-the-clock client assistance</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}