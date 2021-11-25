import { 
    Input, 
    Radio, 
    Stack,
    VStack,
    Button,
    Select,
    Heading,
    FormControl, 
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    RadioGroup,
    Center,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";

import * as React from 'react';
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';

const ChooseRatingModalForm: React.FC<{}> = () => {

    // Leaving it here for later, a rating system must be selected
    const validationSchema = Yup.object({

    });

    const formik = useFormik({
      initialValues:{
        ratingSystem: "",
      },
      validationSchema,
      onSubmit: async values => {
        window.location.reload();
      }
    });
    return(
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={{ base: 8, md: 6 }}>
            <Select size="lg" placeholder="RatingSystem"/>
            <Center>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
            </Center>
          </Stack>
        </form>
    );
}

export default ChooseRatingModalForm;