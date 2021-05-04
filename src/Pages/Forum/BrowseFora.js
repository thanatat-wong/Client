import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

export default function BrowseFora(){
    const [fora, setFora] = useState([]);
    useEffect(() => {
        getFora();
    },[]);

    const getFora = async () => {
        const response = await axios.get('/api/forum');
        setFora(response.data);
    };
    const history = useHistory();
    return(
        <div style={{padding: "2rem"}}>
            <h1>Browse Forum</h1>
            <Button variant="contained" color="primary" onClick={() => history.push('/forum/create')}>Create Category</Button>
        <Divider style={{margin: "2rem 0"}}/>

        <List>
            {fora.map((cat, number) => (
                <ListItem button onClick={() => history.push(`/forum/${cat._id}`)}>
                    <ListItemText primary={cat.title} secondary={cat.createdAt}></ListItemText>
                </ListItem>
            ))}
        </List>
        </div>
    )
}