import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button, Heading, HStack, IconButton, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack
} from "@chakra-ui/react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as React from "react";
import * as Yup from 'yup';

interface CreateLabelsModalProps {
  initialLabels: string[],
  isOpen: boolean,
  onClose: () => void
  onSave: (labels: string[]) => void
}

const CreateLabelsModal: React.FC<CreateLabelsModalProps> = ({ initialLabels, isOpen, onClose, onSave }) => {
  const validationSchema = Yup.object({
    labels: Yup.array().required("Must have labels").min(2, "Must have at least 2 labels")
  });

  const formik = useFormik({
    initialValues: {
      labels: initialLabels.slice().reverse()
    },
    validationSchema,
    onSubmit: async values => {
      onSave(values.labels.slice().reverse());
      onClose();
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