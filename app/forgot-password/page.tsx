import AuthLayout from "../dashboard/auth/components/AuthLayout";
import ForgotPasswordForm from "../dashboard/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
