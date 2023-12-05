import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axiosInstance from "../../../config/axios";
import Token from "../../../utils/Token";
import {useDispatch, useSelector} from "react-redux";
import {loader} from "../../../store/actions/loader";
import {decrementCurrentState, incrementCurrentState} from "../../../store/actions/profile";
import ErrorSpan from "../../UI/ErrorSpan";
import StartupProfileHeader from "./StartupProfileHeader";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {setStartupData} from "../../../store/actions/startupProfile";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function ProfileTwo({startup}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    const savedCompanyProfileImage = useSelector(state => state.profile.companyProfileImage)
    const savedCompanyName = useSelector(state => state.profile.companyName)

    const {register, handleSubmit, errors} = useForm();
    const hasProduct = () => startup.hasOwnProperty('product_services') && startup.product_services;

    const [productVideo, setProductVideo] = useState(hasProduct() ? startup.product_services.product_video_url : '');
    const [pitchVideo, setPitchVideo] = useState(hasProduct() ? startup.product_services.pitch_video_url : '');
    const [productImages, setProductImages] = useState(hasProduct() ? startup.product_services.product_image_array.map(img => ({source: img})) : []);

    const onSubmitHandler = async data => {
        dispatch(loader());
        let formData = new FormData();
        Object.keys(data).forEach(dataItem => formData.append(dataItem, data[dataItem]));
        productImages.forEach(pImage => formData.append('product_images[]', pImage));

        try {
            const {data: response} = await axiosInstance.post('startups/product-service', formData, {
                headers: {
                    Authorization: `Bearer ${Token()}`
                }
            });
            dispatch(setStartupData(response.data));
            dispatch(loader());
            dispatch(incrementCurrentState());
        } catch (e) {
            console.log(e);
            dispatch(loader());
        }
    }

    const createMarkup = (content) => {
        if (content && content.includes('<iframe')) {
            return {
                __html: content
            }
        }
    };

    const handleInit = () => {
        // console.log(this.pond);
    }

    return <>
        <section className="startup-levels">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <StartupProfileHeader/>

                                    <div className="d-md-none">
                                        <h4 className="text-center mb-3">Product and Services</h4>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmitHandler)} className="profile-details">
                                        <div className="row">
                                            <div className="col-md-4 text-center profile-pic">
                                                <img className="img-fluid "
                                                     src={savedCompanyProfileImage || startup.company.logo_url} alt=""/>
                                                <br/>
                                                <h5 className="mt-2">{savedCompanyName || startup.company.name}</h5>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="input-group-container">
                                                    <input ref={register({required: 'Please enter a product name'})}
                                                           className="full-width mb-0"
                                                           type="text" name="product_name"
                                                           placeholder="Product/Service Name"
                                                           defaultValue={hasProduct() ? startup.product_services.product_name : ''}/>
                                                    {errors.product_name &&
                                                    <ErrorSpan>{errors.product_name.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              className="full-width"
                                                              placeholder="Customer problem" name="customer_problem"
                                                              rows="4"
                                                              defaultValue={hasProduct() ? startup.product_services.customer_problem : ''}/>
                                                    {errors.customer_problem &&
                                                    <ErrorSpan>{errors.customer_problem.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              className="full-width"
                                                              name="proposed_solution" rows="4"
                                                              placeholder="Proposed solution"
                                                              defaultValue={hasProduct() ? startup.product_services.proposed_solution : ''}/>
                                                    {errors.proposed_solution &&
                                                    <ErrorSpan>{errors.proposed_solution.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <textarea ref={register({required: 'This field is required'})}
                                                              className="full-width"
                                                              name="value_proposition" placeholder="Value proposition"
                                                              rows="4"
                                                              defaultValue={hasProduct() ? startup.product_services.value_proposition : ''}/>
                                                    {errors.value_proposition &&
                                                    <ErrorSpan>{errors.value_proposition.message}</ErrorSpan>}
                                                </div>

                                                <div className="input-group-container">
                                                    <FilePond
                                                        files={productImages}
                                                        allowMultiple={true}
                                                        labelIdle="Product Images (Click here to upload)"
                                                        name="files"
                                                        oninit={() => handleInit()}
                                                        onupdatefiles={fileItems => {
                                                            setProductImages(fileItems.map(fileItem => fileItem.file))
                                                        }}
                                                    />
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register({})}
                                                           type="text"
                                                           onKeyUp={(e) => setProductVideo(e.target.value)}
                                                           className="full-width" name="product_video_url"
                                                           placeholder="Product Video (youtube embed code)"
                                                           defaultValue={hasProduct() ? startup.product_services.product_video_url : ''}/>
                                                    {errors.product_video_url &&
                                                    <ErrorSpan>{errors.product_video_url.message}</ErrorSpan>}
                                                    <div className="iframe-container"
                                                         dangerouslySetInnerHTML={createMarkup(productVideo)}/>
                                                </div>

                                                <div className="input-group-container">
                                                    <input ref={register({})}
                                                           type="text"
                                                           onKeyUp={(e) => setPitchVideo(e.target.value)}
                                                           className="full-width" name="pitch_video_url"
                                                           placeholder="Pitch Video (youtube embed code)"
                                                           defaultValue={hasProduct() ? startup.product_services.pitch_video_url : ''}/>
                                                    {errors.pitch_video_url &&
                                                    <ErrorSpan>{errors.pitch_video_url.message}</ErrorSpan>}
                                                    <div className="iframe-container"
                                                         dangerouslySetInnerHTML={createMarkup(pitchVideo)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <button className="btn prev mr-auto"
                                                    onClick={() => dispatch(decrementCurrentState())} type="button">
                                                <span/> Prev
                                            </button>
                                            <button className="btn next ml-auto" type="submit">Save <span/>
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
        <style jsx>{`
            .customer-problem-label {
                margin-top: 4rem;
            }
            iframe {
                width: 100%;
            }
            .iframe-container {
                margin-top: 20px;
            }
        `}</style>
    </>
}