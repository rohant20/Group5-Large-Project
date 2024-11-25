import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Product from "./Product";
import { responsive } from "./Data";


import { PathContext } from "../../utils/PathProvider";
import { AuthContext } from "../../utils/AuthProvider";


interface Listing {
  title: string;
  price: number;
  description: string;
  contentType: string;
  data: string;
  condition: string;
  quantity: number;
  size: string;
  tags: string[];
  platform: string;
  _id: string;
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
    const apiURL: string = serverPath + "fetchListingsByUser"
    //stores the response from the api in a variable

    const payload: object = {
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
    } else if (!Array.isArray(listings)) {
      throw new Error("Unexpected API response format");
    } else {
      return listings;
    }

  }

  async function getImage(imageId: string) {
    //Make sure to change the url when it goes on the server
    const apiURL: string = serverPath + "convertImage"
    //stores the response from the api in a variable

    const payload: Object = {
      imageId: imageId,
    }
    console.log(Object);

    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const image = await resp.json();
    //If the resp did not send back the expected data it throws an error
    //otherwise it will return the response
    if (resp.status == 500) {
      throw new Error("Server Error");
    } else {
      return image;
    }
  }

  useEffect(() => {
    console.log(authInfo.auth.username);
    loadListings(authInfo.auth.username, "", "").then(data => {
      console.log(data)
      const updatedProducts = [...data];
      console.log(updatedProducts)
      for (let i = 0; i < data.length; i++) {
        getImage(data[i].images).then(img => {
          updatedProducts[i] = {
            ...updatedProducts[i],
            contentType: img.contentType,
            data: img.data,
          };
          setProducts([...updatedProducts]);
        }).catch(err => {
          console.log(err);
        })
      }

    }).catch(err => {
      console.log(err);
    });
  }, [serverPath, authInfo.auth.username]);



  return (
    <div>
      <Carousel showDots={true} responsive={responsive}>
        {products.map((item, index) => (
          <Product
            name={item.title}
            url={`data:${item?.contentType};base64,${item?.data}`}
            price={item.price}
            description={item.description}
            key={item.title + index}
            condition={item.condition}
            quantity={item.quantity}
            size={item.size}
            tags={item.tags}
            title={item.title}
            platform={item.platform}
            id={item._id}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselItem;
