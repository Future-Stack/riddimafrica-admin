"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CustomCheckbox from "@/app/components/common/button/CustomCheckbox";
import SectionHeader from "@/app/components/common/header/SectionHeader";
import { useLoginMutation } from "@/store/features/auth/authApi";
import {
  clearRememberedIdentifier,
  getRememberedIdentifier,
  getRememberMe,
  persistRememberedIdentifier,
} from "@/store/features/auth/authStorage";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLockReset } from "react-icons/md";
import { z } from "zod";

export const inputClass = {
  input:
    "w-full border border-br px-2 py-3.5 rounded-[10px] outline-none text-sm text-gray font-medium ",
  label: "text-black text-sm font-medium block mb-1 font-normal",
  error: "text-red-500 text-sm mt-1",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine((v) => emailRegex.test(v) || phoneRegex.test(v), {
      message: "Enter a valid email or phone number",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  useEffect(() => {
    const rememberedIdentifier = getRememberedIdentifier();
    const shouldRemember = getRememberMe() || Boolean(rememberedIdentifier);

    if (shouldRemember) setRememberMe(true);
    if (rememberedIdentifier) {
      reset({ identifier: rememberedIdentifier, password: "" });
    }
  }, [reset]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login({
        email: values.identifier,
        password: values.password,
      });
      if (response?.data?.data) {
        dispatch(
          setCredentials({
            ...response.data.data,
            rememberMe,
          }),
        );

        if (rememberMe) {
          persistRememberedIdentifier(values.identifier);
        } else {
          clearRememberedIdentifier();
        }

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" space-y-4  pt-4"
      >
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
              {...register("identifier")}
              className={` pl-10 ${inputClass.input}`}
            />
          </div>
          {errors.identifier && (
            <p className={inputClass.error}>{errors.identifier.message}</p>
          )}
        </div>

        <div className="">
          <label htmlFor="password" className={inputClass.label}>
            Password
          </label>

          <div className="relative">
            <MdOutlineLockReset className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#637381]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
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
          {errors.password && (
            <p className={inputClass.error}>{errors.password.message}</p>
          )}
        </div>

        <div className=" flex items-center justify-between">
          <CustomCheckbox
            checked={rememberMe}
            onCheckedChange={setRememberMe}
            label="Remember me"
          />

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#BB483D] hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        <CommonButton
          loadingText={"Logging in..."}
          isLoading={isLoading}
          type="submit"
          size="xl"
          className="w-full! mt-4"
        >
          Login
        </CommonButton>
      </form>
    </div>
  );
};

export default LoginForm;
