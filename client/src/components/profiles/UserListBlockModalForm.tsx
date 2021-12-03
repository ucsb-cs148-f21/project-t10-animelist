import { Button, ButtonGroup } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { UserListBlockInput } from '../../generated/graphql';

interface Props {
  onBack: () => void;
  onNext: (input: UserListBlockInput) => void;
}

const UserListBlockModalForm: React.FC<Props> = ({ onBack, onNext }) => (
  <Formik
    initialValues={{ text: '' }}
    onSubmit={(values, actions) => {
      onNext({ listId: 'abc', maxEntries: 10 });
    }}
  >
    {props => (
      <Form>
        <Field name='text'>
          {({ field, form }) => (
            <FormControl>
              <FormLabel htmlFor='text'>Text</FormLabel>
              <Input {...field} id='text' placeholder='Text to display' />
            </FormControl>
          )}
        </Field>
        <ButtonGroup>
          <Button colorScheme='blue' onClick={onBack}>Back</Button>

          <Button
            colorScheme='blue'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Next
          </Button>
        </ButtonGroup>
      </Form>
    )}
  </Formik>
)

export default UserListBlockModalForm;