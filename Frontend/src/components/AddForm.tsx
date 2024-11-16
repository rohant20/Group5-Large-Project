import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";

// Validation Schema
const basicSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  size: yup
    .string()
    .oneOf(["xs", "s", "m", "l", "xl", "xxl", "xxxl"], "Invalid size")
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
    .oneOf(["New", "Used"], "Invalid condition")
    .required("Condition is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File too large (max 5MB)", (file) =>
      file ? file.size <= 5 * 1024 * 1024 : true
    )
    .test(
      "fileType",
      "Unsupported file format (only JPEG, PNG allowed)",
      (file) =>
        file
          ? ["image/jpeg", "image/png"].includes(file.type)
          : true
    ),
});

// OnSubmit Function
const onSubmit = async (values, actions) => {
  const formData = new FormData();

  // Append form fields to the FormData object
  formData.append("title", values.title);
  formData.append("size", values.size);
  formData.append("price", values.price.toString());
  formData.append("quantity", values.quantity.toString());
  formData.append("condition", values.condition);
  formData.append("image", values.image); // Append the image file

  try {
    const response = await fetch("https://your-api-endpoint.com/submit", {
      method: "POST",
      body: formData, // Send as FormData
    });

    if (response.ok) {
      console.log("Form submitted successfully");
    } else {
      console.error("Failed to submit form");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }

  // Reset the form after submission
  actions.resetForm();
};

// Component
const BasicForm = () => {
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      title: "",
      size: "",
      price: "",
      quantity: "",
      condition: "",
      image: null,
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

      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
};

export default BasicForm;
