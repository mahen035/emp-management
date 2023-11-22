import React, { useState } from 'react';
import Employees from './Employees';
import { Link, useNavigate } from 'react-router-dom';
import './emp.css';
import uuid from "react-uuid";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditableRow from './EditableRow';
import ReadOnlyRow from './ReadOnlyRow';

function EmpDetails(props) {

    const[employees, setEmployees] = useState(Employees)

    const[searchVal, setSearchVal] = useState('')

    const id = uuid();
    let uniqueId = id.slice(0,8);

    //new approach
    const[addFormData, setAddFormData] = useState({
        name: '',
        age:''
    })

    const[editEmpData, setEditEmpData] = useState({
        name: '',
        age:''
    })

    const [editEmpId, setEditEmpId] = useState(null)

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

    function handleSearch(e){
        e.preventDefault();
        console.log(searchVal)

        if(containsNumber(searchVal)){
            setEmployees(Employees.filter(emp=>{
                return emp.id == searchVal
            }))
        }
        else{
            setEmployees(Employees.filter(emp=>{
                return emp.name.includes(searchVal)
            }))
        }
        navigate('/')
    }

    function containsNumber(str){
        return /\d/.test(str)
    }

    const handleAddFormChange = (e)=>{
        e.preventDefault();
        const fieldName = e.target.getAttribute('name')
        console.log("fieldName: " +fieldName)
        const fieldValue = e.target.value
        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue
        setAddFormData(newFormData)
    }

    const handleAddFormSubmit = (e) =>{
        e.preventDefault();
        
        // const newEmp = {
        //     id: uniqueId,
        //     name: addFormData.name,
        //     age: addFormData.age
        // }
        // const newEmployees = [...employees, newEmp]
        // setEmployees(newEmployees)
        
        setEmployees([...employees, {id: uniqueId, name:addFormData.name, age:addFormData.age}])
    }

    const handleEditEmpChange = (e) =>{
        e.preventDefault();
        const fieldName = e.target.getAttribute('name')
        //console.log("fieldName: " +fieldName)
        const fieldValue = e.target.value
        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue
        setEditEmpData(newFormData)

    }

    const handleEditClick = (e, emp)=>{
        e.preventDefault();
        setEditEmpId(emp.id)
        setEditEmpData (prev=>({...prev, name:emp.name, age:emp.age}))
    }

    const handleDeleteClick = ()=>{
        console.log('Delete functionality goes here')
    }

    const handleEditSubmit = (e)=>{
        e.preventDefault();
        //
        //
        console.log('Edited')
        setEditEmpId(null)
    }


    return (
        <div className='App'>
            <form onSubmit={handleEditSubmit}>
                <input  
                    type='text'
                    placeholder='Search for id or name'
                    onChange={(e)=>{setSearchVal(e.target.value)}}/>
                <button onClick={handleSearch}>Search</button>    
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
                           employees.length > 0
                           ? 
                             employees.map((emp)=>{
                            return(
                                // <tr key={emp.id}>
                                //     <td>{emp.name}</td>
                                //     <td>{emp.age}</td>
                                //     <td>
                                //         {/* <Link to = '/edit'>
                                //             <button onClick={()=>handleEdit(emp.id, emp.name, emp.age)}>
                                //                 <FaEdit />
                                //             </button>
                                //         </Link> */}

                                //         &nbsp;
                                //         <button onClick={()=>handleDelete(emp.id)}>
                                //             <FaTrashAlt />
                                //         </button>
                                //     </td>
                                // </tr>

                                <>
                                 
                                 {editEmpId === emp.id ?
                                 (
                                    <EditableRow editEmpData = {editEmpData}
                                                 handleEditEmpChange = {handleEditEmpChange}/>
                                 ):
                                 (
                                     <ReadOnlyRow emp = {emp}
                                                  handleEditClick = {handleEditClick}   
                                                  handleDeleteClick = {handleDeleteClick}/>   
                                 )
                             }                      
                                </>
                            )

                        })
                        :
                        'No Data Found'
                    }
                    </tbody>
                </table>
            </form>
            <br/>
            {/* <Link to = '/create'>
                <button>Add Employee</button>
            </Link> */}
            <h2>Add Employee</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input 
                    type='text' 
                    placeholder='Enter Name'
                    name = "name"
                    required = "required"
                    onChange={handleAddFormChange}/><br/><br/>
                <input 
                    type='number' 
                    placeholder='Enter Age'
                    name = 'age'
                    required = 'required'
                    onChange={handleAddFormChange}/><br/><br/> 
                <button type='submit' >Add Employee</button>      
            </form>

        </div>
    );
}

export default EmpDetails;