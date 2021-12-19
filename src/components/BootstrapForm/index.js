import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_VALIDATION } from "../../utils/utils";
import { Form, Button, Container } from "react-bootstrap";

const BootstrapForm = () => {
  const initState = {
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
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
      termsAndConditions: yup.boolean().oneOf([true], "Must be Checked!"),
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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <Form.Text className="text-danger">
              {errors.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Accept Terms & conditions"
            {...register("termsAndConditions")}
          />
          {errors.termsAndConditions && (
            <Form.Text className="text-danger">
              {errors.termsAndConditions.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default BootstrapForm;
