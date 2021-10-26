import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { Formik, useFormik } from "formik";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import * as React from "react";
import { UserListEntryExtended } from "./UserListRow";

interface EditAnimeModalFormProps {
  entryData: UserListEntryExtended,
}

const EditAnimeModalForm: React.FC<EditAnimeModalFormProps> = ({ entryData }) => {
  const formik = useFormik({
    initialValues: {
      score: entryData.rated ? entryData.rating : ''
    },
    onSubmit: values => {
      // TODO: integrate this to send a GraphQL query to backend
      // be aware that score is stored as a string, not a number,
      // so you should convert to a number first. also the score 
      // value of '' indicates empty field/no rating

      const updatedEntry = {
        mediaID: entryData.mediaID,
        rated: (values.score !== ''),
        rating: (values.score !== '') ? Number(values.score) : 0
      };

      // TODO: delete this
      alert(JSON.stringify(updatedEntry));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="score">Score</FormLabel>

        <NumberInput 
          {...formik.getFieldProps("score")} id="score" min={0}
          onChange={(stringValue, _) => formik.setFieldValue("score", stringValue)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormErrorMessage>{formik.errors.score}</FormErrorMessage>
      </FormControl>

      <Button type="submit" colorScheme="blue" mt={3} >
        Save 
      </Button>
    </form>
  );
}

export default EditAnimeModalForm;