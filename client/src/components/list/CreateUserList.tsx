import { 
    Input, 
    Radio, 
    Stack,
    VStack,
    Button,
    Heading,
    FormControl, 
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    useDisclosure,
    Center
} from "@chakra-ui/react";

import * as React from 'react';
import{ Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import ChooseRatingModal from "./ChooseRatingModal";

const CreateUserList: React.FC<{}> = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const validationSchema = Yup.object({
      name: Yup.string()
        .min(1, 'Name must be at least 1 character long')
        .max(50, 'Name must be at most 50 characters long')
        .required('Required'),
    });

    const formik = useFormik({
      initialValues:{
        name: ""
      },
      validationSchema,
      onSubmit: (values, actions) => {
        actions.setSubmitting(true);

      }
    });
    return(
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={{ base: 8, md: 12 }} mt={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="MyUserList" id="name"/>
          </FormControl>

          <Stack spacing="24px">
            <Heading size="md">Choose a Rating System for your List!</Heading>
            <Button onClick={onOpen} colorScheme="blue" width="120px">Add Rating</Button>
            <ChooseRatingModal isOpen={isOpen} onClose={onClose}/>
          </Stack>

          <Center>
            <Button type="submit" colorScheme="blue" mt={16} >
              Save
            </Button>
          </Center>

          </Stack>
        </form>
    );
}

export default CreateUserList;