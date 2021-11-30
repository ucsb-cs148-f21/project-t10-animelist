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
    Input,
    InputRightElement,
    IconButton,
    InputGroup,
    Tfoot
    } from "@chakra-ui/react"
import { DiscreteRatingSystemInput } from "../../generated/graphql";
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface AssignLabelsModalProps{
	isOpen: boolean,
	onClose: () => void
}

const AssignLabelsModal: React.FC<AssignLabelsModalProps> = ({isOpen, onClose}) =>{

    const [values, setValues] = useState<DiscreteRatingSystemInput>({labels: ["S", "F"]});

    const validationSchema = Yup.object({

    });

    const formik = useFormik({
      initialValues: values,
      enableReinitialize: true,
      validationSchema,
      onSubmit: async values => {
        console.log(values)
      }
    });

	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Add Some Labels! </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={formik.handleSubmit}>

              <VStack width="full" p={6}>

                <Table>
                  <TableCaption></TableCaption>

                  <Thead>
                    <Tr>
                      <Th> Highest Tier </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {
                      formik.values.labels.map((label, idx) => (
                        <Tr key={idx}>
                          <Td> 
                            <InputGroup>
                            <Input id={`labels[${idx}]`} {...formik.getFieldProps(`labels[${idx}]`)}/> 
                            <InputRightElement width='3.5rem'>
                              <IconButton aria-label='Delete Label' h='1.75rem' icon={<MinusIcon />}> </IconButton>
                            </InputRightElement>
                            </InputGroup>
                          </Td>
                        </Tr>
                    )) 
                    }
                  </Tbody>

                  <Tfoot>
                    <Tr>
                      <Th> Lowest Tier </Th>
                    </Tr>
                  </Tfoot>

                </Table>

                <HStack>
                  <Button leftIcon={<AddIcon />} onClick={() => {}}> Add a Label </Button>
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

export default AssignLabelsModal;