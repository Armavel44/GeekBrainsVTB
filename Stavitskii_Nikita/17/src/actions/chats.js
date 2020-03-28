export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_SEND = 'CHATS_SEND';
export const CHATS_ADD = 'CHATS_ADD';
export const CHATS_DELETE = 'CHATS_DELETE';
export const CHATS_ACTIVE = 'CHATS_ACTIVE';
export const CHATS_NOT_ACTIVE = 'CHATS_NOT_ACTIVE';
export const CHATS_REQUEST = 'CHATS_LOAD/CHATS_REQUEST';
export const CHATS_SUCCESS = 'CHATS_LOAD/CHATS_SUCCESS';
export const CHATS_FAILURE = 'CHATS_LOAD/CHATS_FAILURE';

// export const chatsLoad = () => ({
//     type: CHATS_LOAD
// });

export const chatsSend = (message) => ({
    type: CHATS_SEND,
    payload: message,
});

export const chatsAdd = (name) => ({
    type: CHATS_ADD,
    payload: name,
})

export const chatsDelete = (chatId) => ({
    type: CHATS_DELETE,
    payload: chatId,
})

export const chatsActive = (chatId, isActive) => ({
    type: CHATS_ACTIVE,
    payload: {chatId, isActive},
})

export const chatsNotActive = (chatId, isActive) => ({
    type: CHATS_NOT_ACTIVE,
    payload: {chatId, isActive},
})

export const chatsLoadRequest = () => ({
    type: CHATS_REQUEST
});

export const chatsLoadSuccess = (data) => ({
    type: CHATS_SUCCESS,
    payload: data,
});

export const chatsLoadFailure = (error) => ({
    type: CHATS_FAILURE,
    payload: error,
});

export const chatsLoad = () => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequest());
            const result = (await fetch('/api/chats.json'));
            dispatch(chatsLoadSuccess(await result.json()));
        } catch(error) {
            dispatch(chatsLoadFailure(error));
        }
    };
};