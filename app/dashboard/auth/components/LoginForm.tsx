"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CustomCheckbox from "@/app/components/common/button/CustomCheckbox";
import SectionHeader from "@/app/components/common/header/SectionHeader";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLockReset } from "react-icons/md";

export const inputClass = {
  input:
    "w-full border border-br px-2 py-3.5 rounded-[10px] outline-none text-sm text-gray font-medium ",
  label: "text-black text-sm font-medium block mb-1 font-normal",
  error: "text-red-500 text-sm mt-1",
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/dashboard");
    } catch {
      setError("Invalid email/phone or password. Please try again.");
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
        title="Welcome Back !"
        description="Please login to view your Dashboard"
        className="flex flex-col items-center "
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

        <div className="">
          <label htmlFor="password" className={inputClass.label}>
            Password
          </label>

          <div className="relative">
            <MdOutlineLockReset className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#637381]" />
            <input
              id="password"
              type={showPassword ? "text" : "password "}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={` pl-10 ${inputClass.input}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2513] hover:text-[#3A2314] cursor-pointer  "
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className=" flex items-center justify-between">
          <CustomCheckbox />

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#BB483D] hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        <CommonButton type="submit" size="xl" className="w-full! mt-4">
          Login
        </CommonButton>
      </form>
    </div>
  );
};

export default LoginForm;
