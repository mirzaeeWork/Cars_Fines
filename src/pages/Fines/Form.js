import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

export const schema = yup.object().shape({
  violation_code: yup
    .number()
    .typeError('کد تخلف باید عددی باشد.')
    .required('وارد کردن کد تخلف الزامی است.'),
  violation_title: yup
    .string()
    .required('وارد کردن عنوان تخلف الزامی است.'),
  amount: yup
    .number()
    .typeError('مبلغ باید عددی باشد.')
    .required('وارد کردن مبلغ الزامی است.'),
});

// فرم را به‌روز کنید تا مقادیر پیش‌فرض دریافت شده را نمایش دهد
const Form = ({ fields, formData, textBtn, handleClick }) => {
  const { control, formState, handleSubmit, trigger, reset } = useForm({
    mode: 'onChange',
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const { isValid, errors } = formState;

  useEffect(() => {
    // Reset form with new data if formData changes
    reset(formData);
  }, [formData, reset]);


  // Form submission handler
  const submitHandler = async (values) => {
    handleClick(values); // Pass values to the parent component
  };

  return (
    <form noValidate className="flex flex-col md:overflow-hidden" onSubmit={handleSubmit(submitHandler)}>
      <Box
        noValidate
        sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 5 }}
      >
        {fields.map((col, index) => (
          <div className="flex mb-24" key={index}>
            <Controller
              control={control}
              name={col.field}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    label={col.title}
                    id={col.field}
                    type={col.inputType}
                    error={!!errors[col.field]}
                    variant="outlined"
                    fullWidth
                    onBlur={() => {
                      field.onBlur(); // Call the default onBlur
                      trigger(col.field); // Trigger validation on blur
                    }}
                    onInput={(e) => {
                      if (col.inputType === 'number') {
                        e.target.value = e.target.value.replace(/\D/g, ''); // Only digits allowed for numbers
                      }
                    }}
                    sx={{
                      textAlign: 'right',
                      '& .MuiInputBase-input': {
                        textAlign: 'right',
                      },
                      '& .MuiInputLabel-root': {
                        right: 27,
                        transformOrigin: 'top right',
                        textAlign: 'right',
                        color: '#6738be',
                        fontSize: '18px',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#6738be',
                        },
                        '&:hover fieldset': {
                          borderColor: '#6738be', // Hover color
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#6738be', // Focus color
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6738be',
                        fontSize: '18px',
                      },
                    }}
                  />
                  {errors[col.field] && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ textAlign: 'right', marginTop: 1, fontSize: '16px', }}
                    >
                      {errors[col.field]?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>
        ))}

        <button
          type="submit"
          className="button secondary expanded has-icon"
          disabled={!isValid}
          style={{
            backgroundColor: !isValid ? 'transparent' : '#6738be',
            color: !isValid ? '#6738be' : '#fff',
            border: '1px solid #6738be', fontSize: '20px', height: '56px'
          }}
        >
          {textBtn}
        </button>
      </Box>
    </form>
  );
};

export default Form;
