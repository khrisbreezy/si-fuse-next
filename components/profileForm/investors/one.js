import DropNCrop from "@synapsestudios/react-drop-n-crop";
import Error from "../../UI/ErrorSpan";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loader} from "../../../store/actions/loader";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {incrementCurrentState, setInvestorProfileImage} from "../../../store/actions/profile";
import {showNotifier} from "../../../store/actions/notifier";
import InvestorProfileHeader from "./InvestorProfileHeader";
import Slim from "../../../public/slim/slim.react";
import {setInvestorProfile} from "../../../store/actions/investorProfile";

const InvestorBasicInfo = ({investor, locations}) => {
    const dispatch = useDispatch();

    const {register, handleSubmit, errors} = useForm();

    const [adminError, setAdminError] = useState();

    const hasProfilePic = () => investor.hasOwnProperty('profile') && investor.profile;

    const getAdminError = type => adminError && adminError.hasOwnProperty(type) ? adminError[type][0] : '';

    const [profilePicture, setProfilePicture] = useState([]);

    const [profilePicError, setProfilePicError] = useState(null);
    console.log(profilePicture);
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
    // const onChangePicture = value => {
    //     setProfilePicture(value);
    // }
    const nextPageHandler = async data => {
        let logo = null;

        setProfilePicError(null);
        if (!profilePicture || (profilePicture && profilePicture.length === 0)) {
            setProfilePicError('Please upload a profile picture!');
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return;
        }

        if (profilePicture[0]) {
            logo = await toBase64(profilePicture[0]);
            data = {...data, logo};
        }

        dispatch(loader());
        try {
            const {data: response} = await axiosInstance.post('investors', data, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setInvestorProfile(response.data));
            dispatch(loader());
            dispatch(setInvestorProfileImage({
                image: response.data.profile.profile_pic_url,
                name: response.data.profile.user.first_name + ' ' + response.data.profile.user.last_name
            }))
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
            dispatch(showNotifier(e.response.data.message, 'danger'));
            setAdminError(e.response.data.errors);
        }
    }

    const hasProfile = () => investor.hasOwnProperty('profile') && investor.profile;

    useEffect(() => {
        setProfilePicture([]);

        function formatState(state) {
            if (!state.id) {
                return state.text;
            }

            const baseUrl = locations.find(location => location.id === +state.id).flag

            const $state = $(
                '<span><img class="img-flag" /> <span></span></span>'
            );

            // Use .text() instead of HTML string concatenation to avoid script injection issues
            $state.find("span").text(state.text.split('-')[0]);
            $state.find("img").attr("src", baseUrl);

            return $state;
        };

        setTimeout(() => {
            $(".select2").select2({
                templateSelection: formatState
            });
        }, 2000);

    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const slimService = (formData, progress, success, failure, slim) => {
        console.log(formData)

        setProfilePicture(formData)

        success('done');
    }

    return <section className="startup-levels">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="white-bg">
                        <div className="row">
                            <div className="col-md-9 mx-auto">
                                <InvestorProfileHeader/>

                                <div className="d-md-none">
                                    <h4 className="text-center mb-3">Basic Information</h4>
                                </div>

                                <form onSubmit={handleSubmit(nextPageHandler)} className="profile-details">
                                    <div className="row">
                                        <div className="col-md-4 profile-pic mb-5">
                                            {
                                                <Slim ratio="1:1"
                                                      service={slimService.bind(this)}
                                                      serviceFormat="file"
                                                      label="Profile Picture <br> (Click here to upload)"
                                                      push={true}
                                                >
                                                    <img src={hasProfilePic() ? (investor.profile.profile_pic_url || null) : null}
                                                         alt=""/>
                                                    <input type="file" name="foo"/>
                                                </Slim>
                                            }
                                            <span className="d-block" id="profile-pic-error">{profilePicError &&
                                            <Error>Please upload a profile picture!</Error>}</span>

                                            <input ref={register({required: 'This field is required'})} type="hidden"
                                                   defaultValue={profilePicture.result}/>
                                            {
                                                profilePicture.result ? (
                                                    <>
                                                        <img className="profile-pic img-fluid img-thumbnail mt-5"
                                                             src={profilePicture.result}/>
                                                    </>) : null
                                            }
                                            <span className="d-block">{errors.profile_pic &&
                                            <Error>Please upload a profile picture!</Error>}</span>
                                        </div>

                                        <div className="col-md-8">
                                            <div className="input-group-container">
                                                <input type="text" ref={register({required: 'This field is required'})} name="company_name" placeholder="Company Name"
                                                       defaultValue={hasProfile() ? investor.profile.company_name : ''}
                                                       className="full-width w-100"/>
                                                {errors.company_name && <Error>{errors.company_name.message}</Error>}
                                            </div>

                                            <div className="input-group-container">
                                                <input type="text" name="website" ref={
                                                    register({
                                                        pattern: {
                                                            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                                                            message: 'Please enter a valid URL'
                                                        }
                                                    })
                                                } placeholder="Website"
                                                       defaultValue={hasProfile() ? investor.profile.website : ''}
                                                       className="full-width w-100"/>
                                                {errors.website && <Error>{errors.website.message}</Error>}
                                            </div>

                                            <div className="input-group-container">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="facebook social mb-10">
                                                            <input ref={register}
                                                                   name="facebook" type="url"
                                                                   className="w-100"
                                                                   defaultValue={hasProfile() ? investor.profile.facebook : ''}
                                                                   placeholder="Facebook url"/>
                                                            <span className="d-block">{errors.facebook &&
                                                            <Error>{errors.facebook.message}</Error>}</span>
                                                        </div>
                                                    </div>

                                                    <div className="pl-0 col-6">
                                                        <div className="instagram social mb-10">
                                                            <input ref={register} name="instagram" type="url"
                                                                   className="w-100"
                                                                   defaultValue={hasProfile() ? investor.profile.instagram : ''}
                                                                   placeholder="Instagram url"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="twitter social">
                                                            <input ref={register} name="twitter" type="url"
                                                                   className="w-100"
                                                                   defaultValue={hasProfile() ? investor.profile.twitter : ''}
                                                                   placeholder="Twitter url"/>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 pl-0">
                                                        <div className="linked-in social">
                                                            <input ref={register} name="linkedin" type="url"
                                                                   className="w-100"
                                                                   defaultValue={hasProfile() ? investor.profile.linkedin : ''}
                                                                   placeholder="LinkedIn url"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="input-group-container">
                                                <div className="row">
                                                    <div className="col-md-3 col-4 pr-0">
                                                        <select name="country_code" className="select2 country"
                                                                ref={register({required: "This field is required"})}
                                                                defaultValue={hasProfile() ? investor.profile.country_code : ''}>
                                                            {
                                                                locations.map(({id, country_area_code, country}) =>
                                                                    <option key={id}
                                                                            value={id}>{country_area_code} - {country}</option>)
                                                            }
                                                        </select>
                                                        {errors.country_code &&
                                                        <Error>{errors.country_code.message}</Error>}
                                                    </div>

                                                    <div className="col-md-9 col-8">
                                                        <input ref={register({required: "This field is required"})}
                                                               className="w-100"
                                                               type="number" name="phone" id=""
                                                               placeholder="Phone number"
                                                               defaultValue={hasProfile() ? investor.profile.phone : ''}/>
                                                        {errors.phone && <Error>{errors.phone.message}</Error>}
                                                        {getAdminError('phone') &&
                                                        <Error>{getAdminError('phone')}</Error>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="input-group-container">
                                                <select name="gender"
                                                        ref={register({required: 'This field is required'})}
                                                        defaultValue={hasProfile() ? investor.profile.gender : ''}>
                                                    <option value="">Sex</option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                                {errors.gender && <Error>{errors.gender.message}</Error>}
                                            </div>

                                            <div className="input-group-container">
                                                <select ref={register({required: 'Please select a Location'})}
                                                        name="location_id"
                                                        defaultValue={hasProfile() ? investor.profile.location_id : ''}>
                                                    <option value="">Select Location</option>
                                                    {locations.map(({country, id}) => <option value={id}
                                                                                              key={id}>{country}</option>)}
                                                </select>
                                                {/*{errors.gender && <Error>{errors.gender.message}</Error>}*/}
                                            </div>

                                            <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              className="full-width mt-0"
                                                              name="about" id="" placeholder="About yourself"
                                                              defaultValue={hasProfile() ? investor.profile.about : ''}
                                                              rows="4"/>
                                                {errors.about && <Error>{errors.about.message}</Error>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <button className="btn next ml-auto" type="submit">
                                            Save <span/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default InvestorBasicInfo;