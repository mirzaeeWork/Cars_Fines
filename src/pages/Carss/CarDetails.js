import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h1>Car Details</h1>
      <p>Car ID: {id}</p>
    </div>
  );
};

export default CarDetails;
