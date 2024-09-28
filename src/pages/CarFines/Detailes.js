import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { convertToPersianNumbers, MiladiToShamsi, splitIntoThreeDigits } from '../../utils/replaceNumber';

function Detailes() {
    const [showData, setShowData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            handleClick(id);
        }
    }, [id])

    const handleClick = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/carsFines`);
            const data = await res.json()
      
            const plateExists = data.filter(carsFines => carsFines.id === id);
      
            setShowData(plateExists)

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='details'>
            {showData.length > 0 && <>
                <p><span className='details-title'>شرح تخلف</span> : <span>{showData[0].violation_title}</span></p>
                <p><span className='details-title'>کد تخلف</span> : <span>{convertToPersianNumbers(String(showData[0].violation_code) || '')}</span></p>
                <p><span className='details-title'>محل تخلف</span> : <span>{convertToPersianNumbers(String(showData[0].violation_location) || '')}</span></p>
                <p><span className='details-title'>تاریخ</span> : <span>{MiladiToShamsi(showData[0].date)}</span></p>
                <p><span className='details-title'>سریال</span> : <span>{convertToPersianNumbers(String(showData[0].serial) || '')}</span></p>
                <p><span className='details-title'>شناسه پرداخت</span> : <span>{convertToPersianNumbers(String(showData[0].payment_id) || '')}</span></p>
                <p><span className='details-title'>شناسه قبض</span> : <span>{convertToPersianNumbers(String(showData[0].receipt_id) || '')}</span></p>
                <p><span className='details-title'>پلاک</span> : <span>{convertToPersianNumbers(String(showData[0].license_plate) || '')}</span></p>
                <p><span className='details-title'>مبلغ</span> : <span>{convertToPersianNumbers(splitIntoThreeDigits(String(showData[0].amount) || ''))}</span> ریال</p>
            </>}
        </div>
    )
}

export default Detailes