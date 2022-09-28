import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminServices from "../../service/AdminServices"

const Admin = () => {
    const[members, setMember] = useState([])

    useEffect(() => {
              getAllMembers();
    }, [])

    const getAllMembers = () => {
        AdminServices.getAllMembers().then((resp) => {
            setMember(resp.data)
            console.log(resp.data);
        }).catch(error =>{
               console.log(error);
        })
    }

         const deleteMember = (memberId) => {
            AdminServices.deleteMember(memberId).then((resp) => {
                 getAllMembers();
            }).catch(error => {
               console.log(error);
            })
         }

    return(
       <div className="container">
           <h2 className="text-center">List Members</h2>
           <Link to= "/add-Member" className="btn btn-primary mb-2">Add Member</Link>
           <table className="table table-borders table-stripd">
            <thead>
                <th>Member Id</th>
                <th>Member Name</th>
                <th>Member Email</th>
                <th>Member Mobile No.</th>
            </thead>
            <tbody>
                {
            members.map(
                        member =>
                        <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.f_name}</td>
                            <td>{member.f_email}</td>
                            <td>{member.f_mobilenum}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-member/${member.id}`}>Update</Link>
                                <button className="btn btn-danger" onClick={() => deleteMember(member.id)}
                                style = {{marginLeft:"10pxl"}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
           </table>
       </div>
    )
}

export default Admin