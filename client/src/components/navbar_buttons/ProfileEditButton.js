import React from 'react';
import { useHistory } from 'react-router-dom';

const ProfileEditButton = () => {
    const history = useHistory();

    function handleClick() {
        history.push("/profile/edit")
        history.go(0)
    }

    return (
        <div
            className="main-header__button"
            id="main-header__button--profile"
            onClick={handleClick}>
            <span>Your profile</span>
        </div>
    );
}
export default ProfileEditButton;