// AddEditFines.js
import Form from './Form';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';

const fields = [
  {
    field: 'violation_code',
    title: 'کد تخلف',
    inputType: 'number',
  },
  {
    field: 'violation_title',
    title: 'عنوان تخلف',
    inputType: 'text',
  },
  {
    field: 'amount',
    title: 'مبلغ (ریال)',
    inputType: 'number',
  }
];

export default function AddEditFines() {
  const [formData, setFormData] = useState({ violation_code: '', violation_title: '', amount: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      showFines(id);
    }
  }, [id]);

  // تابع برای دریافت اطلاعات از API
  const showFines = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/fines/${id}`);
      const data = await res.json();

      setFormData({
        violation_code: data.violation_code,
        violation_title: data.violation_title,
        amount: data.amount
      });

    } catch (error) {
      toast.error('خطا در استخراج اطلاعات');
    }
  };

  const checkDuplicateViolation = async (values) => {
    try {
      console.log(values)

      const res = await fetch(`http://localhost:5000/fines`);

      const finesData = await res.json();

      if (id) {
        const duplicateFine = finesData.some(fine => fine.id !== id && fine.violation_code === values.violation_code);

        console.log("Duplicate Fine by id:", duplicateFine);

        return duplicateFine;


      } else {

        const duplicateFine = finesData.some(fine => fine.violation_code === values.violation_code);

        console.log("Duplicate Fine:", duplicateFine);

        return duplicateFine;

      }


    } catch (error) {
      console.log("Error:", error);
      toast.error('خطایی رخ داد.');
    }
  };

  const handleClick = async (values) => { // Use values from form
    try {
      if (!id) {
        if (await checkDuplicateViolation(values)) {
          toast.error('کد تخلف تکراری است');
          return;
        }

        const newFine = values;

        await fetch(`http://localhost:5000/fines`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFine),
        });

        toast.success('جریمه جدید با موفقیت اضافه شد');
        setTimeout(() => {
          navigate('/fines');
        }, 300);
      } else {
        if (await checkDuplicateViolation(values)) {
          toast.error('کد تخلف تکراری است');
          return;
        }

        const updatedFine = {
          id,
          violation_code: values.violation_code,
          violation_title: values.violation_title,
          amount: values.amount,
        };

        await fetch(`http://localhost:5000/fines/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFine),
        });

        toast.success('تخلف مورد نظر بروزرسانی شد');
        setTimeout(() => {
          navigate('/fines');
        }, 300);
      }

    } catch (error) {
      console.log(error);
      toast.error('عملیات نا موفق بود');
    }
  };

  return (
    <>
      {id ? (
        <Form fields={fields} formData={formData} textBtn='ویرایش' handleClick={handleClick} />
      ) : (
        <Form fields={fields} formData={formData} textBtn='ذخیره' handleClick={handleClick} />
      )}
    </>
  );
}
