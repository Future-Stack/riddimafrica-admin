"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import SectionHeader from "@/app/components/common/header/SectionHeader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { inputClass } from "./LoginForm";

const ForgotPasswordForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/verify-otp");
    } catch {
      setError("Invalid email/phone or password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
        title="Forgot Password!"
        description="Do you forgot your password. It’s ease to reset, just provide your email address. We’ll send you a OTP code."
        className="flex flex-col items-center text-center"
      />

      <form onSubmit={handleSubmit} className=" space-y-4  pt-4">
        <div className="">
          <label htmlFor="identifier" className={inputClass.label}>
            Email / Phone Number:
          </label>
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#637381]" />
            <input
              id="identifier"
              type="text"
              placeholder="Enter email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className={` pl-10 ${inputClass.input}`}
            />
          </div>
        </div>

        {error && (
          <p className={inputClass.error} role="alert">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 w-full">
          <CommonButton
            type="submit"
            size="xl"
            className="w-full!"
            isLoading={isSubmitting}
            loadingText="Sending…"
          >
            Send Otp
          </CommonButton>
          <CommonButton size="xl" className="w-full!" variant="cancel" to="/">
            Cancel
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
