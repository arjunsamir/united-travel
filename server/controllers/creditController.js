const User = require('./../models/user');
const Credit = require('../models/credit');
//const Email = require('./../utils/email');


exports.issue = async (referralCode, name) => {

    // 1. Define Credit Values
    const val = {
        user: 15,
        sponsor: 10
    };


    // 2. Find Sponsor & User
    const sponsor = await User.findOne({ referralCode });

    if (!sponsor) return [];


    // 3. Create User Credit
    const sponsorCredit = await Credit.create({
        value: val.sponsor,
        status: 'pending',
        description: `Congrats! You got a ${val.sponsor}$ ride credit for inviting ${name}. Your ride credit will expire 1 year from now.`,
        userRef: sponsor._id
    });


    // 4. Create User Credit And Reference Sponsor
    const userCredit = await Credit.create({
        value: val.user,
        description: `Congrats! You get ${val.user}$ off your first ride from being invited by ${sponsor.name}. Your ride credit will expire 1 year from now.`,
        creditRef: sponsorCredit._id
    });


    // 5. Apply Credit To Sponsor
    sponsor.credits.push(sponsorCredit._id);
    sponsor.save();


    // 6. Apply Credit To New User
    return [userCredit._id];

}