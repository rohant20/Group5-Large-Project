import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import style from './Product.module.css';

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
}

const Product: React.FC<ProductProps> = ({ url, name, price, description, condition, quantity, size, tags, title, platform }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
    setEditMode(false);
  }

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
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
          <form>
            <h2>Edit Product</h2>
            <label>
              Name:
              <input type="text" defaultValue={name} />
            </label>
            <label>
              Price:
              <input type="number" defaultValue={price} />
            </label>
            <label>
              Description:
              <textarea defaultValue={description}></textarea>
            </label>
            <label>
              Condition:
              <input type="text" defaultValue={condition} />
            </label>
            <label>
              Size:
              <input type="text" defaultValue={size} />
            </label>
            <div className={style.row}>
              <button type="button" onClick={toggleEditMode}>
                Cancel
              </button>
              <button type="submit">Save</button>
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
