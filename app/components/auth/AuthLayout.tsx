import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  eyebrow?: string;
  headline?: string;
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  eyebrow = "My Dashboard",
  headline = "Admin Login",
  children,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F2EF] ">
      <div className="flex min-h-screen w-full overflow-hidden rounded-none bg-white  shadow-sm">
        {/* Left: brand / pattern panel — background lives right here */}
        <div className="relative hidden w-[52%] overflow-hidden md:block ">
          {/* Image gets the smooth clip-path, isolated from the text below */}
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "path('M 0,0 L 780,0 C 900,140 980,320 960,500 C 940,700 760,880 500,1000 L 0,1000 Z')",
            }}
          >
            <Image
              src="/loginImg.svg"
              alt="Login Background"
              fill
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex h-full items-center  flex-col  px-12 pt-54 ">
            <p className="text-xl md:text-2xl font-fraunce font-bold text-white leading-8 mb-2.5">
              {eyebrow}
            </p>
            <h1 className=" text-3xl md:text-4xl font-bold font-fraunce text-white leading-10 ">
              {headline}
            </h1>
          </div>
        </div>

        <div className="flex w-full max-w-[527px] mx-auto flex-col  px-8 py-14 sm:px-16 md:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
