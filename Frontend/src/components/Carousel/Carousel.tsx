import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Product from "./Product";
import { responsive } from "./Data";


import { PathContext } from "../../utils/PathProvider";
import { AuthContext } from "../../utils/AuthProvider";


interface Listing {
  name: string;
  price: number;
  description: string;
}

const CarouselItem: React.FC = () => {
  const serverPath: string = useContext(PathContext);

  const authInfo = useContext(AuthContext);

  if (!authInfo) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const [products, setProducts] = useState<Listing[]>([]);


  async function loadListings(username: string, filter: string, filterVal: string) {
    console.log(username);
    //Make sure to change the url when it goes on the server
    const apiURL: string = serverPath + "getinventory"
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
    loadListings(authInfo.auth.username, "", "").then(data => {
      console.log(data)
      setProducts(data);
    }).catch(err => {
      console.log(err);
    });
  }, [serverPath]);



  return (
    <div>
      {/* <div className="conatiner">
        <div className={`row`}>
          <div className="col-md-6">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter By
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-md-6">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Filter Value"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Filter
              </Button>
            </InputGroup>
          </div>
        </div>
      </div> */}



      <Carousel showDots={true} responsive={responsive}>
        {products.map((item) => (
          <Product
            name={item.name}
            url="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            price={item.price}
            description={item.description}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselItem;
