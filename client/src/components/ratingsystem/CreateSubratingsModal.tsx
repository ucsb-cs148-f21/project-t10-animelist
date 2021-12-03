import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button, IconButton, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput,
  NumberInputField, Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as React from "react";
import * as Yup from 'yup';
import { SubRatingInput } from "../../generated/graphql";

interface CreateSubratingsModalProps {
  //entryData:
  initialSubratings: any[],
  isOpen: boolean,
  onClose: () => void
  onSave: (subratings: SubRatingInput[]) => void
}

const CreateSubratingsModal: React.FC<CreateSubratingsModalProps> = ({ initialSubratings, isOpen, onClose, onSave }) => {
  const validationSchema = Yup.object().shape({
    subratings: Yup.array().required("Must have subratings").min(1, "Minimum of one subrating")
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      subratings: initialSubratings
    },
    onSubmit: async ({ subratings }) => {
      onSave(subratings.map((subrating, idx) => ({ id: `${idx}`, name: subrating.name, weight: parseFloat(subrating.weight) })));
      onClose();
    }
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <FormikProvider value={formik as any}>
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader> Create Subratings! </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FieldArray name="subratings">
                {({ remove, push }) => (
                  <VStack width="full" p={6}>
                    <Table>
                      <TableCaption>Example: 'Sound' could be one of your subratings</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Weight</Th>
                          <Th />
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          formik.values.subratings.map((subrating, idx) => (
                            <Tr key={idx}>
                              <Td>
                                <Input id={`subratings[${idx}].name`} {...formik.getFieldProps(`subratings[${idx}].name`)} />
                              </Td>
                              <Td>
                                <NumberInput
                                  id={`subratings[${idx}].weight`}
                                  min={0}
                                  max={1}
                                  precision={2}
                                  {...formik.getFieldProps(`subratings[${idx}].weight`)}
                                  onChange={(value) => formik.setFieldValue(`subratings[${idx}].weight`, value)}
                                  width="6rem"
                                >
                                  <NumberInputField />
                                </NumberInput>
                              </Td>
                              <Td><IconButton aria-label="delete subrating" colorScheme="red" variant="outline" icon={<DeleteIcon />} onClick={() => remove(idx)} /></Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                    <Button leftIcon={<AddIcon />} onClick={() => { push({ name: "Subrating Name", weight: "0.00" }) }}>Add a Subrating</Button>
                  </VStack>
                )}
              </FieldArray>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>

        </form>
      </FormikProvider>
    </Modal>
  );
}

export default CreateSubratingsModal;