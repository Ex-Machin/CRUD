import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addUser, getErrorMessage } from "../redux/slices/UsersSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(getErrorMessage)
  const validationSchema = yup.object().shape({
    name: yup.string().required("Пожалуйста введите имя"),
    email: yup.string().required("Пожалуйста введите эмеил"),
    phone: yup.number().required("Пожалуйста введите телефон"),
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
    <div>
      <div>
        <h1>Добавь нового сотрудника</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="name-field">
            <label htmlFor="name">
              Введите имя<span>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              {...formik.getFieldProps("name")}
              //isInvalid={formik.touched.phone && !!formik.errors.phone}
            />
            <span>{formik.errors.name}</span>
          </div>
          <div className="email-field">
            <label htmlFor="email">
              Введите почту<span>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="on"
              required
              {...formik.getFieldProps("email")}
              //isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <span>{formik.errors.email}</span>
          </div>
          <div className="phone-field">
            <label htmlFor="phone">
              Введите номер телефона<span>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="on"
              required
              {...formik.getFieldProps("phone")}
              //isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <span>{formik.errors.phone}</span>
          </div>
          {errorMessage}
          <button type="submit" disabled={formik.isSubmitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
