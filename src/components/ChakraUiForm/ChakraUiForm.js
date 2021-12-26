import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_VALIDATION } from "../../utils/utils";

const ChakraUiForm = () => {
  const initValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [initialValue, setinitialValue] = useState(initValues);

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(REQUIRED_VALIDATION("Name")),
      email: yup.string().email().required(REQUIRED_VALIDATION("Email")),
      password: yup
        .string()
        .required(REQUIRED_VALIDATION("Password"))
        .min(6, "Password must be min 6 char long!"),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password
            ? field
                .required(REQUIRED_VALIDATION("Confirm Password"))
                .oneOf(
                  [yup.ref("password")],
                  "Password and Confirm Password must be same"
                )
            : field
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  const onSubmit = (values) => {
    console.log("Values::::::", values);
  };

  const onError = (error) => {
    console.log("Error:::::::", error);
  };

  return (
    <Box m="5">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" {...register("name")} />
          {errors && errors.name && (
            <FormHelperText color="red">
              {errors.name.message && errors.name.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input id="email" type="email" {...register("email")} />
          {errors && errors.email && (
            <FormHelperText color="red">
              {errors.email.message && errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input id="password" type="password" {...register("password")} />
          {errors && errors.password && (
            <FormHelperText color="red">
              {errors.password.message && errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors && errors.confirmPassword && (
            <FormHelperText color="red">
              {errors.confirmPassword.message && errors.confirmPassword.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ChakraUiForm;
