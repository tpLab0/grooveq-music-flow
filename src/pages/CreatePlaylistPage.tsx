
import { Header } from "@/components/Header";
import { CreatePlaylistForm } from "@/components/CreatePlaylistForm";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePlaylistPage = () => {
  const { sessionUser } = useAuth();
  const navigate = useNavigate();
  
  // Protect route - redirect if not logged in
  useEffect(() => {
    if (!sessionUser.isLoggedIn) {
      navigate('/login');
    }
  }, [sessionUser.isLoggedIn, navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-6">
        <div className="max-w-3xl mx-auto">
          <CreatePlaylistForm />
        </div>
      </main>
    </div>
  );
};

export default CreatePlaylistPage;
