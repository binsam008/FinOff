import { useState } from "react";
import { emailSignUp } from "../services/authService";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailSignUp(email, password);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b10] text-white">
      <div className="bg-[#12121a] p-8 rounded-xl border border-purple-500/30 w-[360px]">
        <h1 className="text-xl text-purple-400 font-semibold mb-4">
          Create Account
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-4">
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
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
