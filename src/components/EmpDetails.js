import React, { useState } from 'react';
import Employees from './Employees';
import { Link } from 'react-router-dom';
import './emp.css';

function EmpDetails(props) {

    const[employees, setEmployees] = useState(Employees)

    const handleEdit = ((id, name, age) =>{
        console.log(id+":"+name+":"+age)
        localStorage.setItem('id', id);
        localStorage.setItem('name', name)
        localStorage.setItem('age', age)
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
                                            <button onClick={()=>handleEdit(emp.id, emp.name, emp.age)}>Edit</button>
                                        </Link>
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