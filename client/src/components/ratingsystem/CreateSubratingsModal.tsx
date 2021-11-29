import * as React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  Button,
  Table, 
  TableCaption, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  VStack,
  HStack,
  Center,
  Input
  } from "@chakra-ui/react"
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import { SubRatingInput } from "../../generated/graphql";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface CreateSubratingsModalProps{
  //entryData: 
	isOpen: boolean,
	onClose: () => void
}


const CreateSubratingsModal: React.FC<CreateSubratingsModalProps> = ({isOpen, onClose}) =>{
  const [ values, setValues ] = useState<SubRatingInput[]>([{ id: "0", name: "Animation", weight: 0.5 }, { id: "1", name: "Sound", weight: 0.5 }])
  // at least 2 subratings must be created
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
    weight: Yup.number(),
    subRatings: Yup.array()
      .required('Required'),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: values,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values)
    }
  });
  
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Create Subratings! </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <VStack width="full" p={6}>
                <Table>
                  <TableCaption> Example: 'Sound' could be one of your subratings</TableCaption>

                  <Thead>
                    <Tr>
                      <Th> Name </Th>
                      <Th> Weight </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {
                      formik.values.map((subrating, idx) => (
                        <Tr key={idx}>
                          <Td><Input id={`[${idx}].name`} {...formik.getFieldProps(`[${idx}].name`)}/></Td>
                          <Td><Input id={`[${idx}].weight`} {...formik.getFieldProps(`[${idx}].weight`)}/></Td>
                        </Tr>
                      ))
                    }
                  </Tbody>

                </Table>

                <HStack>
                  <Button leftIcon={<AddIcon/>} onClick={() => { setValues(old => old.concat({ id: "1", name: "New One", weight: 0.3 })) }}> Add a Subrating </Button>
                </HStack>

                <Center>
                  <Button type="submit" colorScheme="blue">
                    Save
                  </Button>
                </Center>
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
	);
}

export default CreateSubratingsModal;