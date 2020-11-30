const sgMail = require('@sendgrid/mail');
const http = require("https");

class Email {

    constructor(user) {

        this.from = {
            address: 'contact@dayfiftyfive.com',
            name: 'United Travel LLC'
        };

        this.to = {
            email: user.email,
            name: user.name,
            preferred_name: user.preferredName
        };


        this.options = {
            method: 'POST',
            hostname: 'api.sendgrid.com',
            port: null,
            path: '/v3/mail/send',
            headers: {
                authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                "content-type": 'application/json'
            }
        };
    }


    use(template, vars) {

        switch (template) {

            case 'password-reset':
                this.templateID = 'd-ae88c166f4d0440485df84b0840b839d';
                this.subject = 'Password Reset - United Travel'
                break;

            case 'welcome':
                this.templateID = 'd-db8fc1d34ac94ab88dea49fa7f2699d6';
                this.subject = 'Welcome To United Travel';
                break;

        };


        const data = { ...vars };
        data.user_name = this.to.preferred_name;
        data.user_full_name = this.to.name;

        this.data = {
            personalizations: [
                {
                    to: [
                        {
                            email: this.to.email,
                            name: this.to.name
                        }
                    ],
                    dynamic_template_data: data,
                    subject: this.subject
                }
            ],
            from: {
                email: this.from.address,
                name: this.from.name
            },
            reply_to: {
                email: this.from.address,
                name: this.from.name
            },
            template_id: this.templateID
        };

        return this;

    }


    send() {

        if (!this.templateID) return console.log('ERROR... Please specify an email template.');

        const req = http.request(this.options, res => {

            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            })

        });

        req.write(JSON.stringify(this.data));

        req.end();

    }
};


module.exports = Email;