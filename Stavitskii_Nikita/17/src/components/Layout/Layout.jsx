import React, {Component} from "react";
import './Layout.css'

import {HeaderRedux} from "containers/HeaderContainer";
import {ChatList} from "../ChatList";
import {Messenger} from "../Messenger";

export class Layout extends Component {
    render() {
        const {chats, messages, sendMessage, addChat, handleLinkClick, deleteChat, isLoading, isFailure} = this.props;

        if(isLoading){
            return (<div>Loading...</div>);
        }

        if(isFailure){
            return (<div>Попробуйте обновить страницу, сервис временно недоступен...</div>);
        }

        return (
            <div className="layout">
                <HeaderRedux />
                <div className="messenger-container">
                    <ChatList
                        chats={chats}
                        messages={messages}
                        addChat={addChat}
                        handleLinkClick={handleLinkClick}
                        deleteChat={deleteChat}
                    />
                    <Messenger messages={messages} sendMessage={sendMessage} />
                </div>
            </div>
        );
    };
}