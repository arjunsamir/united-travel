import axios from 'axios';

const handleLogout = () => {
    const btn = $('#logout-btn').click(async () => {

        // const auth2 = window.gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        // console.log('User signed out.');
        // });


        const res = await axios('/auth/revoke-session');

        console.log(res);

    });

    console.log('logout handler successfully attached');
}

export const initCore = () => {

    handleLogout();

}