import React, { useState } from "react";
import GradientButton from "../components/ui/GradientButton";
import { supabase } from "../integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(error.message || "Login failed. Please try again.");
      } else {
        toast({ title: "Signed in!", description: "Welcome back to MediShare." });
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      setLoading(false);
      if (error) {
        setError(error.message || "Sign up failed. Please try again.");
      } else {
        toast({ title: "Account created!", description: "Check your email to confirm your account." });
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">{mode === "signin" ? "Welcome Back!" : "Create Your Account"}</h2>
        <p className="text-gray-500 mb-8 text-center">
          {mode === "signin"
            ? "Sign in to your MediShare account to donate or track your impact."
            : "Sign up to start donating or supporting NGOs with MediShare."}
        </p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-sans"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-sans"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <GradientButton type="submit" className="w-full mt-2 text-lg" disabled={loading}>
            {loading ? (mode === "signin" ? "Signing In..." : "Signing Up...") : mode === "signin" ? "Sign In" : "Sign Up"}
          </GradientButton>
        </form>
        <div className="mt-6 text-sm text-gray-500">
          {mode === "signin" ? (
            <>Don't have an account? <button className="text-gradientFrom font-bold hover:underline" onClick={() => setMode("signup")}>Sign Up</button></>
          ) : (
            <>Already have an account? <button className="text-gradientFrom font-bold hover:underline" onClick={() => setMode("signin")}>Sign In</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;