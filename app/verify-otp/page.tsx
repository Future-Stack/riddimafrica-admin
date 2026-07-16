"use client";

import Image from "next/image";
import {
    ClipboardEvent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 179; // 2:59

interface VerifyOtpFormProps {
    /** Email/phone shown in the instruction line */
    destination?: string;
    onCancel?: () => void;
}

export default function VerifyOtpForm({
    destination = "example@email.com",
    onCancel,
}: VerifyOtpFormProps) {
    const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter()

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [secondsLeft]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = String(secondsLeft % 60).padStart(2, "0");

    function updateDigit(index: number, value: string) {
        const char = value.replace(/[^0-9]/g, "").slice(-1);
        setDigits((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });
        if (char && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
        const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        if (!pasted) return;
        e.preventDefault();
        const next = Array(OTP_LENGTH).fill("");
        pasted
            .slice(0, OTP_LENGTH)
            .split("")
            .forEach((ch, i) => (next[i] = ch));
        setDigits(next);
        const lastIndex = Math.min(pasted.length, OTP_LENGTH) - 1;
        inputRefs.current[Math.max(lastIndex, 0)]?.focus();
    }

    async function handleVerify() {
        const code = digits.join("");
        if (code.length < OTP_LENGTH) {
            setError("Please enter the full 6 digit code.");
            return;
        }
        setError(null);
        setIsSubmitting(true);
        try {
            // TODO: replace with your real verification call, e.g.
            // await verifyOtp({ destination, code });
            await new Promise((resolve) => setTimeout(resolve, 600));
            
           router.push('/reset-password')
        } catch {
            setError("That code didn't work. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout>
        <div className="mx-auto w-full max-w-md text-center mt-9">
            {/* Logo */}
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
                Verify OTP</h2>

            <div className="mt-6 rounded-lg b text-center text-base md:text-lg text-gray-700 leading-7">
                We have sent you a 6 digit OTP code to your provided{" "}
                <span className="font-medium text-[#C0392B]">
                    Email:{destination}
                </span>{" "}
                please input that code here to proceed.
            </div>

            <p className="mt-5 text-lg font-semibold text-[#C0392B]">
                {minutes}:{seconds}
            </p>

            <div className="mt-4 flex justify-center gap-2 sm:gap-3">
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => updateDigit(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        aria-label={`OTP digit ${index + 1}`}
                        placeholder="-"
                        className="h-14 w-12 rounded-[8px] border border-[#624D3B] bg-[#FFF8EE] text-center text-lg font-semibold text-[#1F1108] focus:border-[#E8A33D] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/30 sm:w-14"
                    />
                ))}
            </div>

            {error && (
                <p className="mt-4 text-sm text-[#C0392B]" role="alert">
                    {error}
                </p>
            )}

            {secondsLeft === 0 ? (
                <button
                    type="button"
                    onClick={() => setSecondsLeft(RESEND_SECONDS)}
                    className="mt-4 text-sm font-medium text-[#C0392B] hover:underline"
                >
                    Resend code
                </button>
            ) : null}

                <div className="mt-8 flex justify-center mt-7 md:mt-[66px] gap-4">
                <button
                    type="button"
                    onClick={handleVerify}
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-b from-[#E6A400] to-[#E6B652] py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:opacity-60 cursor-pointer"
                >
                    {isSubmitting ? "Verifying…" : "Verify"}
                </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-gray-200 border border-[#897766] py-3 text-sm font-semibold text-gray-500 shadow-sm transition hover:brightness-95 disabled:opacity-60 cursor-pointer"
                    >
                        cancel
                    </button>
            </div>
        </div>
        </AuthLayout>
    );
}