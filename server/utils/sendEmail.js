const sgMail = require('@sendgrid/mail');
const http = require("https");


// Init SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Get Correct Email Template ID
const templates = {
    welcome: {
        en: "d-454ad7cee7734a35b9c292d591b6c7c6",
        es: "d-82b052e9856243aca1f4d0e10b11845e"
    },
    confirmation: {
        en: "d-ed64b503ab884ec9837ab42908f40e9b",
        es: "d-6c8b6e17d86740b09bf5b5dafb8b5f12"
    },
    reset: {
        en: "d-9a9e4871986f4f738dd4dad88e7cb9e2",
        es: "d-e2d6051ed5714641b017c6ebc1f41bb7"
    },
    reminder: {
        en: "",
        es: ""
    }
}


// Create Funciton to Send Email
module.exports =  async ({to, template, locale, data}) => {

    const msg = {
        to,
        from: {
            email: 'hello@unitedtravelflorida.com',
            name: 'United Travel'
        },
        templateId: templates[template][locale || 'en'],
        dynamic_template_data: data || {}
    }

    await sgMail.send(msg);

}