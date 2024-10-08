import React, { useState, useEffect } from "react";
import Modal from '../03.blocks/Modal'
import Input from "../02.core/Input";
import Button from "../02.core/Button";
import useModalStore from '../../state/modalStore'
import { useForm } from "react-hook-form";
import OAuthForm from "./OAuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../forms/signupSchema";
import { capitalizeFirstLetter } from "../utils/stringUtils";
import RoleSelector from "./RoleSelector";
import { useLocation } from 'react-router-dom';

const RegisterModal = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const roleFromStore = useModalStore(state => state.registerModalRole);

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

    // Set the role from query param if present
    useEffect(() => {
        if (roleFromStore) {
            setValue("role", roleFromStore);
        }
    }, [roleFromStore, setValue]);

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
        <div className="flex flex-col gap-md">
            <div className="w-full">
                <RoleSelector
                    onRoleSelect={(role) => setValue("role", role)}
                    initialRole={roleFromStore}
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">

                <Input
                    {...register("firstName")}
                    placeholder="First Name"
                    errors={errors.firstName} />

                <Input
                    {...register("lastName")}
                    placeholder="Last Name"
                    errors={errors.lastName} />

                <Input
                    {...register("email")}
                    placeholder="Email"
                    errors={errors.email} />

                <Input
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    errors={errors.password} />

                <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    type="password"
                    errors={errors.confirmPassword} />

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

    const verificationForm = (
        <div className="text-center">
            <h1 className="p-4"> You're almost there {firstName} !</h1>
            <p className="p-4"> We sent an email to <span className="font-bold"> {email} </span>, just click the link in that email to complete the signup.
                if you don't see it you may need to check your spam folder.
            </p>
            <p className="p-4"> Still can't find email? No problem.</p>
            <div className="p-4">
                <Button title={"Resend verification email"} onClick={handleResendVerificationEmail}></Button>
            </div>
        </div>
    )

    return (
        <Modal title="Welcome to Sandra!" onClose={onRegisterModalClose}>
            {!isSuccess && !isError && form}
            {isError && errorForm}
            {isSuccess && verificationForm}
        </Modal>
    );
}

export default RegisterModal;