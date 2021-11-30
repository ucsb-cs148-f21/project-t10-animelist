import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button, Heading, HStack, IconButton, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack
} from "@chakra-ui/react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as React from "react";
import * as Yup from 'yup';

interface CreateLabelsModalProps {
  isOpen: boolean,
  onClose: () => void
}

const CreateLabelsModal: React.FC<CreateLabelsModalProps> = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({

  });

  const formik = useFormik({
    initialValues: {
      labels: ["Good", "Neutral", "Bad"]
    },
    validationSchema,
    onSubmit: async values => {
      console.log(values)
    }
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <FormikProvider value={formik as any}>
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader> Add Some Labels! </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FieldArray name="labels">
                {({ remove, push }) => (
                  <VStack width="full" alignItems="flex-start">
                    <Heading size="sm">Highest Score</Heading>
                    {
                      formik.values.labels.map((_, idx) => (
                        <HStack width="100%">
                          <Input
                            id={`labels[${idx}]`}
                            {...formik.getFieldProps(`labels[${idx}]`)}
                          />
                          <IconButton
                            aria-label="delete label"
                            icon={<DeleteIcon />}
                            variant="outline"
                            colorScheme="red"
                            onClick={() => remove(idx)}
                          />
                        </HStack>
                      ))
                    }
                    <Heading size="sm">Lowest Score</Heading>
                    <Button width="100%" leftIcon={<AddIcon/>} onClick={() => push("Custom Label")}>Add Label</Button>
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

export default CreateLabelsModal;