import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../../style/Form.module.css";
import { Link, useNavigate } from 'react-router-dom';

import { PathContext } from "../../utils/PathProvider.js";
import { AuthContext } from "../../utils/AuthProvider.js";
import { useContext } from "react";
import ResetPg from "../../routes/ResetPass.js";
// Define the form values interface


// BasicForm component
const BasicForm = () => {

  const serverPath: string = useContext(PathContext);
  const authInfo = useContext(AuthContext);

  if (!authInfo) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const navigate = useNavigate();

  interface FormValues {
    title: string;
    size: string;
    price: number;
    quantity: number;
    condition: string;
    image: File | null; // File for the uploaded image
    platform: string[];
  }

  // Validation schema
  const basicSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    size: yup
      .string()
      .oneOf(["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"
      ], "Invalid size")
      .required("Size is required"),
    price: yup
      .number()
      .min(1, "Price must be greater than $1")
      .required("Price is required"),
    quantity: yup
      .number()
      .min(1, "Quantity must be greater than 0")
      .required("Quantity is required"),
    condition: yup
      .string()
      .oneOf(["New", "Used", "Pre-worn", "Brand New"], "Invalid condition")
      .required("Condition is required"),
    image: yup
      .mixed<File>()
      .required("Image is required")
      .test(
        "fileSize",
        "File too large (max 5MB)",
        (file: File | null) =>
          file ? file.size <= 5 * 1024 * 1024 : true // File size validation
      )
      .test(
        "fileType",
        "Unsupported file format (only JPEG, PNG allowed)",
        (file: File | null) =>
          file
            ? ["image/jpeg", "image/png"].includes(file.type) // File type validation
            : true
      ),
    platform: yup
      .array()
      .of(yup.string().oneOf(["ebay", "grailed", "depop"]))
      .min(1, "Select at least one platform")
      .required("Platform is required"),
  });



  // onSubmit function
  const onSubmit = async (values: FormValues, actions: any) => {
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("username", authInfo.auth.username)
    formData.append("title", values.title);
    formData.append("size", values.size);
    formData.append("price", values.price.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("condition", values.condition);
    formData.append("image", values.image!); // Non-null assertion
    formData.append("platform", JSON.stringify(values.platform)); // Append selected platforms

    console.log(formData);

    try {
      const response = await fetch(serverPath + "generateListing", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/inventory")
      } else {
        console.log(response);
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    actions.resetForm();
  };


  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik<FormValues>({
    initialValues: {
      title: "",
      size: "",
      price: 0.0,
      quantity: 0,
      condition: "",
      image: null,
      platform: [], // Initialize as an empty array
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="title">Title of Item</label>
      <input
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        id="title"
        type="text"
        className={errors.title && touched.title ? "input-error" : ""}
        placeholder="Enter the name of the Item"
      />
      {errors.title && touched.title && <p className="error">{errors.title}</p>}

      <label htmlFor="size">Size</label>
      <input
        name="size"
        value={values.size}
        onChange={handleChange}
        onBlur={handleBlur}
        id="size"
        type="text"
        placeholder="Enter size (e.g., 's', 'm', 'l')"
        className={errors.size && touched.size ? "input-error" : ""}
      />
      {errors.size && touched.size && <p className="error">{errors.size}</p>}

      <label htmlFor="price">Price</label>
      <input
        name="price"
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
        id="price"
        type="number"
        placeholder="Enter price (must be > $1)"
        className={errors.price && touched.price ? "input-error" : ""}
      />
      {errors.price && touched.price && <p className="error">{errors.price}</p>}

      <label htmlFor="quantity">Quantity</label>
      <input
        name="quantity"
        value={values.quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        id="quantity"
        type="number"
        placeholder="Enter quantity (must be > 0)"
        className={errors.quantity && touched.quantity ? "input-error" : ""}
      />
      {errors.quantity &&
        touched.quantity && <p className="error">{errors.quantity}</p>}

      <label htmlFor="condition">Condition</label>
      <input
        name="condition"
        value={values.condition}
        onChange={handleChange}
        onBlur={handleBlur}
        id="condition"
        type="text"
        placeholder="Enter condition (New or Used)"
        className={errors.condition && touched.condition ? "input-error" : ""}
      />
      {errors.condition &&
        touched.condition && <p className="error">{errors.condition}</p>}

      <label htmlFor="image">Image</label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          setFieldValue("image", file); // Update the image value in form state
        }}
        onBlur={handleBlur}
        className={errors.image && touched.image ? "input-error" : ""}
      />

      {errors.image && touched.image && <p className="error">{errors.image}</p>}

      <label htmlFor="platform">Platform Selection</label>
      <div className="container">
        <div className="row">
          {["ebay", "grailed", "depop"].map((platform) => (
            <div className="col-4" key={platform}>
              <label>
                <input
                  type="checkbox"
                  name="platform"
                  value={platform}
                  checked={values.platform.includes(platform)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (e.target.checked) {
                      // Add platform to the array
                      setFieldValue("platform", [...values.platform, value]);
                    } else {
                      // Remove platform from the array
                      setFieldValue(
                        "platform",
                        values.platform.filter((p) => p !== value)
                      );
                    }
                  }}
                />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
      {errors.platform && touched.platform && (
        <p className="error">{errors.platform}</p>
      )}

      <button
        className={styles.subBtn}
        disabled={isSubmitting}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default BasicForm;
