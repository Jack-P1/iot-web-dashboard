import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';

function Branch() {

    const {branchId} = useParams();

    const [items, setItems] = useState([])

    const {token, user} = useContext(AuthContext);

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
    }, [branchId, token]);

    if((!items || items.length == 0) && (!loading)){
        return <h1> No items available under this branch </h1>
    }

    return (
        <div>
          <Row xs={2} md={3} className="g-4">
            {items.map((item) => (
              <Col key={item.id}>
                <Card className="mt-3">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {console.log(item)}
                    <Card.Subtitle className="mb-2 text-muted">Current value: {item.latestDistance ? item.latestDistance : 0}</Card.Subtitle>
                    <Card.Text>
                      {item.description ? item.description : ''}
                    </Card.Text>
                    <Link to={`/item/${item.id}`} state={{item}}> View </Link>
                    {user?.role == 'admin' && <><br /> <Link to={`/item/${item.id}/edit`} state={{item}}> Edit </Link> </>}
                  </Card.Body>
                    <Card.Footer className="text-muted">Updated: {item.lastUpdated ? item.lastUpdated : ''}</Card.Footer> 
                </Card>
              </Col>
            ))}
          </Row>
        </div>
    );
};
export default Branch;