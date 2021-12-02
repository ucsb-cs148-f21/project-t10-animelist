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
  useDisclosure,
  VStack
} from "@chakra-ui/react";

import * as React from 'react';
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import CreateSubratingsModal from "./CreateSubratingsModal"
import CreateLabelsModal from "./CreateLabelsModal"
import { RatingSystemInput, RatingSystemType } from "../../generated/graphql"
import { useState } from "react";

const CreateRatingSystemForm: React.FC<{}> = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(1, 'Name must be at least 1 character long')
      .max(50, 'Name must be at most 50 characters long')
      .required('Required'),
    type: Yup.string() // Either DISCRETE or CONTINUOUS
      .required('Required'),
    lower: Yup.number()
      .required('Required'),
    upper: Yup.number()
      .required('Required'),
    labels: Yup.array() // Array of Strings 
      .required('Required'),
    subRatings: Yup.array() // Array of Subrating objects
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      type: RatingSystemType.Continuous,
      lower: 0,
      upper: 10,
      labels: ["Bad", "Neutral", "Good"],
      subRatings: [{ id: "0", name: "Score", weight: 1 }],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  });

  const {
    isOpen: isOpenLabels,
    onOpen: onOpenLabels,
    onClose: onCloseLabels
  } = useDisclosure();
  const {
    isOpen: isOpenSubratings,
    onOpen: onOpenSubratings,
    onClose: onCloseSubratings
  } = useDisclosure();

  const [wantSubRatings, setWantSubRatings] = useState<string>("0");

  return (
    <form onSubmit={formik.handleSubmit} id="createRatingSystem">
      <Stack
        spacing={{ base: 8, md: 6 }}
      >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input id="name" {...formik.getFieldProps("name")} />
        </FormControl>

        <FormControl>
          <FormLabel>Type of rating system</FormLabel>
          <RadioGroup id="type" {...formik.getFieldProps("type")} as={Stack}>
            <Radio
              size="lg"
              value={RatingSystemType.Continuous}
              onChange={formik.getFieldProps("type").onChange}
            >
              Continuous
            </Radio>
            <Radio
              size="lg"
              value={RatingSystemType.Discrete}
              onChange={formik.getFieldProps("type").onChange}
            >
              Discrete
            </Radio>
          </RadioGroup>
        </FormControl>

        {
          formik.values.type == RatingSystemType.Continuous ?
            <FormControl>
              <FormLabel>Highest Score</FormLabel>
              <NumberInput
                id="upper"
                {...formik.getFieldProps("upper")}
                min={formik.values.lower + 1}
                onChange={(_, val) => formik.setFieldValue("upper", val)}
                precision={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel>Lowest Score</FormLabel>
              <NumberInput
                id="lower"
                {...formik.getFieldProps("lower")}
                max={formik.values.upper - 1}
                onChange={(_, val) => formik.setFieldValue("lower", val)}
                precision={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            :
            <FormControl>
              <Heading size="md"> Assign labels to your discrete rating system</Heading>
              <Button
                mt={6}
                type="button"
                padding="15px"
                onClick={onOpenLabels}
              >
                Assign Labels
              </Button>
              <CreateLabelsModal
                initialLabels={formik.values.labels}
                isOpen={isOpenLabels}
                onClose={onCloseLabels}
                onSave={(labels) => formik.setFieldValue("labels", labels)}
              />
            </FormControl>
        }

        <FormControl>
          <FormLabel>Create your own subratings?</FormLabel>
          <RadioGroup defaultValue={wantSubRatings} onChange={setWantSubRatings} as={Stack}>
            <Radio
              value={"0"}
              size="lg"
              onChange={() => formik.setFieldValue("subRatings", [{ id: "0", name: "Score", weight: 1 }])}
            >
              No
            </Radio>
            <Radio
              size="lg"
              value={"1"}
              onChange={() => formik.setFieldValue("subRatings", [{ name: "Animation", weight: 0.5 }, { name: "Sound", weight: 0.5 }])}
            >
              Yes
            </Radio>
          </RadioGroup>
          <FormHelperText px={{ md: 7 }}>(Must create at least 2)</FormHelperText>
        </FormControl>

        {
          wantSubRatings === "1" &&
          <FormControl>
            <FormLabel>Create Subratings</FormLabel>
            <Button
              mt={6}
              type="button"
              padding="15px"
              onClick={onOpenSubratings}
            >
              Create Subratings
            </Button>
            <CreateSubratingsModal 
              initialSubratings={formik.values.subRatings}
              isOpen={isOpenSubratings} 
              onClose={onCloseSubratings} 
              onSave={subRatings => formik.setFieldValue("subRatings", subRatings)}/>
          </FormControl>
        }

        <Button
          mt={6}
          type="submit"
        >
          Create Rating System
        </Button>
      </Stack>
    </form>
  );
};

export default CreateRatingSystemForm;