import AuthLayout from "../dashboard/auth/components/AuthLayout";
import ForgotPasswordForm from "../dashboard/auth/components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
