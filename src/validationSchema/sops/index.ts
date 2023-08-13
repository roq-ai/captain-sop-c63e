import * as yup from 'yup';

export const sopValidationSchema = yup.object().shape({
  questions: yup.string().required(),
  ai_generated_sop: yup.string().nullable(),
  uploaded_sop: yup.string().nullable(),
  sop_score: yup.number().integer().nullable(),
  user_id: yup.string().nullable(),
});
