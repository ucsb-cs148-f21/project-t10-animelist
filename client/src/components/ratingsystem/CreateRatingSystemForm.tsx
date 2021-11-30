import { 
    Input, 
    Radio, 
    Stack,
    Link,
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
    NumberInputStepper,
    useDisclosure
} from "@chakra-ui/react";

import * as React from 'react';
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import CreateSubratingsModal from "./CreateSubratingsModal"
import CreateLabelsModal from "./CreateLabelsModal"

// name: String!
// type: String!
// lowerBound: Int!
// upperBound: Int!
// labels: [String!]!
// subrating: String!
// subratings: [Subrating!]!

function contElements(){
  var x = document.getElementById("labels") as HTMLElement;
  x.style.display = "none";
  var y = document.getElementById("range") as HTMLElement;
  y.style.display = "block"
}

function discElements(){
  var x = document.getElementById("labels") as HTMLElement;
  x.style.display = "block";
  var y = document.getElementById("range") as HTMLElement;
  y.style.display = "none"
}

function showSubratings(){
  var x = document.getElementById("subratings") as HTMLElement;
  x.style.display = "block";
}

function hideSubratings(){
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
    const [lower, setLower] = React.useState(0);
    const setL = (lower) => setLower(lower);
    const [upper, setUpper] = React.useState(10);
    const setU = (upper) => setUpper(upper);
    let upper2 = +upper - +1;
    let lower2 = +lower + +1;

    const { isOpen : isOpenLabels, 
            onOpen : onOpenLabels, 
            onClose : onCloseLabels
          } = useDisclosure();
    const { isOpen : isOpenSubratings, 
            onOpen : onOpenSubratings, 
            onClose : onCloseSubratings
          } = useDisclosure();

    return(

      <form onSubmit={formik.handleSubmit} id="createRatingSystem">
        <Stack
          spacing={{ base: 8, md: 6 }}
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
                  onChange={contElements} 
                  value="1" 
                  name="CONTINUOUS"
                >
                  Continuous
                </Radio>
                <Radio 
                  size="lg" 
                  onChange={discElements} 
                  value="2" 
                  name="DISCRETE"
                >
                  Discrete
                </Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </FormControl>
    
        <Stack id="range">
        <FormControl>
          <Stack spacing="24px">

            <Heading size="md">Customize the scores</Heading>
          
            <FormLabel>Lowest Score</FormLabel>
            <NumberInput
              value={lower}
              max={upper2}
              onChange={setL}
              precision={0}
              id="lowerBound"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <FormLabel>Highest Score</FormLabel>
            <NumberInput
              value={upper}
              min={lower2}
              onChange={setU}
              precision={0}
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
        </Stack>

        <Stack 
          id="labels"
          spacing={{ base: 4, md: 6 }}
          style={{display: "none"}}
        >
          <Heading size="md"> Assign labels to your discrete rating system</Heading>
          <Button
            mt={6}
            type="button"
            maxW="200px"
            padding="15px"
            onClick={onOpenLabels}
          >
            Assign Labels
          </Button>
          <CreateLabelsModal isOpen={isOpenLabels} onClose={onCloseLabels} />
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
            onClick={onOpenSubratings}
          >
            Create Subratings
          </Button>
          <CreateSubratingsModal isOpen={isOpenSubratings} onClose={onCloseSubratings} />
        </Stack>

        <Center>
          <Link></Link>
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