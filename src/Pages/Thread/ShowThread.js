import React, {useState, useEffect, useContext} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Button, TextField } from "@material-ui/core";
import AuthContext from "../../Contexts/AuthContext";
import Divider from "@material-ui/core/Divider";

export default function ShowThread(){
    const {user} = useContext(AuthContext);
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const {id} = useParams();
    useEffect(() => {
        getThread();
        getPosts();
    },[]);

    const getThread = async () => {
        const response = await axios.get('/api/thread/'+id);
        setThread(response.data);
    };

    const getPosts = async () => {
        const response = await axios.get('/api/post/thread/'+id, {
            params:{
                page
            }
        });
        if(response.data.length){
            setPosts(response.data);
            setPage(page + 1);
            setHasMore(true);
        }else{
            setHasMore(false);
        }
    };

    const handleReply = async event => {
        event.preventDefault();
        if(!replyContent) return;
        const data = {
            userId: user._id,
            threadId: thread._id,
            content: replyContent
        };

        const response = await axios.post("/api/post/create", data);
        setPosts([...posts, response.data]);
    }

    const history = useHistory();
    return(
        <div style={{padding: "2rem"}}>
            {thread && <h1>{thread.title}</h1>}
            {thread && <p>{thread.content}</p>}
            <Divider style={{margin: "2rem 0"}}/>
            <h3>Comment:</h3>
            <List>
            {posts.map((post, index) => (
                <ListItem key={index}>
                    <ListItemText primary={post.content} secondary={post.createdAt}>
                    </ListItemText>
                </ListItem>
            ))}
        </List>

        <Button variant="contained" color="primary" disabled={!hasMore} style={{marginRight:"1rem"}} onClick={getPosts}>Load More Posts</Button>
        <Button variant="contained" color="primary" onClick={() => setIsReplying(true)}>Reply</Button>
        {isReplying && (
            <form onSubmit={handleReply}>
            <TextField fullWidth label="Content" value={replyContent} onChange={e => setReplyContent(e.target.value)}/>
            
            <Button type="submit">Reply</Button>
            </form> 
        )}
        
        </div>
    )
}