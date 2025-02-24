import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userApiAction } from "@/stores/apiSlice/userApiSlice";
import SignupForm from "@/components/common/forms/SignupForm";
import { useDispatch } from "react-redux";
import { setAuthorization } from "@/stores/slices/authSlice";

// Zod Validation Schema
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const Signup = () => {
    const dispatch = useDispatch();

    const [signupSubmitHandler, { isLoading }] = userApiAction.signup();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: { username: "", email: "", password: "" },
    });

    const onSubmit = async (data) => {
        try {
            const response = await signupSubmitHandler(data).unwrap();
            const { accessToken, refreshToken, user } = response.data;
            dispatch(
                setAuthorization({
                    isAuthorized: true,
                    userId: user.userId,
                    role: user.role,
                    profile: user.profile,
                    username: user.username,
                    accessToken,
                    refreshToken,
                })
            );
            form.reset();
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-[500px] shadow-lg p-5">
                <CardHeader>
                    <CardTitle className="text-center text-lg">Create Your Account</CardTitle>
                    <p className="text-center text-sm text-gray-600">
                        Sign up to start managing your tasks efficiently!
                    </p>
                </CardHeader>
                <CardContent>
                    <SignupForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
