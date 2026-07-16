import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
    /** Small label above the bold left-panel headline, e.g. "My Dashboard" */
    eyebrow?: string;
    /** Bold left-panel headline, e.g. "Admin Login" */
    headline?: string;
    /** The form (or any content) rendered in the right panel */
    children: ReactNode;
}

export default function AuthLayout({
    eyebrow = "My Dashboard",
    headline = "Admin Login",
    children,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F3F2EF] ">
            <div className="flex min-h-screen w-full overflow-hidden rounded-none bg-white  shadow-sm">
                {/* Left: brand / pattern panel — background lives right here */}
                <div className="relative hidden w-[52%] overflow-hidden md:block ">
                    <Image
                        src="/loginImg.svg"
                        alt="Login Background"
                        fill
                        className=" w-full h-full object-cover "
                        priority
                    />

                    <div className="relative z-10 flex h-full items-center  flex-col  px-12 pt-54 ">
                        <p className="text-xl md:text-2xl font-fraunce font-bold text-white leading-8 mb-2.5">{eyebrow}</p>
                        <h1 className=" text-3xl md:text-4xl font-bold font-fraunce text-white leading-10 ">{headline}</h1>
                    </div>
                </div>

                <div className="flex w-full max-w-[527px] mx-auto flex-col  px-8 py-14 sm:px-16 md:w-1/2">
                    {children}
                </div>
            </div>
        </div>
    );
}