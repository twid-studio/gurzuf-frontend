"use client";
import React, { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { sendJobApplication } from "@/app/actions";

import data from "./jobContactData.json";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import "./JobContact.scss";
import { anim, FormAnim } from "@/lib/helpers/anim";

export default function JobContact() {
  const { top, form } = data;
  return (
    <section className="contact container" id="contact">
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
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");

  const { sucessText, name, surname, email, phone, position, cvFile, message } =
    data;

  // File validation helper function
  const validateFile = (file) => {
    if (!file) {
      return "CV файл є обов'язковим";
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      return "Файл занадто великий (максимум 2MB)";
    }

    // Check file type
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    const supportedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const supportedExtensions = ["pdf", "doc", "docx"];

    // Check both MIME type and file extension
    const hasValidMimeType = supportedMimeTypes.includes(file.type);
    const hasValidExtension = supportedExtensions.includes(fileExtension);

    if (!hasValidMimeType && !hasValidExtension) {
      return "Підтримуються тільки файли PDF, DOC, DOCX";
    }

    return null; // No error
  };

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
      .matches(/[1-10][\d]{0,15}$/, "Невірний формат телефону")
      .required("Це поле є обов'язковим"),
    position: Yup.string().required("Це поле є обов'язковим"),
    cvFile: Yup.mixed()
      .required("CV файл є обов'язковим")
      .test(
        "fileSize",
        "Файл занадто великий (максимум 2MB)",
        (value) => value && value.size <= 2 * 1024 * 1024
      )
      .test(
        "fileFormat",
        "Підтримуються тільки файли PDF, DOC, DOCX",
        (value) => {
          if (!value) return false;
          const fileName = value.name.toLowerCase();
          const fileExtension = fileName.split(".").pop();
          const supportedMimeTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ];
          const supportedExtensions = ["pdf", "doc", "docx"];
          const hasValidMimeType = supportedMimeTypes.includes(value.type);
          const hasValidExtension = supportedExtensions.includes(fileExtension);
          return hasValidMimeType || hasValidExtension;
        }
      ),
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
      // Convert file to base64 if exists
      let fileData = null;
      if (values.cvFile) {
        const fileBuffer = await values.cvFile.arrayBuffer();
        const base64String = Buffer.from(fileBuffer).toString("base64");
        fileData = {
          name: values.cvFile.name,
          data: base64String,
          contentType: values.cvFile.type,
          size: values.cvFile.size,
        };
      }

      // Format data for the email service
      const emailData = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        position: values.position,
        cvFile: fileData,
        message: values.message,
      };

      // Use the server action directly instead of fetch
      const result = await sendJobApplication(emailData);

      if (result.success) {
        console.log("Job application email sent successfully");
        setLoading(false);
        setSubmitted(true);
        resetForm();
      } else {
        console.error("Failed to send job application email:", result.error);
        setLoading(false);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error sending job application email:", error);
      setLoading(false);
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
                        id="cvFile"
                        name="cvFile"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.currentTarget.files.length > 0) {
                            const file = e.currentTarget.files[0];
                            const error = validateFile(file);
                            if (!error) {
                              setFilename(file.name);
                              setFileError("");
                              form.setFieldValue("cvFile", file);
                            } else {
                              setFileError(error);
                              setFilename("");
                              form.setFieldValue("cvFile", null);
                            }
                          } else {
                            setFilename("");
                            setFileError("");
                            form.setFieldValue("cvFile", null);
                          }
                        }}
                      />
                      <label
                        htmlFor="cvFile"
                        className={clsx("file-input-label", {
                          "file-input-label--error": fileError,
                          "file-input-label--active": filename,
                        })}
                      >
                        <span className="file-input-text">
                          {fileError ? fileError : filename || cvFile.text}
                        </span>
                        <span
                          className="file-input-button"
                          data-hide-for-mobile
                        >
                          {cvFile.buttonText}
                        </span>
                      </label>
                    </div>
                  )}
                </Field>
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