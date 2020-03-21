import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Link} from 'react-router-dom';
import './ChatList.css';
import {ListItemIcon, TextField} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";

export class ChatList extends Component {
    state = {
        title: ''
    }

    static propTypes = {
        onSend: PropTypes.func,
    };

    static defaultProps = {
        onSend: () => {},
    };

    handleChange = (e) => {
        this.setState({title: e.target.value})
    }

    handleAddChat = () => {
        const {addChat} = this.props;
        if (this.state.title.length > 0 && typeof addChat === 'function') {
            addChat(this.state);
            this.setState({title: ''});
        }
    }

    render() {
        const {chats} = this.props;
        const {title} = this.state;
        return (
            <List className="chat-list">
                {chats.map((chat, index) => {
                    let message = chat.messages[chat.messages.length - 1];
                    const secondaryValue = message === undefined ? 'No messages in chat' : (message.author + ': ' + message.text);
                    return (
                    <div key={index}>
                        <Link to={chat.link}>
                            <ListItem button className="chat-item">
                                <ListItemText primary={chat.name} secondary={secondaryValue}/>
                            </ListItem>
                        </Link>
                        <Divider variant="inset" component="li" />
                    </div>
                )})}
                <ListItem>
                    <ListItemIcon>
                        {/*<AddCircleIcon onClick={this.handleAddChat} />*/}
                        <Fab variant="round" color="primary" onClick={this.handleAddChat}><AddCircleIcon /></Fab>
                    </ListItemIcon>
                    <TextField fullWidth name="input" label="Add new chat name" onChange={this.handleChange} />
                </ListItem>
            </List>

        )
    }
}