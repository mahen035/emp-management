import React, { useState } from 'react';
import Employees from './Employees';
import { Link, useNavigate } from 'react-router-dom';
import './emp.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function EmpDetails(props) {

    const[employees, setEmployees] = useState(Employees)

    let navigate = useNavigate();

    const handleEdit = ((id, name, age) =>{
       // console.log(id+":"+name+":"+age)
        localStorage.setItem('id', id);
        localStorage.setItem('name', name)
        localStorage.setItem('age', age)
    })

    const handleDelete = (id => {
        var index = Employees.findIndex(element=>element.id == id)
        Employees.splice(index, 1)
        navigate('/')
    })

    return (
        <div className='App'>
            <form>
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>AGE</th>
                            <th colSpan={2}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        employees.map((emp)=>{
                            return(
                                <tr key={emp.id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.age}</td>
                                    <td>
                                        <Link to = '/edit'>
                                            <button onClick={()=>handleEdit(emp.id, emp.name, emp.age)}>
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        &nbsp;
                                        <button onClick={()=>handleDelete(emp.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            )

                        })
                    }
                    </tbody>
                </table>
            </form>
            <br/>
            <Link to = '/create'>
                <button>Add Employee</button>
            </Link>
        </div>
    );
}

export default EmpDetails;