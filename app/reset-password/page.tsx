import AuthLayout from "../dashboard/auth/components/AuthLayout";
import ResetPasswordForm from "../dashboard/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Reset Password">
      <ResetPasswordForm />
    </AuthLayout>
  );
}
