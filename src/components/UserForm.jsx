import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addUser } from "../redux/slices/UsersSlice";
import "../styles/user-form.css";

const UserForm = () => {
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter name"),
    email: yup.string().required("Please enter email"),
    phone: yup.number().required("Please enter phone"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "" },
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      formikHelpers.setSubmitting(false);
      dispatch(addUser(values));
    },
  });

  return (
    <div className="section">
      <h2>Add new user</h2>

      <form
        className="form-label form-css-label "
        onSubmit={formik.handleSubmit}
      >
        <fieldset>
          <input
            id="name"
            name="name"
            type="text"
            required
            {...formik.getFieldProps("name")}
          />
          <label htmlFor="name">Name</label>
          <span>{formik.errors.name}</span>
        </fieldset>
        <fieldset>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="on"
            required
            {...formik.getFieldProps("email")}
          />
          <label htmlFor="email">Email</label>
          <span>{formik.errors.email}</span>
        </fieldset>
        <fieldset>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="on"
            required
            {...formik.getFieldProps("phone")}
          />
          <label htmlFor="phone">Phone</label>
          <span>{formik.errors.phone}</span>
        </fieldset>
        <button type="submit" disabled={formik.isSubmitting} className="btn btn-round b-level-2 b-type-4">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
