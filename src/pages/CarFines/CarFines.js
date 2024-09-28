import Pelak from "../shared-component/Pelak/Pelak";
import CustomizedTables from "./Table/Table";
import "./CarFines.css";
import React, { useState } from 'react';

function CarFines() {
  const [sections, setSections] = useState({ section1: '', section2: '', section3: '', section4: '' });
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);


  const handleClick = async () => {
    try {
      const formattedPlate = `ایران ${sections.section4} - ${sections.section3} ${sections.section2} ${sections.section1}`;
      console.log(formattedPlate)
      const res = await fetch(`http://localhost:5000/carsFines`);
      const data = await res.json()

      const plateExists = data.filter(carsFines => carsFines.license_plate === formattedPlate);
   
      setShowData(plateExists)
      setShow(true)

    } catch (error) {
      console.log(error)
    }


  }


  return (
    <>
      <div>
        <Pelak sections={sections} setSections={setSections} handleClick={handleClick} btn='تایید' />
        {showData.length > 0 ?
          <CustomizedTables showData={showData} />
          : show && <h3>جریمه ای برای این پلاک پیدا نشد</h3>
        }
      </div>
    </>
  );
}

export default CarFines;
