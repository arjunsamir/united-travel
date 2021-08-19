const User = require('./../models/user');
const Credit = require('../models/credit');
const Settings = require('../models/credit');
//const Email = require('./../utils/email');


exports.issue = async (referralCode) => {

    // Get Current Settings
    const settings = await Settings.findOne({ active: true });


    // 2. Find Sponsor & User
    const recruiter = await User.findOne({ referralCode });

    if (!recruiter) return [];


    // 3. Create User Credit
    const recruiterCredit = await Credit.create({
        value: settings.referrals.recruiter.bonus,
        expiration: settings.referrals.recruiter.expiration * 1000 * 60 * 60 * 24,
        status: 'pending',
        userRef: recruiter._id
    });


    // 4. Create User Credit And Reference Sponsor
    const userCredit = await Credit.create({
        value: settings.referrals.candidate.bonus,
        expiration: settings.referrals.candidate.expiration * 1000 * 60 * 60 * 24,
        creditRef: recruiterCredit._id
    });


    // 5. Apply Credit To Sponsor
    recruiter.credits.push(recruiterCredit._id);
    recruiter.save();


    // 6. Apply Credit To New User
    return [userCredit._id];

}