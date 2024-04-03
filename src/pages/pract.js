import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';

function Pract() {

useEffect(()=> {
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    console.log(factorial(5));   
})

  return (
    <div>
     
    </div>
  );
}

export default Pract;
