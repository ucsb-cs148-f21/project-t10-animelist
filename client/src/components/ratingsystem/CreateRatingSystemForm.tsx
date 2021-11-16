import { 
    Input, 
    Radio, 
    Stack,
    VStack,
    Button,
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

// name: String!
// type: String!
// lowerBound: Int!
// upperBound: Int!
// labels: [String!]!
// subrating: String!
// subratings: [Subrating!]!

function showLabels(){
  // For Discrete Rating System
  var x = document.getElementById("labels") as HTMLElement;
  x.style.display = "block";
}

function hideLabels(){
  // For Continuous Rating System
  var x = document.getElementById("labels") as HTMLElement;
    x.style.display = "none";
}

function showSubratings(){
  // For Discrete Rating System
  var x = document.getElementById("subratings") as HTMLElement;
  x.style.display = "block";
}

function hideSubratings(){
  // For Continuous Rating System
  var x = document.getElementById("subratings") as HTMLElement;
    x.style.display = "none";
}

const CreateRatingSystemForm: React.FC<{}> = () => {

    const validationSchema = Yup.object({
        name: Yup.string()
          .min(1, 'Name must be at least 1 character long')
          .max(50, 'Name must be at most 50 characters long')
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

    // Temp values for radios
    const [valueType, setValueType] = React.useState("1");
    const [valueSub, setValueSub] = React.useState("1");

    return(

      <form onSubmit={formik.handleSubmit} id="createRatingSystem">
        <Stack
          spacing={{ base: 8, md: 8 }}
        >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="MyRatingSystem" id="name"/>
        </FormControl>
    
        <FormControl>
          <Stack
            spacing="16px"
            maxW="lg"
          >
            <FormLabel>Type of rating system</FormLabel>
            <RadioGroup id="type" onChange={setValueType} value={valueType}>
              <Stack spacing="16px">
                <Radio
                  size="lg" 
                  onChange={hideLabels} 
                  value="1" 
                  name="CONTINUOUS"
                >
                  Continuous
                </Radio>
                <Radio 
                  size="lg" 
                  onChange={showLabels} 
                  value="2" 
                  name="DISCRETE"
                >
                  Discrete
                </Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </FormControl>
    
        <FormControl>
          <Stack spacing="24px">
            <Heading size="md">
            Customize the range</Heading>
          
            <FormLabel>Lower bound</FormLabel>
            <NumberInput
              defaultValue="0"
              id="lowerBound"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormLabel>Upper bound</FormLabel>
            <NumberInput
              defaultValue="10"
              id="upperBound"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </FormControl>

        <Stack 
          id="labels"
          spacing={{ base: 4, md: 4 }}
          style={{display: "none"}}
        >
          <Heading size="md"> Assign labels to your discrete rating system</Heading>
          <Button
            mt={6}
            type="button"
            maxW="200px"
            padding="15px"
          >
            Assign Labels
          </Button>
        </Stack>
    
        <FormControl>
          <Stack
            spacing="16px"
            maxW="lg"
          >
            <FormLabel>Create your own subratings?</FormLabel>
            <RadioGroup onChange={setValueSub} value={valueSub}>
              <Stack>
                <Radio 
                  value="1"
                  size="lg" 
                  onChange={hideSubratings}
                >
                  No
                </Radio>
                <FormHelperText px={{ md: 7 }}>(One will be created for you)</FormHelperText>

                <Radio 
                  size="lg" 
                  value="2"
                  onChange={showSubratings}
                >
                  Yes
                </Radio>
                <FormHelperText px={{ md: 7 }}>(Must create at least 2)</FormHelperText>
              </Stack>
            </RadioGroup>
          </Stack>
        </FormControl>

        <Stack 
          id="subratings"
          spacing={{ base: 4, md: 4 }}
          style={{display: "none"}}
        >
          <Heading size="md"> Create your own subratings</Heading>
          <Button
            mt={6}
            type="button"
            maxW="200px"
            padding="15px"
          >
            Create Subratings
          </Button>
        </Stack>

        <Center>
          <Button
            mt={6}
            isLoading={formik.isSubmitting}
            type="submit"
          >
          Create Rating System
          </Button>
        </Center>
        </Stack>
      </form>
    );
};

export default CreateRatingSystemForm;