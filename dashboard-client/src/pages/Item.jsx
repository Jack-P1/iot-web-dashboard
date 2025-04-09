import axios from "axios";
import Chart from "./Chart";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, useLocation, Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Item() {

    const location = useLocation(); 
    const {itemId} = useParams();

    const { item } = location.state || {}; 

    const [itemData, setItemData] = useState(item);
    
    const {token} = useContext(AuthContext);
    const [tabKey, setTabKey] = useState('24hr');

    useEffect(() => {
        // fallback: fetch if item wasn't passed (e.g. user loaded /item/:id directly)
        if (!item) {
            
            axios.get(`http://127.0.0.1:3000/api/item/?itemId=${itemId}`, {
                headers: { Authorization: token },
            })
            .then((res) => {
                setItemData((prev) => (JSON.stringify(prev) === JSON.stringify(res.data) ? prev : res.data));
            })
            .catch((err) => {
                console.error(err);
            })
        }
      }, [item, itemId]);

    function handleSelect(k){
        console.log("SELECT!")
        setTabKey(k)
    }

    if(!itemData) return <div> Loading... </div>

    const dateTo = new Date(itemData.lastUpdated)
    const dateFrom = new Date(dateTo)
    dateFrom.setDate(dateFrom.getDate() - 1)

    return (
        <div>
            <div className="container d-flex justify-content-center">
                <h2 className="mt-2"> {itemData.name} </h2> 
            </div>
            <div className="container d-flex justify-content-center">
                <h3> Current status: {itemData.latestReading}</h3>
            </div>
            <div className="container d-flex justify-content-center">
                <h3> Temperature: </h3>
            </div>
            <div className="container d-flex justify-content-center">
                <h3> Last updated: {itemData.lastUpdated}</h3>
            </div>
            <Tabs
                id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => handleSelect(k)}
                className="mb-3"
            >
                <Tab eventKey="24hr" title="24hr">
                    <div className="container d-flex justify-content-center mb-2" style={{height:400}}>
                        <Chart dateFrom={dateFrom} dateTo={dateTo} itemId={itemId}> </Chart>
                    </div>
                </Tab>
                <Tab eventKey="48hr" title="48hr">
                    Tab content for 48hr
                </Tab>
            </Tabs>
        </div>
    )
};

export default Item;