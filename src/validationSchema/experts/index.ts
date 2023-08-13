import * as yup from 'yup';

export const expertValidationSchema = yup.object().shape({
  availability: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
