
const setUserState = (value) => {
    localStorage.setItem("userState", value);
}

const getUserState = () => {
    return localStorage.getItem("userState");
}


export { setUserState, getUserState };