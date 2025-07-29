"use client";
import React, { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { sendEmail } from "@/app/actions";

import data from "./jobContactData.json";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import "./JobContact.scss";
import { anim, FormAnim } from "@/lib/helpers/anim";

export default function JobContact() {
  const { top, form } = data;
  return (
    <section className="contact container" id="contact-job">
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
  const [loading, setLoading] = useState(false)

  const {
    sucessText,
    name,
    surname,
    email,
    phone,
    position,
    cvFile,
    message,
  } = data;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Ім'я повинно містити щонайменше 2 символи")
      .required("Це поле є обов'язковим"),
    surname: Yup.string()
      .min(2, "Прізвище повинно містити щонайменше 2 символи")
      .required("Це поле є обов'язковим"),
    email: Yup.string()
      .email("Невірний формат email")
      .required("Це поле є обов'язковим"),
    phone: Yup.string()
      .matches(/^[\+]?[1-10][\d]{0,15}$/, "Невірний формат телефону")
      .required("Це поле є обов'язковим"),
    position: Yup.string()
      .required("Це поле є обов'язковим"),
    cvFile: Yup.mixed()
      .test("fileSize", "Файл занадто великий (максимум 2MB)", function (value) {
        if (!value) return true; // File is optional
        return value.size <= 2 * 1024 * 1024; // 2MB in bytes
      })
      .test("fileType", "Підтримуються тільки файли PDF, DOC, DOCX", function (value) {
        if (!value) return true; // File is optional
        const supportedFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        return supportedFormats.includes(value.type);
      }),
    message: Yup.string(),
  });

  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    position: "",
    cvFile: null,
    message: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      // Format data for the email service
      const emailData = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        position: values.position,
        cvFile: values.cvFile?.name || "No file attached",
        message: values.message,
      };

      // Use the server action directly instead of fetch
      const result = await sendEmail(emailData);

      if (result.success) {
        console.log("Email sent successfully");
        setLoading(false);
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
              "form--loading": loading,
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
                  name="surname"
                  type="text"
                  placeholder={surname.text}
                  className={clsx("input", {
                    "input--error": errors.surname && touched.surname,
                  })}
                />
                <ErrorMessage
                  name="surname"
                  component="div"
                  className="input__error"
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
                  name="position"
                  type="text"
                  placeholder={position.text}
                  className={clsx("input", {
                    "input--error": errors.position && touched.position,
                  })}
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="input__error"
                />
              </div>
            </div>

            <div className="form__row">
              <div className="form__field form__field--full">
                <Field name="cvFile">
                  {({ field, form }) => (
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        id="cvFile"
                        accept=".pdf,.doc,.docx"
                        className={clsx("file-input", {
                          "file-input--error": errors.cvFile && touched.cvFile,
                        })}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          form.setFieldValue("cvFile", file);
                        }}
                      />
                      <label htmlFor="cvFile" className="file-input-label">
                        <span className="file-input-text">
                          {form.values.cvFile ? form.values.cvFile.name : cvFile.text}
                        </span>
                        <svg
                          className="file-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="14,2 14,8 20,8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </label>
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="cvFile"
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
                <h3>Відправити заявку</h3>
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
