import React from 'react';
import './Spinner.css';

const Spinner =({size})=>{
    const spinnerClass = size==='small'?'spinner-small':'spinner';
    return <div className={spinnerClass}></div>;
    
    
};

export default Spinner;