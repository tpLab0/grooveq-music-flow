
import { Header } from "@/components/Header";
import { RegisterForm } from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-12 flex items-center justify-center">
        <RegisterForm />
      </main>
    </div>
  );
};

export default RegisterPage;
