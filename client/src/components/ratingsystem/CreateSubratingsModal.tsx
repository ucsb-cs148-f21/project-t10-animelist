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
import { AddIcon } from "@chakra-ui/icons";

interface CreateSubratingsModalProps{
  //entryData: 
	isOpen: boolean,
	onClose: () => void
}


const CreateSubratingsModal: React.FC<CreateSubratingsModalProps> = ({isOpen, onClose}) =>{

  // at least 2 subratings must be created
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
    weight: Yup.number(),
    subRatings: Yup.array()
      .required('Required'),
  });

  const formik = useFormik({
    initialValues:{
      name: "",
      weight: 0.0,
      subRatings: []
    },
    validationSchema,
    onSubmit: async values => {
      window.location.reload();
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
                  
                    <Tr>
                      <Td> <Input placeholder="Subrating1"/> </Td>
                      <Td> 1.0 </Td>
                    </Tr>
                  
                  </Tbody>

                </Table>

                <HStack>
                  <Button leftIcon={<AddIcon />} > Add a Subrating </Button>
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