import React from "react";
import { Formik, FormikConfig, FormikValues } from "formik";

export default function AppForm<
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
>(props: FormikConfig<Values> & ExtraProps) {
  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      validateOnMount={false}
      {...props}
    >
      {() => <>{props.children}</>}
    </Formik>
  );
}
