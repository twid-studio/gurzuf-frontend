"use client";
import React, { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { sendEmail } from "@/app/actions";

import data from "./contactData.json";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import "./Contact.scss";
import { anim, FormAnim } from "@/lib/helpers/anim";

export default function Contact() {
  const { top, form } = data;
  return (
    <section className="contact container">
      <div className="top">
        <h1>{top.title}</h1>
        <p className="subtitle">{top.text}</p>
      </div>
      <FormSection data={form} />
    </section>
  );
}

const FormSection = ({ data }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    sucessText,
    name,
    company,
    country,
    industry,
    email,
    phone,
    message,
  } = data;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Ім'я повинно містити щонайменше 2 символи")
      .required("Це поле є обов'язковим"),
    company: Yup.string().required("Це поле є обов'язковим"),
    country: Yup.string().required("Оберіть країну"),
    industry: Yup.string().required("Оберіть індустрію"),
    email: Yup.string()
      .email("Невірний формат email")
      .required("Це поле є обов'язковим"),
    phone: Yup.string()
      .matches(/^[\+]?[1-10][\d]{0,15}$/, "Невірний формат телефону")
      .required("Це поле є обов'язковим"),
    message: Yup.string(),
  });

  const initialValues = {
    name: "",
    company: "",
    country: "",
    industry: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Find the text labels for country and industry
      const countryText =
        country.list.find((item) => item.value === values.country)?.text ||
        values.country;
      const industryText =
        industry.list.find((item) => item.value === values.industry)?.text ||
        values.industry;

      // Format data for the email service
      const emailData = {
        name: values.name,
        company: values.company,
        country: countryText,
        industry: industryText,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };

      // Use the server action directly instead of fetch
      const result = await sendEmail(emailData);

      if (result.success) {
        console.log("Email sent successfully");
        setSubmitted(true);
        resetForm();
      } else {
        console.error("Failed to send email:", result.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error (you might want to show an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isValid, dirty }) => (
        <div className="form-wrapper">
          <AnimatePresence>
            {submitted && (
              <motion.div
                {...anim(FormAnim.succes)}
                className="form-success-message"
              >
                <h2>{sucessText?.text}</h2>
                <p>{sucessText?.subText}</p>

                <button
                  className="form-success-message__button button button--white"
                  onClick={() => setSubmitted(false)}
                >
                  <h3>{sucessText?.buttonText}</h3>
                  <div className="button__arrow">
                    <svg
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <Form
            className={clsx("form", {
              "form--submitted": submitted,
            })}
          >
            <div className="form__row">
              <div className="form__field">
                <Field
                  name="name"
                  type="text"
                  placeholder={name.text}
                  className={clsx("input", {
                    "input--error": errors.name && touched.name,
                  })}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="input__error"
                />
              </div>

              <div className="form__field">
                <Field
                  name="company"
                  type="text"
                  placeholder={company.text}
                  className={clsx("input", {
                    "input--error": errors.company && touched.company,
                  })}
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="input__error"
                />
              </div>
            </div>

            <div className="form__row">
              <div className="form__field">
                <Field name="country">
                  {({ field, form }) => (
                    <select
                      {...field}
                      className={clsx("select-input", {
                        "select-input--error":
                          errors.country && touched.country,
                      })}
                    >
                      <option value="" disabled>
                        {country.text}
                      </option>
                      {country.list.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>

                <svg
                  className="select-input__arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9999 18.4141L3.2928 9.70695L4.707 8.29275L11.9999 15.5856L19.2928 8.29275L20.707 9.70695L11.9999 18.4141Z"
                  />
                </svg>

                <ErrorMessage
                  name="country"
                  component="div"
                  className="input__error select-input__error"
                />
              </div>

              <div className="form__field">
                <Field name="industry">
                  {({ field, form }) => (
                    <select
                      {...field}
                      className={clsx("select-input", {
                        "input--error": errors.industry && touched.industry,
                      })}
                    >
                      <option value="" disabled>
                        {industry.text}
                      </option>
                      {industry.list.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <svg
                  className="select-input__arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9999 18.4141L3.2928 9.70695L4.707 8.29275L11.9999 15.5856L19.2928 8.29275L20.707 9.70695L11.9999 18.4141Z"
                  />
                </svg>

                <ErrorMessage
                  name="industry"
                  component="div"
                  className="input__error select-input__error"
                />
              </div>
            </div>

            <div className="form__row">
              <div className="form__field">
                <Field
                  name="email"
                  type="email"
                  placeholder={email.text}
                  className={clsx("input", {
                    "input--error": errors.email && touched.email,
                  })}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="input__error"
                />
              </div>

              <div className="form__field">
                <Field
                  name="phone"
                  type="tel"
                  placeholder={phone.text}
                  className={clsx("input", {
                    "input--error": errors.phone && touched.phone,
                  })}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="input__error"
                />
              </div>
            </div>

            <div className="form__row">
              <div className="form__field form__field--full">
                <Field
                  name="message"
                  as="textarea"
                  placeholder={message.text}
                  className={clsx("textarea", {
                    "textarea--error": errors.message && touched.message,
                  })}
                  rows="5"
                />
              </div>
            </div>

            <div className="form__row">
              <button
                type="submit"
                className={clsx("form__button button button--white bold", {
                  "form__button--disabled": !isValid || !dirty,
                })}
                disabled={!isValid || !dirty}
              >
                <h3>Відправити</h3>
                <div className="button__arrow">
                  <svg
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.58807 16.3153L8.05398 14.7983L13.3807 9.47159H0V7.25568H13.3807L8.05398 1.9375L9.58807 0.411931L17.5398 8.36364L9.58807 16.3153Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
