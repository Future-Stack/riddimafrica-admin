"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            router.push("/dashboard")
        } catch {
            setError("Invalid email/phone or password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className=" w-full mt-9">
            
            <div className="mb-8 flex justify-center mb-20">
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
                Welcome Back !
            </h2>
            <p className="mt-1 text-center text-base md:text-lg text-gray-700 leading-7">
                Please login to view your Dashboard
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
               
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

                <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-black leading-6">
                            Password
                        </label>

                    </div>
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.5433 10.5L22 11C21.497 5.94668 17.2229 2 12.0247 2C6.48824 2 2 6.47715 2 12C2 17.5228 6.48824 22 12.0247 22C16.1355 22 19.6684 19.5318 21.2153 16" stroke="#637381" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.3371 10.88C9.25714 10.88 8.71714 11.66 8.59714 12.14C8.47714 12.62 8.47714 14.36 8.54914 15.08C8.78914 15.98 9.38914 16.352 9.97714 16.472C10.5171 16.52 12.7971 16.502 13.4571 16.502C14.4171 16.52 15.1371 16.16 15.4371 15.08C15.4971 14.72 15.5571 12.74 15.4071 12.14C15.0891 11.18 14.2971 10.88 13.6971 10.88H10.3371Z" stroke="#637381" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M10.25 10.4585C10.25 10.3985 10.2582 10.0531 10.2596 9.61854C10.2609 9.22145 10.226 8.83854 10.4156 8.48814C11.126 7.07454 13.166 7.21854 13.67 8.65854C13.7573 8.89562 13.7626 9.27146 13.76 9.61854C13.7567 10.062 13.766 10.4585 13.766 10.4585" stroke="#637381" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-[10px] border border-[#391F10] bg-white py-2.5 pl-10 pr-3 text-sm text-[#3A2314] placeholder:text-gray-600 focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/30"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8178] hover:text-[#3A2314] cursor-pointer "
                        >
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#3A2314]">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded-[4px] border-brown-400 text-[#E8A33D] focus:ring-[#E8A33D]/40 cursor-pointer"
                        />
                        Remember me
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-[#BB483D] hover:underline cursor-pointer">
                        Forgot Password?
                    </Link>
                </div>

                {error && (
                    <p className="mb-4 text-sm text-[#C0392B]" role="alert">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-b from-[#E6A400] to-[#E6B652] py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60 mt-7 md:mt-[66px] cursor-pointer"
                >
                    {isSubmitting ? "Logging in…" : "Login"}
                </button>
            </form>
        </div>
    );
}