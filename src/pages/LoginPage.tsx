
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-12 flex items-center justify-center">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
