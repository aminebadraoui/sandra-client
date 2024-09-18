import React from "react";
import Modal from '../containers/Modal'
import StyledInput from "../reusable/StyledInput";
import StyledButton from "../reusable/StyledButton";
import useModalStore from '../../state/modalStore'
import { useForm, Controller } from "react-hook-form";
import OAuthForm from "./OAuthForm";


const RegisterModal = () => {
    const onRegisterModalClose = () => {
        useModalStore.getState().closeRegisterModal()
        console.log("register modal closed")
    }

    const { handleSubmit, register, formState } = useForm()

    console.log(useForm())

    const onSubmit = (data) => {
        console.log(data)
    }



    const form = (
        <div className="flex flex-col gap-2">
            <div>
                <h1 className="font-bold"> Welcome To Sandra </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <StyledInput {...register("firstName")} placeholder="First Name" />
                <StyledInput {...register("lastName")} placeholder="Last Name" />
                <StyledInput {...register("email")} placeholder="Email" />
                <StyledInput {...register("password")} placeholder="Password" type="password" />
                <StyledInput {...register("confirmPassword")} placeholder="Confirm Password" type="password" />

                <div className="m-4">
                    <StyledButton title={"Continue"} />
                </div>

                <OAuthForm />
            </form>

        </div>
    )


    return (
        <Modal title={"Sign up"} onClose={onRegisterModalClose}>
            <div className="p-4">
                {form}
            </div>
        </Modal>
    );
}

export default RegisterModal;