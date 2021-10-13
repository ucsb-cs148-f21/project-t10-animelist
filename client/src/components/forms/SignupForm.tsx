import * as React from 'react';
import { Formik, Form, Field, useFormik } from "formik";
import { Button, FormControl, FormLabel, Input, FormErrorMessage, Checkbox, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../../generated/graphql';
import { ApolloError } from '@apollo/client';

const SignupForm: React.FC<{}> = () => {

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must be at most 20 characters long')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], 'Passwords do not match')
      .required('Required'),
    termsAndConditions: Yup.boolean()
      .oneOf([true], 'You must agree to the terms and conditions')
  });

  const router = useRouter();
  const [register] = useRegisterMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAndConditions: false
    },
    validationSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      register({
        variables: {
          input: {
            username: values.username,
            email: values.email,
            password: values.password,
          }
        }
      }).then(response => {
        router.push("/login");
      }).catch((err: ApolloError) => {
        toast({
          status: "error",
          description: err.message,
          duration: 5000
        });
      }).finally(() => { actions.setSubmitting(false) });
    }
  });
  const toast = useToast();

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={formik.errors.username && formik.touched.username} isRequired>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input id="username" {...formik.getFieldProps("username")} placeholder="username" />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.errors.email && formik.touched.email} isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input {...formik.getFieldProps("email")} id="email" placeholder="email" />
        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.errors.password && formik.touched.password} isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input {...formik.getFieldProps("password")} type="password" id="password" placeholder="password" />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm} isRequired>
        <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
        <Input {...formik.getFieldProps("passwordConfirm")} type="password" id="passwordConfirm" placeholder="passwordConfirm" />
        <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.errors.termsAndConditions && formik.touched.termsAndConditions} isRequired>
        <FormLabel htmlFor="termsAndConditions">Terms and Conditions</FormLabel>
        <Checkbox {...formik.getFieldProps("termsAndConditions")} id="termsAndConditions">I agree to the Terms and Conditions</Checkbox>
        <FormErrorMessage>{formik.errors.termsAndConditions}</FormErrorMessage>
      </FormControl>
      <Button
        mt={6}
        isLoading={formik.isSubmitting}
        type="submit"
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;
