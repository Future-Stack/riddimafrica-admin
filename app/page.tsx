import AuthLayout from "./dashboard/auth/components/AuthLayout";
import LoginForm from "./dashboard/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Admin Login">
      <LoginForm />
    </AuthLayout>
  );
}
