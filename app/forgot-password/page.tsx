"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            // TODO: replace with your real auth call, e.g.
            // await signIn({ identifier, password, rememberMe });
            await new Promise((resolve) => setTimeout(resolve, 600));
           

            // OTP send success হলে
            router.push("/verify-otp");
        } catch {
            setError("Invalid email/phone or password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout>
        <div className=" w-full mt-9">
            {/* Logo */}
            <div className="mb-8 flex justify-center  mb-20">
                <div className="relative h-20 w-60">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            <h2 className="text-center text-3xl md:text-4xl font-bold font-fraunces text-[#000000] leading-10 md:leading-14">
                    Forgot Password!
            </h2>
            <p className="mt-1 text-center text-base text-gray-700 leading-7">
                    Do you forgot your password. It’s ease to reset, just provide your email address. We’ll send you a OTP code.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
                {/* Email / Phone */}
                <div className="mb-4">
                    <label
                        htmlFor="identifier"
                        className="mb-1.5 block text-sm font-medium font-inter text-black leading-6"
                    >
                        Email / Phone Number:
                    </label>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="#637381" strokeWidth="1.2" strokeLinejoin="round" />
                            <path d="M2.01577 13.4756C2.08114 16.5411 2.11383 18.0739 3.24496 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2093C21.8862 18.0739 21.9189 16.5411 21.9842 13.4756C22.0053 12.4899 22.0053 11.51 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.7551 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08114 7.45882 2.01576 10.5243C1.99474 11.51 1.99475 12.4899 2.01577 13.4756Z" stroke="#637381" strokeWidth="1.2" strokeLinejoin="round" />
                        </svg>
                        <input
                            id="identifier"
                            type="text"
                            placeholder="Enter email or phone"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            className="w-full rounded-[10px] border border-[#391F10] bg-white py-2.5 pl-10 pr-3 text-sm text-[#3A2314] placeholder:text-gray-600 focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/30"
                        />
                    </div>
                </div>

             

                {error && (
                    <p className="mb-4 text-sm text-[#C0392B]" role="alert">
                        {error}
                    </p>
                )}
               
               <div className="flex items-center gap-3 mt-7 md:mt-[66px]">
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-b from-[#E6A400] to-[#E6B652] py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60 cursor-pointer"
                >
                    {isSubmitting ? "Sending..." : "Send Otp"}
                </button>
                        
                <button
                    type="submit"
                    disabled={isSubmitting}
                            className="w-full rounded-xl bg-gray-200 border border-[#897766] py-3 text-sm font-semibold text-gray-500 shadow-sm transition hover:brightness-95 disabled:opacity-60 cursor-pointer"
                >
                    cancel
                </button>
                </div>
            </form>
        </div>
        </AuthLayout>
    );
}