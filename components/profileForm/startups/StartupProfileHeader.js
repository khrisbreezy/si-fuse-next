import {useSelector} from "react-redux";
import React from "react";

const StartupProfileHeader = ({isChecked, isClickable, isActive}) => {
    const currentProfile = useSelector(state => state.profile.currentState);

    const width = () => {
        switch (currentProfile) {
            case 1:
                return '5%';
            case 2:
                return '28%';
            case 3:
                return '50%';
            case 4:
                return '73%';
            default:
                return '105%';
        }
    }

    const labels = ['Company', 'Products', 'Finance', 'Funding', 'Marketing'];

    return <div className="steps-wrapper startup-profile">
        <div className="steps">
            {
                labels.map((label, index) => < div key={label} className={`step ${currentProfile > (index) ? 'is-active is-checked' : ''} ${currentProfile === index ? 'is-clickable' : ''}`}>

                    <p className="label">{label}</p>

                    <div className="circles">
                        <div className="circle"/>
                        <div className={`circle bigger-circle ${currentProfile > (index) ? 'is-active is-checked is-clickable' : ''}`}/>
                    </div>
                </div>)
            }
        </div>
        <div className="progress" style={{width: width()}}/>
    </div>

}

export default StartupProfileHeader;