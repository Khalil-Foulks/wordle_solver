import React from 'react';

function InputForm (){
    return(
        <div className='form-container'>
            <label>Correct Letter Placement (Use ? for unknown):</label>
            <br/>
            <input/>
            <br/>
            <label>Known Letters:</label>
            <br/>
            <input/>
            <br/>
            <label>Incorrect Letters:</label>
            <br/>
            <input/>
        </div>
    )
}

export default InputForm;