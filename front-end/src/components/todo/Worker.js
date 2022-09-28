import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import WorkerService from "../../service/WorkerService";

const Worker = () => {

    const[visitors, setVisitor] = useState([])

    useEffect(() => {
              getAllVisitors();
    }, [])

    const getAllVisitors = () => {
        WorkerService.getAllVisitors().then((resp) => {
            setVisitor(resp.data)
            console.log(resp.data);
        }).catch(error =>{
               console.log(error);
        })
    }

         const deleteVisitor = (visitorId) => {
            WorkerService.deleteVisitor(visitorId).then((resp) => {
                 getAllVisitors();
            }).catch(error => {
               console.log(error);
            })
         }

    return(
       <div className="container">
           <h2 className="text-center">List Visitors</h2>
           <Link to= "/add-visitor" className="btn btn-primary mb-2">Add Visitor</Link>
           <table className="table table-borders table-stripd">
            <thead>
                <th>Visitor Id</th>
                <th>Visitor Name</th>
                <th>Visitor Mobile No.</th>
                <th>Visiting Flat No.</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {
            visitors.map(
                        visitor =>
                        <tr key={visitor.id}>
                            <td>{visitor.id}</td>
                            <td>{visitor.v_name}</td>
                            <td>{visitor.v_mobileno}</td>
                            <td>{visitor.flatowner.id}</td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-visitor/${visitor.id}`}>Update</Link>
                                <button className="btn btn-danger" onClick={() => deleteVisitor(visitor.id)}
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

export default Worker