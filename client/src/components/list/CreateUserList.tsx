import {
  Input,
  Radio,
  Stack,
  VStack,
  Button,
  Select,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
  Center,
  useToast
} from "@chakra-ui/react";

import * as React from 'react';
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from 'yup';
import ChooseRatingModal from "./ChooseRatingModal";
import { useCreateUserListMutation, useMeQuery } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
//import { RatingSystem } from "../../generated/graphql";


const CreateUserList: React.FC<{}> = () => {
  const [createUserList] = useCreateUserListMutation();
  const { data: meData } = useMeQuery();
  const toast = useToast();
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(1, 'Name must be at least 1 character long')
      .max(50, 'Name must be at most 50 characters long')
      .required('Required'),
    ratingSystemId: Yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      ratingSystemId: "10_DISCRETE"
    },
    validationSchema,
    onSubmit: async ({ name, ratingSystemId }) => {
      await createUserList({
        variables: {
          input: {
            name,
            ratingSystemId
          }
        }
      })
        .then(
          res => {
            toast({ status: "success", description: "Success" });
            router.push(`list/${res.data.createUserList.id}`);
          },
          err => {
            toast({ status: "error", description: "There was an error" });
          }
        );
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={{ base: 8, md: 12 }} mt={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="MyUserList" id="name" {...formik.getFieldProps("name")} />
        </FormControl>

        <Stack spacing="24px">
          <Heading size="md">Choose a Rating System for your List!</Heading>
          <Select
            size="lg"
            id="ratingSystemId"
            {...formik.getFieldProps("ratingSystemId")}
            isRequired
          >
            <option value="10_DISCRETE" >10 point</option>
            <option value="10_CONTINUOUS" >10 point decimal</option>
            <option value="100_CONTINUOUS" >100 point decimal</option>
            <option value="5_STAR" >5 stars</option>
            <option value="3_SMILEY" >3 smiley</option>
            {
              meData && meData.me.ratingSystems && meData.me.ratingSystems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
            }
          </Select>
        </Stack>

        <Center>
          <Button type="submit" colorScheme="blue" mt={16} isLoading={formik.isSubmitting}>
            Save
          </Button>
        </Center>
      </Stack>
    </form>
  );
}

export default CreateUserList;