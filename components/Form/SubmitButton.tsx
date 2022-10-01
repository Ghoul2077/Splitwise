import React from "react";
import { FormikValues, useFormikContext } from "formik";
import AppButton, { AppButtonProps } from "../AppButton";

export default function SubmitButton({
  ...others
}: Omit<AppButtonProps, "onPress">) {
  const { handleSubmit } = useFormikContext<FormikValues>();

  return <AppButton onPress={handleSubmit} {...others} />;
}
