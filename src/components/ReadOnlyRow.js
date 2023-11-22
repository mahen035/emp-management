import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ReadOnlyRow({emp, handleEditClick, handleDeleteClick}) {
    return (
        <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.age}</td>
            <td>
                <button onClick={(e) => handleEditClick(e, emp)}><FaEdit/></button>
                <button onClick={(e) => handleDeleteClick(e)}><FaTrashAlt/></button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;