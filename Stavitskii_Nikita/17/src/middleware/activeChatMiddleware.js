import {CHATS_ACTIVE, chatsNotActive} from 'actions/chats';

export function activeChatMiddleware(store) {
    return (next) => (action) => {
        if (action.type === CHATS_ACTIVE) {
            const {chatId} = action.payload;
            const currentChat = store.getState().chats.entries[chatId];
            // let isChatActive = true;
            // store.dispatch(chatsActive(chatId, isChatActive))
            setTimeout(() => {
                const isChatActive = false;
                store.dispatch(chatsNotActive(chatId, isChatActive));
            }, 10000);
        }
        return next(action);
    }

}