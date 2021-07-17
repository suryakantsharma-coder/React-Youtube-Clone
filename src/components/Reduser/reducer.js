const init = true;

const changeUserState = (state = init, action) => {
    switch (action.type) {
        case "USERSTATE": return state = action.state;
        default: return state;
    }
}

export default changeUserState;