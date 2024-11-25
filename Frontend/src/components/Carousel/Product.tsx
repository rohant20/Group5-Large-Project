import React, {useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Product.module.css';

import { PathContext } from '../../utils/PathProvider';


interface ProductProps {
  url: string;
  name: string;
  price: number;
  description: string;
  condition: string;
  quantity: number;
  size: string;
  tags: string[];
  title: string;
  platform: string;
  id: string;
}

const Product: React.FC<ProductProps> = ({ url, name, price, description, condition, quantity, size, tags, title, platform, id}) => {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  //set and getters for edit
  const [newName,setNewName] = useState("");
  const[newPrice, setNewPrice] = useState("");
  const[newDescrp, setNewDescrp] = useState("");
  const[newCond, setNewCond] = useState("");
  const[newSize, setNewSize] = useState("");

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setEditMode(false);
  }

  const toggleEditMode = () => {
    if(!isEditMode) {  
      setNewName(name);
      setNewPrice(price.toString()); 
      setNewDescrp(description);
      setNewCond(condition);
      setNewSize(size);
    }
    setEditMode(!isEditMode);
    
  }

  //handles for the edit form

  const handleNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);
  }

  const handleNewPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPrice(value);
  }

  const handleNewDescrp = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewDescrp(value);
  }
 
  const handleNewCond = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewCond(value);
  }

  const handleNewSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewSize(value);
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      name: newName,
      price: newPrice,
      description: newDescrp,
      condition: newCond,
      size: newSize,
    };
  
    console.log('Updated product:', updatedProduct);
    // Add your save logic here (e.g., send the updated data to the backend)
  };

  //delete function

  const serverPath: string = useContext(PathContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccesMessage] = useState<string | null>(null);

  function deleteList(e: React.FormEvent, id: string) {
    e.preventDefault();

    //temporary user object that is used to interact with the API

    
    //Fetch function call
    deleteCall(id).then(data => {
      console.log(data);
      setSuccesMessage("Deleted succesfully")
    }).catch(err => {
      setErrorMessage(err.message);
    });


  }

  async function deleteCall(id: string) {
    console.log(id);
    //Make sure to change the url when it goes on the server
    const apiURL = serverPath + "/deleteListing"
    //stores the response from the api in a variable
    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    });

    const stat = await resp.json();
    //If the resp did not send back the expected data it throws an error
    //otherwise it will return the response
    if (resp.status == 500) {
      throw new Error("Invalid Email");
    } else {
      return stat;
    }
  }


  const popup = isPopupVisible && (
    <div
      className={style.popupOverlay}
      role="dialog"
      aria-modal="true"
      onClick={togglePopup} // Close on overlay click
    >
      <div
        className={style.popupContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        {isEditMode ? (
          <form className={style.editForm} onSubmit={handleSave}>
          <h2>Edit Product</h2>
          <div className={style.formGroup}>
            <label htmlFor="name">Name:</label>
            <input 
              id="name" 
              type="text" 
              value={newName} 
              onChange={handleNewName} 
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="price">Price:</label>
            <input 
              id="price" 
              type="number" 
              value={newPrice} 
              onChange={handleNewPrice} 
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description" 
              value={newDescrp} 
              onChange={handleNewDescrp} 
            ></textarea>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="condition">Condition:</label>
            <input 
              id="condition" 
              type="text" 
              value={newCond} 
              onChange={handleNewCond} 
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="size">Size:</label>
            <input 
              id="size" 
              type="text" 
              value={newSize} 
              onChange={handleNewSize} 
            />
          </div>
          <div className={style.row}>
            <button 
              type="button" 
              onClick={toggleEditMode} 
              className={style.closeButton}
            >
              Cancel
            </button>
            <button
              type="button"
              className={style.deleteButton}
              onClick={deleteList(event,id)}
            >
              Delete
            </button>
            <button 
              type="submit" 
              className={style.editButton}
            >
              Save
            </button>
          </div>
        </form>
        ) : (
          <>
            <h2>{name}</h2>
            <h3>Qty: {quantity}</h3>
            <div className={style.row}>
              <h6 className={style.plat}>Selling on {platform}</h6>
              {title === 'Accessories' ? (
                <h6 className={style.size}>Size: {size}</h6>
              ) : (
                <h6 className={style.size}>
                  {title.endsWith('s') ? title.slice(0, -1) : title} Size: {size}
                </h6>
              )}
            </div>
            <div className={style.row}>
              <h6>Cond: {condition}</h6>
            </div>
            <img className={style.image} src={url} alt="product image" />
            <p className={style.price}>${price}</p>
            <p>{description}</p>
            <h6 className={style.tag}>
              Tags: &nbsp;
              <div className={style.line}>
                {tags.map((tag, index) => (
                  <span key={index} className={style.tagItems}>
                    [{tag}]
                  </span>
                ))}
              </div>
            </h6>
            <div className={style.row}>
              <button onClick={togglePopup} className={style.closeButton}>
                Close
              </button>
              <button onClick={toggleEditMode} className={style.editButton}>
                Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );



  return (
    <>
      <div className={style.card}>
        <img className={style.image} src={url} alt="product image" />
        <h2 className={style.name}>{name}</h2>
        <p className={style.price}>{`$${price}`}</p>
        <p>{description.substring(0, 50) + "..."}</p>
        <p>
          <button onClick={togglePopup}>View Listing</button>
        </p>
      </div>
      {isPopupVisible && ReactDOM.createPortal(popup, document.body)}
    </>
  );
};

export default Product;
