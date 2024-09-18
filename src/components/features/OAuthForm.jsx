import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuthForm = () => {
    const handleGoogleSignUp = () => {
        console.log("google sign up")
    }

    return (
        <div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    <FcGoogle className="h-5 w-5 mr-2" />
                    Sign up with Google
                </button>
            </div>


        </div>
    );
}

export default OAuthForm;