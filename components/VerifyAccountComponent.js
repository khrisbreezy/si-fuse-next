import React, {useEffect} from "react";
import axiosInstance from "../config/axios";

export default function VerifyAccountComponent({tokenIsValid, reason, token = null}) {

    useEffect(() => {
        if (tokenIsValid) {
            axiosInstance.post('verify-account', {
                token
            })
        }
    }, [])

    return <>
        <div className="signup-content mt-5 pt-5">
            <h1>Account Verification</h1>

            {tokenIsValid
                ? <div className="reset-password-message text-center">You've successfully verified your account. Welcome onboard!</div>
                : <>
                    <div className="reset-password-message text-center">
                        {
                            reason === 'token expired'
                                ? <>
                                    <h4>Token Expired</h4>
                                    <p>The link you supplied has expired.</p>
                                </>
                                : <>
                                    <h4>Wrong Link</h4>
                                    <p>
                                        You have clicked on an invalid link. Please make sure that you have typed the link correctly.
                                        If are copying this link from a mail reader please ensure that you have copied all the lines in the link.
                                    </p>
                                </>
                        }
                    </div>
                </>}
        </div>
    </>
}