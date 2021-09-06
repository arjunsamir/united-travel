const sgMail = require('@sendgrid/mail');


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
    confirmation_notification: {
        en: "d-4ca62ff53f8f4965860013ad5d4fb560",
        es: "d-4ca62ff53f8f4965860013ad5d4fb560"
    },
    reset: {
        en: "d-9a9e4871986f4f738dd4dad88e7cb9e2",
        es: "d-e2d6051ed5714641b017c6ebc1f41bb7"
    },
    refund: {
        en: "d-cf0935c4a486410580387a88c3658681",
        es: "d-ddbd33d04e5d41aa96f198b5f6eb253c"
    },
    new_credit: {
        en: "",
        es: ""
    },
    refund_notification: {
        en: "",
        es: ""
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