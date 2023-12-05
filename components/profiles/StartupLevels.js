import React from "react";
import {getFairness, startupLevel} from "../../helpers";
import {useDispatch} from "react-redux";
import {setCurrentLevelState, setIsEditingLevels} from "../../store/actions/profile";
import Router from "next/router";

const StartupProfileLevels = ({hasEdit = false, startupLevel, levelKeys, index, fairness}) => {
    const dispatch = useDispatch();

    const getLevelName = (name) => {
        switch (name) {
            case 'problem':
                return 'Problem';
            case 'team':
                return 'Team Capability';
            case 'vision':
                return 'Vision and Value';
            case 'products':
                return 'Product';
            case 'market':
                return 'Market';
            case 'business_model':
                return 'Business Model';
            case 'scale':
                return 'Scalability';
            case 'investor_exit':
                return 'Investor Exit';
        }
    }

    const goToLevel = level => {
        dispatch(setIsEditingLevels(true));
        dispatch(setCurrentLevelState(level + 1));
        Router.push('/profile/edit-levels');
    }

    return <div className="row">
        <div className="col-md-12">
            <div className={`startup-description startup-description-others ${getFairness(fairness)}`}>
                {/* {hasEdit &&
                <img onClick={() => goToLevel(index)} className="edit-icon"
                     title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                <div className="row">
                    <div className="col-md-4">
                        <div className={`d-flex flex-column h-100 justify-content-center text-center side-content ${getFairness(fairness)}`}>
                            <img src={`/images/icon/startup-level-${levelKeys[index]}.svg`}
                                 alt=""/>
                            <p className="p-0 level-name">{getLevelName(levelKeys[index])}</p>
                            <div className="grade">{getFairness(fairness)}</div>
                        </div>

                    </div>

                    <div className="col-md-8">
                        <div className="startup-level-content">
                            <ul>
                                {startupLevel.map((lvl, index) => <li key={index}>{lvl}</li>)}
                            </ul>
                        </div>
                    </div>
                </div> */}
                    {/* My own code */}
                {hasEdit &&
                <img onClick={() => goToLevel(index)} className="edit-icon"
                     title="Edit" src="/images/icon/pencil-icon.svg" alt=""/>}
                <div className="row">
                    <div className="col-md-12">
                        <div className={`d-flex align-items-center side-content`}>
                            <img className="mr-2" src={`/images/icon/startup-level-${levelKeys[index]}.svg`}
                                 alt=""/>
                            <p className="p-0 level-name">{getLevelName(levelKeys[index])}</p>
                            {/* <div className="grade">{getFairness(fairness)}</div> */}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="startup-level-content">
                            <ul>
                                {startupLevel.map((lvl, index) => <li key={index}>{lvl}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default StartupProfileLevels;