import {CHATS_ACTIVE, CHATS_SEND, chatsActive, chatsNotActive} from 'actions/chats';

export function activeChatMiddleware(store) {
    return (next) => (action) => {
        if (action.type === CHATS_SEND) {
            const {chatId} = action.payload;
            const isChatActive = true;
            if (store.getState().router.location.pathname.split('/')[2] !== chatId) {
                store.dispatch(chatsActive(chatId, isChatActive));
            }
        } else if (action.type === CHATS_ACTIVE) {
            const {chatId} = action.payload;
            setTimeout(() => {
                const isChatActive = false;
                store.dispatch(chatsNotActive(chatId, isChatActive));
            }, 10000);
        } else if (action.type === '@@router/LOCATION_CHANGE' && !action.payload.isFirstRendering) {
            const chatId = action.payload.location.pathname.split('/')[2];
            const isChatActive = false;
            if (store.getState().chats.entries[chatId].isActive) {
                store.dispatch(chatsActive(chatId, isChatActive));
            }
        }
        return next(action);
    }

}