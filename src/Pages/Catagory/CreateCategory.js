import { Button, TextField } from "@material-ui/core";
import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const CreateCategory = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");

    const handleOnSubmit = async event => {
        event.preventDefault();

        const data = {
            title
        };

        const response = await axios.post('/api/category/create', data);
        const {_id} = response.data;
        history.push('/category/'+_id);
    };
    return(
        <div style={{padding: "2rem"}}>
            <h1 style={{marginBottom: "2rem"}}>Create Category</h1>
            <Alert variant="filled" severity="warning">
            Make sure check a form that be corrected before submit!!
            </Alert>
            <form onSubmit={handleOnSubmit}>
                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>
    )
};

export default CreateCategory;