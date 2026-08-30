"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import SectionHeader from "@/app/components/common/header/SectionHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { inputClass } from "./LoginForm";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 179;

interface VerifyOtpFormProps {
  destination?: string;
}

const VerifyOtpForm = ({
  destination = "example@email.com",
}: VerifyOtpFormProps) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const updateDigit = (index: number, value: string) => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = char;
      return next;
    });
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
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
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 6 digit code.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/reset-password");
    } catch {
      setError("That code didn't work. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" w-full h-full flex flex-col justify-center gap-6 ">
      <div className=" flex justify-center">
        <div className="relative h-30 w-62.5">
          <Image
            src="/logo.svg"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <SectionHeader
        title="Verify OTP"
        className="flex flex-col items-center text-center"
      />

      <form onSubmit={handleVerify} className=" space-y-4  pt-4">
        <p className="text-center text-base text-gray leading-7">
          We have sent you a 6 digit OTP code to your provided{" "}
          <span className="font-medium text-[#C0392B]">
            Email:{destination}
          </span>{" "}
          please input that code here to proceed.
        </p>

        <p className="text-center text-lg font-semibold text-[#C0392B]">
          {minutes}:{seconds}
        </p>

        <div className="flex justify-center gap-2 sm:gap-3">
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
              className="h-14 w-12 min-w-0 flex-1 max-w-14 rounded-[8px] border border-[#624D3B] bg-[#FFF8EE] text-center text-lg font-semibold text-[#1F1108] outline-none sm:w-14"
            />
          ))}
        </div>

        {error && (
          <p className={`${inputClass.error} text-center`} role="alert">
            {error}
          </p>
        )}

        {secondsLeft === 0 ? (
          <button
            type="button"
            onClick={() => setSecondsLeft(RESEND_SECONDS)}
            className="block mx-auto text-sm font-medium text-[#C0392B] hover:underline"
          >
            Resend code
          </button>
        ) : null}

        <div className="flex items-center gap-3 w-full">
          <CommonButton
            type="submit"
            size="xl"
            className="w-full!"
            isLoading={isSubmitting}
            loadingText="Verifying…"
          >
            Verify
          </CommonButton>
          <CommonButton
            size="xl"
            className="w-full!"
            variant="cancel"
            to="/forgot-password"
          >
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
