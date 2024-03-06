import "./Styles.css";
import "./ResponsiveContact.css";
import ContactPic from "../../../src/assets/bloco_final_image.svg";

export const People = () => {
  return (
    <section className="contact">
      <div className="contatWrapper">
        <div className="leftContact">
          <div className="infosContact">
            <div className="email-container">
              <p className="greeting">Dear People,</p>
              <p className="content">
                First and foremost, thank you for choosing CourierBote. Our goal is to create a dependable, amiable platform that offers customers on-time services and affordable worldwide shipping.
              </p>
              <p className="content">
                Your happiness and requirements are what matter most to us.
              </p>
              <p className="closing">With Love,</p>
              <p className="signature">CourierBote</p>
            </div>
          </div>
        </div>
        <div className="rigthContact">
          <img src={ContactPic} alt="draw of two persons doing a hand shek" />
        </div>
      </div>
    </section>
  );
};
