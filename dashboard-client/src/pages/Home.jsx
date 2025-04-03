import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { Link } from "react-router-dom";

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
        {branches.map((branch) => (
          <div key={branch.id}>
            <Link to={`/branch/${branch.id}`}>{branch.name}</Link>
            <br />
          </div>
        ))}
      </div>
    );
};
export default Home;