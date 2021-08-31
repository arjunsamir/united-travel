const User = require('./../models/user');
const Credit = require('../models/credit');
const Settings = require('../models/settings');

// import Utils
const dayjs = require('dayjs');


const getDate = (days) => {

    return dayjs().add(days, 'day').format("MM-DD-YYYY");

}

const saveSponsor = async (sponsorCredit, sponsor) => {

    await sponsorCredit.save();

    if (sponsor.credits) sponsor.credits.push(sponsorCredit._id);
    else sponsor.credits = [sponsorCredit._id];

    await sponsor.save();

}


exports.issue = async (user) => {

    // Destructure User
    const referralCode = user.referredBy;

    // Hanlde Errors
    if (!referralCode) return;


    // Get Current Settings
    const settings = await Settings.findOne({ active: true });

    // Handle Errors
    if (!settings) return;


    // Destructure Settings
    const { referrals: { recruiter, candidate } } = settings;


    // 2. Find Sponsor & User
    const sponsor = await User.findOne({ referralCode });


    // Handle Errors
    if (!sponsor) return;


    // 3. Create User Credit
    const sponsorCredit = await Credit.create({
        expiration: getDate(recruiter.expiration),
        value: recruiter.bonus,
        status: 'pending',
        type: 'recruiter',
        user: sponsor._id
    });


    // 4. Create User Credit And Reference Sponsor
    const userCredit = await Credit.create({
        expiration: getDate(candidate.expiration),
        value: candidate.bonus,
        status: 'valid',
        type: 'candidate',
        user: user._id,
        dependant: {
            user: sponsor._id,
            credit: sponsorCredit._id,
        }
    });


    // Save User Credit
    user.credits = [userCredit._id];
    await user.save();


    // Update Sponsor Credit
    sponsorCredit.dependant = {
        user: user._id,
        credit: userCredit._id
    }


    // Save Sponsor Credit
    saveSponsor(sponsorCredit, sponsor);

}