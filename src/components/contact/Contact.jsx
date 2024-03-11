import "./Styles.css";
import "./ResponsiveContact.css";
import ContactPic from "../../../src/assets/contactus.svg";

export const Contact = () => {
  return (
    <section className="contact">
      <div className="contatWrapper">
        <div className="leftContacts">
          <div className="infosContact">
            <h2>Contact Us</h2>
            <p>Enter your email and we will get back to you</p>
            <div className="btnContact">
              <input type="text" placeholder="Enter your email"/>
              <button>Send</button>
            </div>
          </div>
        </div>
        <div className="rigthContacts">
          <img src={ContactPic} alt="draw of two persons doing a hand shek"  className="contactImage"/>
        </div>
      </div>
    </section>
  );
};
