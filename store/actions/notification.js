import axiosInstance from "../../config/axios";
import Token from "../../utils/Token";

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';

export const fetchNotifications = () => {
    return async dispatch => {
        try {
            const {data: notifications} = await axiosInstance.get('notifications', {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(dispatchNotification(notifications.data))
        } catch (e) {
            console.log(e.response.data.message);
        }
    }
}

const dispatchNotification = (notifications) => ({type: FETCH_NOTIFICATIONS, notifications});