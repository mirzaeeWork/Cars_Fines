import React, { useEffect, useState } from 'react';
import './Fines.css';
import CustomizedTables from './Table/Table';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Fines() {
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('')
  

  useEffect(() => {
    showCars();
  }, [])

  const showCars = async () => {
    try {
      const res = await fetch(`http://localhost:5000/fines`);
      const data = await res.json()
      setShowData(data)
      setShow(true)
      setMessage('داده ای وجود ندارد')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async (id) => {
    try {

 
      // Make the DELETE request to the server
      await fetch(`http://localhost:5000/fines/${id}`, {
        method: 'DELETE',
      });
      
  
      toast.success('تخلف با موفقیت حذف شد'); 
      
      setTimeout(() => {
        showCars();
      }, 300);

    } catch (error) {
      console.log(error);
      toast.error('عملیات نا موفق بود');
    }
  };


  return (
    <div className='fines'>
      <Link to="/fines/add" className='add' >
        ایجاد جریمه
        <IoMdAddCircle style={{ fontSize: '20px', color: '#6738be' }} />
      </Link>

      {showData.length > 0 ?
        <CustomizedTables showData={showData}  handleClick={handleClick}/>
        : show && <h3>{message}</h3>
      }
    </div>
  )
}

export default Fines