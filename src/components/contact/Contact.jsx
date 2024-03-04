import "./Styles.css";
import "./ResponsiveContact.css";
import ContactPic from "../../../src/assets/bloco_final_image.svg";

export const Contact = () => {
  return (
    <section className="contact">
      <div className="contatWrapper">
        <div className="leftContact">
          <div className="infosContact">
            <div>
              <p>Dear People,</p>
              <p>
                First and foremost, thank you for Choosing CourierBote.
                Our goal is to create a dependable, amiable platform that offers customers on-time services and affordable worldwide shipping.
              </p>
              <p>
                Your happiness and requirements are what matter most to us.
              </p>
              <p>
                With Luv
              </p>
              <p>
                CourierBote
              </p>
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
