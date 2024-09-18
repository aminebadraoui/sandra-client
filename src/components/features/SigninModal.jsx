import React, { useState } from "react";
import Modal from '../containers/Modal'
import StyledInput from "../reusable/StyledInput";
import StyledButton from "../reusable/StyledButton";
import useModalStore from '../../state/modalStore'
import { useForm } from "react-hook-form";
import OAuthForm from "./OAuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../forms/signinSchema";
import { capitalizeFirstLetter } from "../utils/stringUtils";


const SigninModal = () => {
    // Hooks
    const onRegisterModalClose = () => {
        useModalStore.getState().closeLoginModal()
    }

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signinSchema),
        mode: "onChange"
    })

    // State

    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)




    // Handlers 

    const handleRetry = () => {
        console.log("handle retry called")
        setIsSuccess(false)
        setIsError(false)
    }



    const onSubmit = (data) => {

        setIsSuccess(true);

        // Submit data

        // on error

        // show error on form 

        // on success

        // show verification
    }

    const form = (
        <div className="flex flex-col gap-2">
            <div>
                <h1 className="font-bold"> Welcome To Sandra </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

                <StyledInput
                    {...register("email")}
                    placeholder="Email"
                    errors={errors.email} />

                <StyledInput
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    errors={errors.password} />

                <div className="m-4">
                    <StyledButton
                        title={"Continue"}
                        disabled={isSubmitting}
                        onClick={handleSubmit(onSubmit)} />
                </div>

                <OAuthForm />
            </form>

        </div>
    )

    const errorForm = (
        <div className="text-center">
            <h1 className="p-4"> Oops, an error occured </h1>
            <p className="p-4">  Sorry, we couldn't process the request at the moment. You can retry filling up the form again. </p>
            <div className="p-4">
                <StyledButton title={"Retry"} onClick={handleRetry}></StyledButton>
            </div>
        </div>

    )


    return (
        <Modal title={"Sign up"} onClose={onRegisterModalClose}>
            <div className="p-4">
                {!isSuccess && !isError && form}

                {isError && errorForm}
            </div>
        </Modal>
    );
}

export default SigninModal;