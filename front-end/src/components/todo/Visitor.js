import React, { useEffect } from "react";
import { useState } from "react";
import FlatownerServices from "../../service/FlatownerServices";

const Visitor = () => {

    const[visitors, setVisitor] = useState([])

    useEffect(() => {
              getAllVisitors();
    }, [])

    const getAllVisitors = () => {
        FlatownerServices.getAllVisitors().then((resp) => {
            setVisitor(resp.data)
            console.log(resp.data);
        }).catch(error =>{
               console.log(error);
        })
    }

    return(
       <div className="container">
           <h2 className="text-center">List Visitors</h2>
           <table className="table table-borders table-stripd">
            <thead>
                <th>Visitor Id</th>
                <th>Visitor Name</th>
                <th>Visitor Mobile No.</th>
                <th>flatowner</th>
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
                        </tr>
                    )
                }
            </tbody>
           </table>
       </div>
    )
}

export default Visitor