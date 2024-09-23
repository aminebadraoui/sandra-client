import React, { useState } from "react";
import Modal from '../containers/Modal'
import StyledInput from "../reusable/StyledInput";
import StyledButton from "../reusable/StyledButton";
import useModalStore from '../../state/modalStore'
import { useForm } from "react-hook-form";
import OAuthForm from "./OAuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../forms/signupSchema";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import RoleSelector from "./RoleSelector";

const RegisterModal = () => {
    // Hooks
    const onRegisterModalClose = () => {
        console.log("onRegisterModalClose")
        useModalStore.getState().closeRegisterModal()
    }

    const { handleSubmit, register, formState: { errors, isSubmitting }, setValue } = useForm({
        resolver: zodResolver(signUpSchema),
        mode: "onChange"
    })

    // State

    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")

    console.log(useForm())

    // Handlers 

    const handleRetry = () => {
        console.log("handle retry called")
        setIsSuccess(false)
        setIsError(false)
    }

    const handleResendVerificationEmail = () => {
        console.log("handleResendVerificationEmail called")
    }

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            firstName: capitalizeFirstLetter(data.firstName),
            lastName: capitalizeFirstLetter(data.lastName),
        };

        console.log(transformedData);
        setFirstName(transformedData.firstName);
        setEmail(transformedData.email);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformedData),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                const errorData = await response.json();
                console.error('Signup failed:', errorData.message);
                setIsError(true);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setIsError(true);
        }
    }

    const form = (
        <div className="flex flex-col gap-2">
            <div>
                <h1 className="font-bold"> Welcome To Sandra </h1>
            </div>

            <div className="w-full flex items-center justify-center m-2">
                <RoleSelector onRoleSelect={(role) => setValue("role", role)} />
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

                <StyledInput
                    {...register("firstName")}
                    placeholder="First Name"
                    errors={errors.firstName} />

                <StyledInput
                    {...register("lastName")}
                    placeholder="Last Name"
                    errors={errors.lastName} />

                <StyledInput
                    {...register("email")}
                    placeholder="Email"
                    errors={errors.email} />

                <StyledInput
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    errors={errors.password} />

                <StyledInput
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    type="password"
                    errors={errors.confirmPassword} />



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

    const verificationForm = (
        <div className="text-center">
            <h1 className="p-4"> You're almost there {firstName} !</h1>
            <p className="p-4"> We sent an email to <span className="font-bold"> {email} </span>, just click the link in that email to complete the signup.
                if you don't see it you may need to check your spam folder.
            </p>
            <p className="p-4"> Still can't find email? No problem.</p>
            <div className="p-4">
                <StyledButton title={"Resend verification email"} onClick={handleResendVerificationEmail}></StyledButton>
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4">Sign up</h2>
                <button onClick={onRegisterModalClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {!isSuccess && !isError && form}
                {isError && errorForm}
                {isSuccess && verificationForm}
            </div>
        </div>
    );
}

export default RegisterModal;