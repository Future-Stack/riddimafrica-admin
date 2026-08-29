import AuthLayout from "../dashboard/auth/components/AuthLayout";
import VerifyOtpForm from "../dashboard/auth/components/VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Verify OTP">
      <VerifyOtpForm />
    </AuthLayout>
  );
}
