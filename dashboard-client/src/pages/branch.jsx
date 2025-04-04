import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, Link } from "react-router-dom";

function Branch() {

    const {branchId} = useParams();

    const [items, setItems] = useState([])

    const {token} = useContext(AuthContext);

    const [loading, setLoading] = useState(true); 

    const fetchData = () => {
      axios.get(`http://127.0.0.1:3000/api/stock/?branchId=${branchId}`, {
        headers: { Authorization: token },
      })
        .then((res) => {
          setItems((prev) => (JSON.stringify(prev) === JSON.stringify(res.data) ? prev : res.data));
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    useEffect(() => {
      setLoading(true);
      fetchData();

      // get data every 2 mins
      // const interval = setInterval(fetchData, 120000)

      // return () => clearInterval(interval);
    }, [branchId, token]);

    // console.log(items)

    if((!items || items.length == 0) && (!loading)){
        return <h1> No items available under this branch </h1>
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