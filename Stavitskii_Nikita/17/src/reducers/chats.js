import update from 'react-addons-update';
import {
    CHATS_ADD,
    CHATS_LOAD,
    CHATS_SEND,
    CHATS_DELETE,
    CHATS_ACTIVE,
    CHATS_NOT_ACTIVE,
    CHATS_REQUEST,
    CHATS_SUCCESS,
    CHATS_FAILURE,
} from 'actions/chats';

const initialState = {
    loading: false,
    entries: []
};

export const chatsReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case CHATS_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {$push: [{text: action.payload.text, author: action.payload.author}]},
                    }
                }
            });
        case CHATS_ADD:
            const newChatId = Object.keys(state.entries).length + 1;
            return update(state, {
                entries: { $merge: {
                    [newChatId]: {
                        id: newChatId,
                        name: action.payload.title,
                        messages: [],
                        isActive: false,
                    }
                }}
            })
        case CHATS_DELETE:
            const newState = {
                ...state,
                entries: {
                    ...state.entries,
                }
            }
            delete newState.entries[action.payload.chatId];
            console.log(state)
            return newState;
        case CHATS_ACTIVE:
             return update(state, {
                 entries: {
                     [action.payload.chatId]: {
                         isActive: {$set: action.payload.isActive}
                     }
                 }
             })
        case CHATS_NOT_ACTIVE:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        isActive: {$set: action.payload.isActive}
                    }
                }
            })

        case CHATS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case CHATS_SUCCESS:
            const entryData = Array.isArray(state.entries) ? action.payload : state.entries;
            console.log(state)
            return {
                ...state,
                loading: false,
                entries: entryData,
            };
        case CHATS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default: 
            return state;
    }
}