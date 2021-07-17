import fire from './firebaseInit';

let state = true;
const UserState = () => {
    fire.auth().onAuthStateChanged((user) => {
        if (user) {
            state = true;
        } else {
            state = false;
        }
    })
}

UserState();

export default state;