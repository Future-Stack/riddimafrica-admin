import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";



export default function LoginPage() {
  return (
    <AuthLayout eyebrow="My Dashboard" headline="Admin Login">
      <LoginForm />
    </AuthLayout>
  );
}