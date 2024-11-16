import { useState } from "react";
import BasicForm from "./components/AddForm";
import EbayForm from "./components/EbayForm";
import GrailedForm, {  } from "./components/GrailedForm";
import DepopForm from "./components/DepopForm";
import "./App.css";

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