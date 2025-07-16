import { useState } from "react";
import { resetPassword } from "../utils/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent form reload
    setLoading(true);
    setMessage("");
    try {
      await resetPassword(email);
      setMessage("Password reset email sent.");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Error sending reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh]">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
