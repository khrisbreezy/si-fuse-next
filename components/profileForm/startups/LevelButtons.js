import React from "react";
import {decrementCurrentLevelState, decrementCurrentState} from "../../../store/actions/profile";
import {useDispatch, useSelector} from "react-redux";

const LevelButtonsComponent = ({noPrev = false, nextHandler = null}) => {
    const dispatch = useDispatch();

    const isEditingLevel = useSelector(state => state.profile.isEditingLevels);

    return <div className="d-flex mt-5">
        {(!noPrev && !isEditingLevel) &&
            <button className="btn prev mr-auto" type="button" onClick={() => dispatch(decrementCurrentLevelState())}>
                <span/> Prev
            </button>
        }

        <button className="btn next ml-auto" type="submit" onClick={nextHandler}>
            {isEditingLevel ? 'Save' : 'Next'} <span/>
        </button>
    </div>
}

export default LevelButtonsComponent;