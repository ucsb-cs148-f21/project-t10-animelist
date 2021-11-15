import { 
    Input, 
    Radio, 
    Stack, 
    Button,
    Heading,
    FormControl, 
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    RadioGroup
} from "@chakra-ui/react";

import * as React from 'react';
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';

// name: String!
// type: String!
// lowerBound: Int!
// upperBound: Int!
// labels: [String!]!
// subrating: String!
// subratings: [Subrating!]!

const CreateRatingSystemForm: React.FC<{}> = () => {

    const validationSchema = Yup.object({
        name: Yup.string()
          .min(3, 'Name must be at least 3 characters long')
          .max(20, 'Name must be at most 20 characters long')
          .required('Required'),
        type: Yup.string() // Either DISCRETE or CONTINUOUS
          .required('Required'),
        lowerBound: Yup.number()
          .required('Required'),
        upperBound: Yup.number()
          .required('Required'),
        labels: Yup.array() // Array of Strings 
          .required('Required'),
        subrating: Yup.string() // Either Yes or No to create custom subratings
          .oneOf(["Yes", "No"])
          .required('Required'),
        subratings: Yup.array() // Array of Subrating objects
          .required('Required'),
      });

    const formik = useFormik({
      initialValues:{
        name: "",
        type: "",
        lowerBound: 0,
        upperBound: 10,
        labels: [],
        subrating: "No",
        subratings: [],
      },
      validationSchema,
      onSubmit: (values, actions) => {
        actions.setSubmitting(true);

      }
    });

    return(

      <form onSubmit={formik.handleSubmit} id="createRatingSystem">

        <FormControl isInvalid={formik.errors.name && formik.touched.name} isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="MyRatingSystem" id="name"/>
        </FormControl>
    
        <FormControl isInvalid={formik.errors.type && formik.touched.type} isRequired>
          <FormLabel>Type of rating system</FormLabel>
          <RadioGroup>
            <Stack>
              <Radio id="CONTINUOUS">Continuous</Radio>
              <Radio id="DISCRETE">Discrete</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
    
        <FormControl isRequired>
          <Heading>Customize the range</Heading>
          <Stack>
            <FormLabel>Lower bound</FormLabel>
            <Input id="lowerBound"placeholder="0"/>
            <FormLabel>Upper bound</FormLabel>
            <Input id="upperBound" placeholder="10"/>
          </Stack>
        </FormControl>
    
        <FormControl isRequired>
          <FormLabel>Create your own subratings</FormLabel>
          <RadioGroup>
            <Stack>
              <Radio>Yes
                <FormHelperText>(Must create at least 2)</FormHelperText>
              </Radio>
              <Radio>No
                <FormHelperText>(One will be created for you)</FormHelperText>
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Button
          mt={6}
          isLoading={formik.isSubmitting}
          type="submit"
        >
        Create Rating System
        </Button>
      </form>
    );
};

export default CreateRatingSystemForm;