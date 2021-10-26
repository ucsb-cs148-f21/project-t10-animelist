import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input";
import { Formik, useFormik } from "formik";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";
import { values } from "lodash";
import * as React from "react";
import { useMeQuery, useUpdateUserListEntryMutation } from "../../generated/graphql";
import { UserListEntryExtended } from "./UserListRow";

interface EditAnimeModalFormProps {
  entryData: UserListEntryExtended,
}

const EditAnimeModalForm: React.FC<EditAnimeModalFormProps> = ({ entryData }) => {
  const [updateUserListEntry] = useUpdateUserListEntryMutation();
  const formik = useFormik({
    initialValues: {
      score: entryData.rated ? entryData.rating : ''
    },
    onSubmit: values => {
      const updatedEntry = {
        mediaID: entryData.mediaID,
        rated: (values.score !== ''),
        rating: (values.score !== '') ? Number(values.score) : 0
      };
      updateUserListEntry({
        variables: {
          input: {
            mediaID: updatedEntry.mediaID,
            rated: true,
            rating: updatedEntry.rating
          }
        }
      });
      window.location.reload();
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