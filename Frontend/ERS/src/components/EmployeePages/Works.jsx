import React from 'react';
import { useParams } from 'react-router-dom';
import Empheader from '../../pgcomp/Empheader';

const Works = () => {
  const { organization_name, employeeId } = useParams();

  return (
    <div>
      <Empheader 
        organizationName={organization_name} 
        employeeId={employeeId} 
      />
      <h1>Works for {organization_name}</h1>
      <p>Employee ID: {employeeId}</p>
      {/* Other components or content for Works */}
    </div>
  );
};

export default Works;
