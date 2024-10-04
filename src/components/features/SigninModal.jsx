import React, { useState } from "react";
import Modal from '../03.blocks/Modal'
import Input from "../02.core/Input";
import Button from "../02.core/Button";
import useModalStore from '../../state/modalStore'
import { useForm } from "react-hook-form";
import OAuthForm from "./OAuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../forms/signinSchema";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import useUserStore from "../../state/userStore";


const SigninModal = () => {
    // Hooks
    const onSigninModalClose = () => {
        useModalStore.getState().closeLoginModal()
    }

    const { setUser } = useUserStore()

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



    const onSubmit = async ({ email, password }) => {
        console.log("onSubmit login")
        console.log("env:", process.env.REACT_APP_API_URL)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log(" signin request")

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage or a state management solution
                localStorage.setItem('token', data.token);
                setUser(data.user)
                console.log("success login")
                onSigninModalClose()
                return { success: true };

            } else {
                console.log("error login")

                const errorData = await response.json();
                return { success: false, message: errorData.message };
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: 'An error occurred during login' };
        }
    }

    const form = (
        <div className="flex flex-col gap-2">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

                <Input
                    {...register("email")}
                    placeholder="Email"
                    errors={errors.email} />

                <Input
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    errors={errors.password} />

                <div className="m-4">
                    <Button
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
                <Button title={"Retry"} onClick={handleRetry}></Button>
            </div>
        </div>

    )


    return (
        <Modal title="Welcome back!" onClose={onSigninModalClose}>
            {!isSuccess && !isError && form}
            {isError && errorForm}
        </Modal>
    );
}

export default SigninModal;