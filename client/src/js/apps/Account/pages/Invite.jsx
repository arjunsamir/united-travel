import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';

// Import Helpers & Libraries
import QRcode from 'qrcode.react';

const temp = "Invite your friends to join United Travel and save ${candidate} on their first ride. Once they book their first ride you'll get ${recruiter} off of your next ride."

const { candidate, recruiter } = window.settings.referrals;


const Invite = () => {

    // Destructure Global State
    const { state:  { referralCode } } = useContext(AppContext);


    const url = `https://www.unitedtravelflorida.com/login?code=${referralCode}`;

    return (
        <AccountPage>
            <div className="account__fields animate-children">
                <h5>Invite Your Friends</h5>
                <p className="small">{temp.replace("{candidate}", candidate.bonus).replace("{recruiter}", recruiter.bonus)}</p>
            </div>

            <div className="account__fields animate-children">
                <h5>Share your invite link</h5>
                <p className="small">{url.replace("https://", "")}</p>
                
                <div className="account__qr">
                    <QRcode value={url} size={256}/>
                </div>
            </div>

            

        </AccountPage>
    )

};


export default Invite;