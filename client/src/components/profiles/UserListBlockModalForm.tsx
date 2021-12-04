import { Button, ButtonGroup } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { HStack, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { EmbeddedUserList, UserListBlockInput } from '../../generated/graphql';

interface Props {
  userLists: EmbeddedUserList[];
  onBack: () => void;
  onNext: (input: UserListBlockInput) => void;
}

const UserListBlockModalForm: React.FC<Props> = ({ userLists, onBack, onNext }) => {
  const hasLists = userLists && (userLists.length > 0);

  return (
    <Formik
      initialValues={{ list: '', maxEntries: '' }}
      onSubmit={(values, actions) => {
        onNext({
          listId: values.list,
          maxEntries: (values.maxEntries !== '') ? Number.parseInt(values.maxEntries) : null
        });
      }}
    >
      {props => (
        <Form>
          <VStack spacing='1rem' padding='0.5rem'>
            <Field name='list'>
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor='list'>List</FormLabel>
                  <Select
                    {...field} id='list'
                    placeholder={hasLists ? 'Select a list' : 'You have no lists!'}
                    isDisabled={!hasLists}
                  >
                    {hasLists && userLists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                  </Select>
                </FormControl>
              )}
            </Field>

            <Field name='maxEntries'>
              {({ field, form}) => (
                <FormControl>
                  <FormLabel htmlFor='maxEntries'>Maximum entries shown</FormLabel>
                  <Input {...field} type='number' placeholder='e.g. 10' />
                </FormControl>
              )}
            </Field>

            <HStack justify='center' spacing='2em'>
              <Button colorScheme='blue' onClick={onBack}>Back</Button>

              <Button
                colorScheme='blue'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Next
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default UserListBlockModalForm;