"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);

  /* ---------- VALIDATION ---------- */
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsPending(true);
    setErrors({});

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/dashboard"); // ✅ client-side redirect
      } else {
        const data = await res.json();
        setErrors({ form: data.error || "Login failed" });
      }
    } catch (err) {
      setErrors({ form: "Something went wrong" });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.signupform}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-[36px] ms-20 mb-10 pt-10 ">Log in</h1>

        <div className="w-[400px] p-6 border rounded ms-20 ">
          {errors.form && <p className="text-red-600 mb-2">{errors.form}</p>}

          <input
            type="email"
            placeholder="Email"
            className="border w-full mb-1 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="border w-full mb-1 p-2 mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            disabled={isPending}
            className="bg-red-600 text-white px-4 py-2 w-full mt-4 disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
