"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import SectionHeader from "@/app/components/common/header/SectionHeader";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdOutlineLockReset } from "react-icons/md";
import { inputClass } from "./LoginForm";

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/");
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
        title="Reset Password"
        description="You are all set. Now it’s time to create a new password."
        className="flex flex-col items-center text-center"
      />

      <form onSubmit={handleSubmit} className=" space-y-4  pt-4">
        <div className="">
          <label htmlFor="password" className={inputClass.label}>
            New Password
          </label>
          <div className="relative">
            <MdOutlineLockReset className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#637381]" />
            <input
              id="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={` pl-10 ${inputClass.input}`}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2513] hover:text-[#3A2314] cursor-pointer  "
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="">
          <label htmlFor="confirmPassword" className={inputClass.label}>
            Confirm Password
          </label>
          <div className="relative">
            <MdOutlineLockReset className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#637381]" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={` pl-10 ${inputClass.input}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2513] hover:text-[#3A2314] cursor-pointer  "
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p className={inputClass.error} role="alert">
            {error}
          </p>
        )}

        <CommonButton
          type="submit"
          size="xl"
          className="w-full! mt-4"
          isLoading={isSubmitting}
          loadingText="Reseting…"
        >
          Reset Password
        </CommonButton>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
