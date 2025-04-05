import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function Home() {

    const [branches, setBranches] = useState([]);

    const {token} = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://127.0.0.1:3000/api/branch/user/', {headers: {
          Authorization: token
        }})
        .then((res) => {
          setBranches(prev => (JSON.stringify(prev) === JSON.stringify(res.data) ? prev : res.data))
        })
        .catch((err) => {
          console.log(err)
        })
      });

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id}>
                <td>{branch.name}</td>
                <td>{branch.location}</td>
                <td> <Link to={`/branch/${branch.id}`}>View</Link> </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
    );
};
export default Home;