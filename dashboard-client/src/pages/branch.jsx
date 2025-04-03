import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, Link } from "react-router-dom";

function Branch() {

    const {branchId} = useParams();

    const [items, setItems] = useState([])

    const {token} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://127.0.0.1:3000/api/stock/?branchId=${branchId}`, {headers: {
          Authorization: token
        }})
        .then((res) => {
          setItems(prev => (JSON.stringify(prev) === JSON.stringify(res.data) ? prev : res.data))
        })
        .catch((err) => {
        //   console.log(err)
        })
      });

    // console.log(items)

    if(!items || items.length == 0){
        return <h1> No items available </h1>
    }

    return (
        <div>
            {items.map((item) => (
            <div key={item.id}>
                <Link to={`/item/${item.id}`}>{item.name}</Link>
                <br />
            </div>
            ))}
        </div>
    );
};
export default Branch;