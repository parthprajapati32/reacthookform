import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_VALIDATION } from "../../utils/utils";

const SimpleForm = () => {
  const initState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [initialValues, setInitialValues] = useState(initState);

  const validationSchema = yup
    .object({
      email: yup.string().email().required(REQUIRED_VALIDATION("Email")),
      password: yup.string().min(6).required(REQUIRED_VALIDATION("password")),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password
            ? field
                .required(REQUIRED_VALIDATION("Confirm Password"))
                .oneOf([yup.ref("password")])
            : field
        ),
    })
    .required();

  const onSubmit = (values) => {
    console.log("Values:::", values);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 100px",
      }}
    >
      <label>Email:</label>
      <input
        type="email"
        placeholder="Enter Email here..."
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter password here..."
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Confirm Password:</label>
      <input
        type="password"
        placeholder="Enter confirm password here..."
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
