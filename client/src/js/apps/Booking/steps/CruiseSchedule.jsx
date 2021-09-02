// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Options from '../../components/Options';
import Dropdown from '../../components/Dropdown';
import DateTimePicker from '../../components/DateTimePicker';

// Import Utils
import { toHalf } from '../../helpers/utils';
import dayjs from 'dayjs';


// Create Step
const CruiseSchedule = ({ update, copy }) => {

    // Destructure Global State
    const { state } = useContext(AppContext);
    const { cruise, schedule: { dropoff } } = state.reservation;
    const { type, time, buffer } = cruise;

    return (
        <BookingCard
            back
            footer={type === 'departing' && time && buffer && {
                text: copy.footerText.replace('{time}', dayjs(dropoff).format('h:mm A'))
            }}
        >

            <fieldset>
                <h6 className="animate-item">{copy.fieldsetTitles.type}</h6>

                <Options
                    name="cruise-type"
                    options={["arriving", "departing"].map((val, i) => ({
                        label: copy.options[i],
                        value: val,
                    }))}
                    onChange={(checked, value) => checked && update("CRUISE-TYPE", value)}
                    selected={type}
                />

            </fieldset>

            <fieldset>

                <h6 className="animate-item">{copy.fieldsetTitles[type || "default"]}</h6>

                <DateTimePicker
                    value={cruise.time}
                    onChange={(val) => update("CRUISE-TIME", val)}
                    datePicker={{
                        label: copy.labels[0],
                        placeholder: copy.placeholders[0]
                    }}
                    timePicker={{
                        label: copy.labels[1],
                        placeholder: copy.placeholders[0]
                    }}
                />

            </fieldset>

            <fieldset>
                <h6 className={$.join("animate-item", [cruise.type !== 'departing', 'hidden'])}>{copy.fieldsetTitles.buffer}</h6>
                <Dropdown
                   id="arrival-buffer"
                   label={copy.labels[2]}
                   placeholder={copy.placeholders[1] || "Placeholder Value"}
                   options={[3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8].map(v => ({
                       text: copy.dropdownText.replace("{time}", toHalf(v)),
                       value: v
                   }))}
                   selected={cruise.buffer}
                   onSelect={(selected) => update('CRUISE-BUFFER', selected.value)}
                   customClasses={cruise.type !== 'departing' && 'hidden'}
                />
            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default CruiseSchedule;