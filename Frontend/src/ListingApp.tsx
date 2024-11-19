/*  
Documentation: https://formik.org/
https://formik.org/docs/guides/validation

Installation
You can install Formik with NPM, Yarn, or a good ol' <script> via unpkg.com.

NPM
Copy
 npm install formik --save

or

Copy
 yarn add formik

 then add npm install yup --save

 Validation
Formik is designed to manage forms with complex validation with ease. 
Formik supports synchronous and asynchronous form-level and field-level validation. 
Furthermore, it comes with baked-in support for schema-based form-level validation through Yup. This guide will describe the ins and outs of all of the above.

 https://formik.org/docs/guides/validation

Run app from ListingToolApp then it goes to each commponent in formCommponent

*/

import { useState } from "react";
import BasicForm from "./components/FormCommponents/AddForm";
import EbayForm from "./components/FormCommponents/EbayForm";
import GrailedForm, {  } from "./components/FormCommponents/GrailedForm";
import DepopForm from "./components/FormCommponents/DepopForm";
import "./components/FormCommponents/FomModule.css";

function ListingApp() {
  const [view, setView] = useState("basic");

  // Decide which component to render based on the `view` value
  // Switch between


  let formComponent;  
  switch(view) {
    case "basic":
      formComponent = <BasicForm />;
      break;
    case "ebay":
      formComponent = <EbayForm />;
      break;
    case "grailed":
      formComponent = <GrailedForm />;
      break;
      case "depop":
        formComponent = <DepopForm />;
        break;
    default:
      formComponent = null; // or some fallback component if needed
  }


  return (
    <div className="ListingApp">
      <nav>
      <h3
          onClick={() => setView("depop")}
          style={{ color: view === "depop" ? "#fff" : "" }}
        >
          Depop
        </h3>
        <h3
          onClick={() => setView("grailed")}
          style={{ color: view === "grailed" ? "#fff" : "" }}
        >
          Grailed
        </h3>
        <h3
          onClick={() => setView("ebay")}
          style={{ color: view === "ebay" ? "#fff" : "" }}
        >
          Ebay
        </h3>
        <h3
          onClick={() => setView("basic")}
          style={{ color: view === "basic" ? "#fff" : "" }}
        >
          Add
        </h3>
      </nav>
      {formComponent}
    </div>
  );
}

export default ListingApp;