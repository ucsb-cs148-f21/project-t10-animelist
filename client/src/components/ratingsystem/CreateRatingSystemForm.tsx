import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button, FormControl, FormHelperText, FormLabel, Heading, HStack, IconButton, Input, NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper, Radio, RadioGroup, Stack, Table, TableCaption, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast, Text, Divider
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { remove } from "lodash";
import * as React from 'react';
import { useState } from "react";
import * as Yup from 'yup';
import { RatingSystemType, SubRatingInput, useCreateRatingSystemMutation } from "../../generated/graphql";
import CreateLabelsModal from "./CreateLabelsModal";
import CreateSubratingsModal from "./CreateSubratingsModal";


const CreateRatingSystemForm: React.FC<{}> = () => {
  const [createRatingSystem] = useCreateRatingSystemMutation();
  const toast = useToast();
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
      subRatings: [{ id: "0", name: "Score", weight: 1 }] as SubRatingInput[],
    },
    validationSchema,
    onSubmit: async (values) => {
      await createRatingSystem({
        variables: {
          input: {
            name: values.name,
            ratingSystemType: values.type,
            size: values.type === RatingSystemType.Continuous ? values.upper - values.lower + 1 : values.labels.length,
            continuousParam: values.type === RatingSystemType.Continuous ? { offset: values.lower - 0 } : null,
            discreteParam: values.type === RatingSystemType.Discrete ? { labels: values.labels } : null,
            subRatings: values.subRatings
          }
        }
      })
        .then(
          res => {
            toast({ title: "Success!", status: "success" })
          },
          err => {
            toast({ title: "Error!", status: "error" })
          }
        )
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
    <form onSubmit={formik.handleSubmit}>
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
          formik.values.type === RatingSystemType.Continuous ?
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
              <FormLabel size="md">Assign labels to your discrete rating system</FormLabel>
              <Heading size="sm">Highest Score</Heading>
              {
                formik.values.labels.slice().reverse().map((label, idx) => (
                  <Text key={idx} py={2}>{label}</Text>
                ))
              }
              <Heading size="sm">Lowest Score</Heading>
              <Button
                mt={6}
                type="button"
                padding="15px"
                onClick={onOpenLabels}
              >
                Edit Labels
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
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Weight</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  formik.values.subRatings.map((subrating) => (
                    <Tr key={subrating.id}>
                      <Td>{subrating.name}</Td>
                      <Td>{subrating.weight}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
            <Button
              mt={6}
              type="button"
              padding="15px"
              onClick={onOpenSubratings}
            >
              Edit Subratings
            </Button>
            <CreateSubratingsModal
              initialSubratings={formik.values.subRatings}
              isOpen={isOpenSubratings}
              onClose={onCloseSubratings}
              onSave={subRatings => formik.setFieldValue("subRatings", subRatings)} />
          </FormControl>
        }

        <Button
          mt={6}
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Create Rating System
        </Button>
      </Stack>
    </form>
  );
};

export default CreateRatingSystemForm;