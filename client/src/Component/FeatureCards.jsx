import React from "react";
import "../Styles/FeatureCard.css"; // Make sure to include the necessary CSS styles
import ss1 from "../assets/ss0.png";
import ss2 from "../assets/ss2.png";
import ss3 from "../assets/ss3.png";
import ss4 from "../assets/image.png";

const Fcard = () => {
  return (
    <div className="container">
      <h2 className="title">Turn Numbers into Narratives</h2>

      <div className="features">
        {/* First Large Card */}

        <div className="feature large side">
          <h3>Create Multiple Accounts</h3>
          <p>
            Effortlessly manage various accounts tailored to your needs
            Effortlessly manage various accounts tailored to your financial
            needs. Whether it's for personal expenses, savings, or business, our
            app allows you to categorize and oversee each account seamlessly.
          </p>

          <div className="image-placeholder">
            <img src={ss1} alt="Mobile Screenshot" />
          </div>
        </div>

        {/* Two Small Cards in Between */}

        <div className="feature large">
          <div className="small-cards">
            <div className="feature small">
              <h3>Transaction Management</h3>
              <p>
                View all your transactions in one place, making it easy to track
                your spending. Our intuitive interface allows you to categorize
                and filter transactions, ensuring you always have a clear
                picture of where your money is going. Say goodbye to financial
                chaos and hello to clarity!{" "}
              </p>

              <img style={{ marginTop: "26px" }} src={ss2}></img>
            </div>

            <div id="third" className="feature small">
              <h3>Budget Creation & Tracking</h3>
              <p>
                Set budgets for specific goals and monitor your progress toward
                achieving them Set budgets for specific goals and monitor your
                progress toward achieving them. Create personalized budgets for
                categories like groceries, entertainment, or savings. Empower
                yourself to reach your financial goals with confidence!
              </p>

              <img style={{ marginTop: "16px" }} src={ss4}></img>
            </div>
          </div>
        </div>

        {/* Second Large Card */}
        <div className="feature large side">
          <h3>Comprehensive Insights</h3>
          <p>
            Access your account and budget balance history over time with
            detailed graphs and charts Visualize your financial journey through
            interactive data, helping you understand trends and make informed
            decisions. With our insights, you’ll always know your financial
            standing!
          </p>
          <div className="image-placeholder">
            <img src={ss3} alt="Code Screenshot" />
          </div>
        </div>
      </div>

      <div id="fourth" className="feature second">
        <div className="feature second inner">
          <div style={{ maxWidth: "50%" }}>
            {" "}
            <h3>Budget Creation & Tracking</h3>
            <p>
              Set budgets for specific goals and monitor your progress toward
              achieving them Set budgets for specific goals and monitor your
              progress toward achieving them. Create personalized budgets for
              categories like groceries, entertainment, or savings. Empower
              yourself to reach your financial goals with confidence!
            </p>
          </div>
          <div>
            {" "}
            <img id="fourthimg" src={ss4}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fcard;
