import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSopById, updateSopById } from 'apiSdk/sops';
import { sopValidationSchema } from 'validationSchema/sops';
import { SopInterface } from 'interfaces/sop';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function SopEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SopInterface>(
    () => (id ? `/sops/${id}` : null),
    () => getSopById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SopInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSopById(id, values);
      mutate(updated);
      resetForm();
      router.push('/sops');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SopInterface>({
    initialValues: data,
    validationSchema: sopValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Sops',
              link: '/sops',
            },
            {
              label: 'Update Sop',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Sop
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.questions}
            label={'Questions'}
            props={{
              name: 'questions',
              placeholder: 'Questions',
              value: formik.values?.questions,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.ai_generated_sop}
            label={'Ai Generated Sop'}
            props={{
              name: 'ai_generated_sop',
              placeholder: 'Ai Generated Sop',
              value: formik.values?.ai_generated_sop,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.uploaded_sop}
            label={'Uploaded Sop'}
            props={{
              name: 'uploaded_sop',
              placeholder: 'Uploaded Sop',
              value: formik.values?.uploaded_sop,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Sop Score"
            formControlProps={{
              id: 'sop_score',
              isInvalid: !!formik.errors?.sop_score,
            }}
            name="sop_score"
            error={formik.errors?.sop_score}
            value={formik.values?.sop_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sop_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/sops')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sop',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SopEditPage);
