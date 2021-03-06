import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { BASE_URL } from '../../config';


const BannerModal = props => {

    // Reference Values
    const imgFile = React.createRef();
    const token = window.localStorage.getItem("auth_token");

    // Redux State
    const state = useSelector(state => state.user);

    // State
    const [user, setUser] = useState({});


    const uploadBannerImg = async () => {
        if (imgFile.current.files[0] !== undefined) {
            const formData = new FormData();
            formData.append('file', imgFile.current.files[0])

            const res = await fetch(`${BASE_URL}/api/bucket/upload`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("uploadImg res failure")
            } else {
                const json = await res.json()
                setUser(state.user.profile.banner_pic = json.sprite)
            }
            const newres = await fetch(`${BASE_URL}/api/users/token/update`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(state.profile.banner_pic)
            })
            if (!newres.ok) {
                // -- TODO -- Handling
                console.log("NewRes User update failed");
            } else {
                // -- TODO -- Handling
                const newjson = await newres.json()
                console.log(newjson.message)
            }
        };
        props.closeModal();
    };


// ---- Component Render ---- //

    // Render
    return(
        <div>
            <label
                for="banner-upload"
                className="custom-file-upload">
                Upload a Banner picture
            </label>
            <input
                id="banner-upload"
                className="hidden"
                type="file"
                accept="image/*"
                name="file"
                ref={imgFile} />
            <div
                className="landing-modal__upload--button"
                onClick={uploadBannerImg}>
                <span>Submit</span>
            </div>
        </div>
    );
};

export default BannerModal;
