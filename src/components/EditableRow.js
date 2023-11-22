import React from 'react';
import {FaSave} from 'react-icons/fa'
function EditableRow({ editEmpData, handleEditEmpChange }) {
    return (
        <tr>
            <td>
                <input
                  type='text'
                  
                  placeholder='Enter name'
                  name='name'
                  value={editEmpData.name}
                  onChange={handleEditEmpChange}
                />
            </td>
            <td>
                <input
                  type='number'
                 
                  placeholder='Enter Age'
                  name='age'
                  value={editEmpData.age}
                  onChange={handleEditEmpChange}
                />
            </td>
            <td>
                <button type='submit'>
                    <FaSave />
                </button>
            </td>
        </tr>    
    );
}

export default EditableRow;