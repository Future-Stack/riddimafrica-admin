import AuthLayout from "../dashboard/auth/components/AuthLayout";
import VerifyOtpForm from "../dashboard/auth/components/VerifyOtpForm";

const VerifyOtpPage = () => {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Verify OTP">
      <VerifyOtpForm />
    </AuthLayout>
  );
};

export default VerifyOtpPage;
