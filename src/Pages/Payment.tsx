import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/Page/Payment/CheckOutForm";
import OrderSummary from "../Components/Page/Order/OrderSummary";
function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  // apiResult={apiResult} userInput={userInput}
  const stripePromise = loadStripe(
    "pk_test_51QWM4BSHZMtcXbMEKg9TSYAJ83UYgH7tmYP3EhkM5TzhkBHlOQd4vJPxLxK5Na81Ayum2VCdSiB90AHmBROkV23H00tCkZGxco"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options} >
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />{" "}
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <CheckoutForm data={apiResult} userInput={userInput}/>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
