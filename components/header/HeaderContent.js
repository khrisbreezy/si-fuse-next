import React, {useEffect, useState} from "react";
import Slider from "react-slick";

export default function () {

    const [changingText, setChangingText] = useState({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        fade: true
    });

    useEffect(() => {
        window.addEventListener('scroll', (event) => {
            if (window.pageYOffset >= 319) {
                setChangingText({
                    autoplay: false,
                    autoplaySpeed: 3000,
                    arrows: false,
                    fade: false
                })
            } else {
                setChangingText({
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    fade: true
                })
            }
        })
    }, []);

    return <div className="header-wrapper">
        <div className="social-icons">
            <a target="_blank" href="//www.facebook.com/SI-Fuse-105249634372571/">
                <img src="images/icon/facebook.svg" alt=""/>
            </a>

            <a target="_blank" href="//twitter.com/sifuse1">
                <img src="images/icon/twitter.svg" alt=""/>
            </a>

            <a target="_blank" href="//www.instagram.com/sifuse_africa/">
                <img src="images/icon/instagram.svg" alt=""/>
            </a>

            <a target="_blank" href="//www.linkedin.com/company/sifuse/about/">
                <img src="images/icon/linkedIn.svg" alt=""/>
            </a>
        </div>

        {/*<h1>Connecting Investors <br/>with <span className="txt-rotate" data-period="300" data-rotate='["Female led", "Female owned", "Gender diverse"]'></span><br/> Startups</h1>*/}
        <h1>
            Connecting <br className="d-md-none"/> Investors With

            <div className="changing-text">
                <Slider {...changingText}>
                    <div>
                    <span>
                        Female led
                    </span>
                        <br className="d-md-none"/>
                        Startups
                    </div>

                    <div>
                    <span>
                        Female owned
                    </span>
                        <br className="d-md-none"/>
                        Startups
                    </div>

                    <div>
                    <span>
                        Gender diverse
                    </span>
                        <br className="d-md-none"/>
                        Startups
                    </div>
                </Slider>

            </div>
        </h1>
    </div>
}