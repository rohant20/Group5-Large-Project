import Product from "../Carousel/Product.js";
import { useContext, useEffect, useState } from "react";


import { PathContext } from "../../utils/PathProvider.js";
import { AuthContext } from "../../utils/AuthProvider.js";


interface Listing {
  name: string;
  price: number;
  description: string;
}
const EbayInven = () => {
  const serverPath: string = useContext(PathContext);

  const authInfo = useContext(AuthContext);

  if (!authInfo) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const [products, setProducts] = useState<Listing[]>([]);


  async function loadListings(username: string, filter: string, filterVal: string) {
    console.log(username);
    //Make sure to change the url when it goes on the server
    const apiURL: string = serverPath + "fetchListingsByUser"
    //stores the response from the api in a variable

    const payload: Object = {
      username: username,
      filter: filter,
      filterVal: filterVal
    }

    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const listings = await resp.json();
    //If the resp did not send back the expected data it throws an error
    //otherwise it will return the response
    if (resp.status == 500) {
      throw new Error("Server Error");
    } else {
      return listings;
    }
  }

  useEffect(() => {
    console.log(authInfo.auth.username);
    loadListings(authInfo.auth.username, "platform", "ebay").then(data => {
      console.log(data)
      setProducts([...data]);
    }).catch(err => {
      console.log(err);
    });
  }, [serverPath]);



  return (
    <div className="container">
      <div className="row">
        {products.map((item) => (
          <div className="col-md-4">
            <Product
              name={item.name}
              url="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              price={item.price}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default EbayInven;