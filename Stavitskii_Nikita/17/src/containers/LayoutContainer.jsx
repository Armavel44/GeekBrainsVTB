import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

import {Layout} from 'components/Layout';
import {chatsLoad, chatsSend, chatsAdd, chatsDelete, chatsActive} from 'actions/chats';

class LayoutContainer extends Component {
    componentDidMount() {
        const {loadChats} = this.props;
        loadChats();
    }

    handleMessageSend = (message) => {
        const {sendMessage, chatId, activeChat} = this.props;
    
        sendMessage({
            ...message,
            chatId,
        });
        const isChatActive = true;
        chatsActive(chatId, isChatActive);
    };

    handleChatAdd = (title) => {
        const {addChat, chatId} = this.props;

        addChat({
            ...title,
            chatId,
        })
    }

    handleLinkClick = (link) => {
        this.props.push(link);
    }

    render() {
        const {chats, messages, deleteChat, isLoading, isFailure} = this.props;
        return (<Layout
            chats={chats}
            messages={messages}
            sendMessage={this.handleMessageSend}
            addChat={this.handleChatAdd}
            handleLinkClick={this.handleLinkClick}
            deleteChat={deleteChat}
            isLoading={isLoading}
            isFailure={isFailure}
        />);
    }
}

function mapStateToProps(state, ownProps) {
    const chats = state.chats.entries;
    const {match} = ownProps;

    let messages = null;

    if(match && chats[match.params.id]){
        messages = chats[match.params.id].messages;
    }

    let chatsArrayForShow = [];
    for(let key in chats){
        if(chats.hasOwnProperty(key)){
            chatsArrayForShow.push({name: chats[key].name, messages: chats[key].messages, link: `/chats/${chats[key].id}`, isActive: chats[key].isActive});
        }
    }

    return {
        chats: chatsArrayForShow,
        messages,
        chatId: match ? match.params.id : null,
        isLoading: state.chats.loading,
        isFailure: state.chats.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadChats: () => dispatch(chatsLoad()),
        sendMessage: (message) => dispatch(chatsSend(message)),
        addChat: (title) => dispatch(chatsAdd(title)),
        deleteChat: (chatId) => dispatch(chatsDelete(chatId)),
        push: (link) => dispatch(push(link)),
        activeChat: (chatId, isActive) => dispatch(chatsActive(chatId, isActive)),
    }
}

export const LayoutRedux = connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);