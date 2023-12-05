import React from "react";

export default function Error({children}) {
    return <>
        <span className="error-span text-danger">{children}</span>

        <style jsx>{`
            .error-span {
                font-size: 12px;
                padding: 2px;
            }
        `}
        </style>
    </>
}