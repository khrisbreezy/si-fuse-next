import React from "react";
import {useSelector} from "react-redux";

export default function Loader() {
    const loading = useSelector(state => state.loader.loading);

    return <>
        {
            loading && <>
                <div className="loader-container"/>
                <div className="loader">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </>
        }
        <style jsx>{`
            .loader-container {
                position: fixed;
                background-color: black;
                opacity: .6;
                width: 100%;
                height: 100%;
                z-index: 201;
            }
            .loader {
                display: inline-block;
                position: fixed;
                bottom: 50%;
                left: 50%;
                display: inline-block;
                width: 50px;
                height: 50px;
                z-index: 202;
                transform: translate(-50%, -50%);
            }
            .loader div {
              animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              transform-origin: 40px 40px;
            }
            .loader div:after {
              content: " ";
              display: block;
              position: absolute;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #fff;
              margin: -4px 0 0 -4px;
            }
            .loader div:nth-child(1) {
              animation-delay: -0.036s;
            }
            .loader div:nth-child(1):after {
              top: 63px;
              left: 63px;
            }
            .loader div:nth-child(2) {
              animation-delay: -0.072s;
            }
            .loader div:nth-child(2):after {
              top: 68px;
              left: 56px;
            }
            .loader div:nth-child(3) {
              animation-delay: -0.108s;
            }
            .loader div:nth-child(3):after {
              top: 71px;
              left: 48px;
            }
            .loader div:nth-child(4) {
              animation-delay: -0.144s;
            }
            .loader div:nth-child(4):after {
              top: 72px;
              left: 40px;
            }
            .loader div:nth-child(5) {
              animation-delay: -0.18s;
            }
            .loader div:nth-child(5):after {
              top: 71px;
              left: 32px;
            }
            .loader div:nth-child(6) {
              animation-delay: -0.216s;
            }
            .loader div:nth-child(6):after {
              top: 68px;
              left: 24px;
            }
            .loader div:nth-child(7) {
              animation-delay: -0.252s;
            }
            .loader div:nth-child(7):after {
              top: 63px;
              left: 17px;
            }
            .loader div:nth-child(8) {
              animation-delay: -0.288s;
            }
            .loader div:nth-child(8):after {
              top: 56px;
              left: 12px;
            }
            @keyframes loader {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

        `}</style>
    </>
}