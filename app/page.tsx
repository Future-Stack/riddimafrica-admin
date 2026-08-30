import AuthLayout from "./dashboard/auth/components/AuthLayout";
import LoginForm from "./dashboard/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Admin Login">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
