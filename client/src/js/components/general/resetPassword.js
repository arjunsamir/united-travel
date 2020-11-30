import axios from 'axios';


export const initResetForm = () => {
    const form = $('#reset-form');
    const input = $('#reset-password');
    const error = $('#reset-error');
    const toggle = $('#show-password');
    const token = new URLSearchParams(window.location.search).get('token');


    toggle.on('change', e => input.set('type', e.target.checked ? 'text' : 'password'));

    form.prevent('submit', async () => {
        const password = input.val();
        if (password.length < 8) return error.text('Password must be at least 8 characters.');


        const res = await axios({
            method: 'POST',
            url: '/auth/reset-password',
            data: { password, token }
        });

        console.log(res);
        console.log('Redirecting in 10 seconds');

        if (res.data.status === 'success') {
            setTimeout(() => window.location = '/', 10000);
        }

    });
}