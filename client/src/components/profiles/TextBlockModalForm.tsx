import { Button, ButtonGroup } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, HStack, Textarea, VStack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { TextBlockInput } from '../../generated/graphql';

interface Props {
  onBack: () => void;
  onNext: (input: TextBlockInput) => void;
}

const TextBlockModalForm: React.FC<Props> = ({ onBack, onNext }) => (
  <Formik
    initialValues={{ text: '' }}
    onSubmit={(values, actions) => {
      onNext({ text: values.text });
    }}
  >
    {props => (
      <Form>
        <VStack spacing='1rem' padding='0.5rem'>
          <Field name='text'>
            {({ field, form }) => (
              <FormControl isRequired>
                <FormLabel htmlFor='text'>Text</FormLabel>
                <Textarea {...field} id='text' placeholder='Text to display' />
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
)

export default TextBlockModalForm;