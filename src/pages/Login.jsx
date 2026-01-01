import { useState } from "react";
import { emailSignIn, googleLogin } from "../services/authService";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailSignIn(email, password);
    } catch (err) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b10] text-white">
      <div className="bg-[#12121a] p-8 rounded-xl border border-purple-500/30 w-[360px]">

        <h1 className="text-xl text-purple-400 font-semibold mb-2">
          Multi-Business CRM
        </h1>

        <p className="text-gray-400 mb-4">Sign in to continue</p>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full p-3 bg-[#0b0b10] rounded"
            placeholder="Email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 bg-[#0b0b10] rounded"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500 text-sm">OR</div>

        <button
          onClick={googleLogin}
          className="w-full bg-purple-700 hover:bg-purple-800 py-3 rounded"
        >
          Continue with Google
        </button>

        <p className="text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-400">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
