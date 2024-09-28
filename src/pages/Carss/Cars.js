import React, { useEffect, useState } from 'react';
import Pelak from '../shared-component/Pelak/Pelak';
import CustomizedTables from './Table/Table';
import './Cars.css';
import { IoMdAddCircle } from 'react-icons/io';
import toast from "react-hot-toast";


function Cars() {
  const [sections, setSections] = useState({ section1: '', section2: '', section3: '', section4: '',sectionId:'' });
  const [crud, setCrud] = useState({ add: false, edit: false,delete:false })
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    showCars();
  }, [])

  const showCars = async () => {
    try {
      const res = await fetch(`http://localhost:5000/cars`);
      const data = await res.json()
      setShowData(data)
      setShow(true)
      setMessage('داده ای وجود ندارد')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async () => {
    try {
      if(crud.add|| crud.edit){
        if (!/^\d{2}$/.test(sections.section4) || !/^\d{3}$/.test(sections.section3) ||
        !/^[^\s]{1,3}$/.test(sections.section2) || !/^\d{2}$/.test(sections.section1)) {
          toast.error('داده های مورد نیاز را وارد کنید');
          return;
        }
  
      }     

      const formattedPlate = `ایران ${sections.section4} - ${sections.section3} ${sections.section2} ${sections.section1}`;
      console.log(formattedPlate);


      if (crud.add) {
        // بررسی اینکه پلاک از قبل وجود دارد یا نه
        const plateExists = showData.some(car => car.license_plate === formattedPlate);
        if (plateExists) {
          toast.error('این پلاک قبلاً ثبت شده است');
          return;
        }

        const newCar = {
          license_plate: formattedPlate,
        };

         await fetch(`http://localhost:5000/cars`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCar),
        });

        setCrud(prev => ({ ...prev, add: false }))
        setSections({ section1: '', section2: '', section3: '', section4: '',sectionId:'' })
        toast.success('پلاک جدید با موفقیت اضافه شد');
        setTimeout(() => {
          showCars();
        }, 300);
      }


      if (crud.edit) {
        // بررسی اینکه پلاک از قبل وجود دارد یا نه
        const plateExists = showData.some(car => car.id !== sections.id && car.license_plate === formattedPlate);
        if (plateExists) {
          toast.error('این پلاک قبلاً ثبت شده است');
          return;
        }

        const updatedCar = {
          license_plate: formattedPlate,
        };

       const response= await fetch(`http://localhost:5000/cars/${sections.sectionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCar),
        });
        if (response.ok){
          setCrud(prev => ({ ...prev, edit: false }))
          setSections({ section1: '', section2: '', section3: '', section4: '',sectionId:'' })
          toast.success('پلاک خودرو بروزرسانی شد');
          setTimeout(() => {
            showCars();
          }, 300);  
        }
      
      }

      if(crud.delete){
        console.log(sections.sectionId)
        const plateIdToDelete = sections.sectionId; // Assuming sectionId holds the ID of the plate to delete

        if (!plateIdToDelete) {
          toast.error('لطفا یک پلاک انتخاب کنید'); // Show error if no plate is selected
          return;
        }
    
        // Make the DELETE request to the server
        await fetch(`http://localhost:5000/cars/${plateIdToDelete}`, {
          method: 'DELETE',
        });
        
        // Reset the CRUD state and sections after deletion
        setCrud(prev => ({ ...prev, delete: false }));
        setSections({ section1: '', section2: '', section3: '', section4: '', sectionId: '' });
    
        toast.success('پلاک خودرو با موفقیت حذف شد'); // Success message
        setTimeout(() => {
          showCars();
        }, 300);
  
      }

    } catch (error) {
      console.log(error);
      toast.error('عملیات نا موفق بود');
    }
  };

  return (
    <div className='cars'>
      <button className='add' onClick={() => { setCrud(prev => ({ ...prev, add: true })) }}>
        ایجاد پلاک
        <IoMdAddCircle style={{ fontSize: '20px', color: '#6738be' }} />
      </button>

      {crud.add ? <Pelak sections={sections} setSections={setSections} handleClick={handleClick} btn='افزودن' /> :
        crud.edit && <Pelak sections={sections} setSections={setSections} handleClick={handleClick} btn='ویرایش' />
      }

      {showData.length > 0 ?
        <CustomizedTables showData={showData} setCrud={setCrud} handleClick={handleClick} setSections={setSections}/>
        : show && <h3>{message}</h3>
      }

    </div>
  )
}

export default Cars