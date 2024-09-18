import React from "react";
import useModalStore from '../../state/modalStore'
import Modal from '../containers/Modal'


const LoginModal = () => {
    const onLoginModalClose = () => {
        useModalStore.getState().closeLoginModal()
        console.log("login modal closed")
    }


    return (
        <Modal title={"Sign In"} onClose={onLoginModalClose}>

            <div>
                Login Content
            </div>

        </Modal>
    );
}

export default LoginModal;