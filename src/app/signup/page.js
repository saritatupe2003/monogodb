"use client";

import { useActionState,useState,useEffect,useTransition,} from "react";
import { SignUpAction } from "../actions/Signup";
import styles from "./sign.module.css";
import Link from "next/link";

export default function Page() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  /* ---------- SERVER ACTION ---------- */
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(SignUpAction, initialState);
  const [isPending, startTransition] = useTransition();

  /* ---------- RESET FORM ON SUCCESS ---------- */
  useEffect(() => {
    if (state.success) {
      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  }, [state.success]);

  /* ---------- VALIDATION ---------- */
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (!/^[A-Za-z\s]{2,50}$/.test(name.trim()))
      newErrors.name = "Enter valid name";

    if (mobile && !/^[0-9]{10}$/.test(mobile))
      newErrors.mobile = "Mobile must be 10 digits";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password required";
    else if (password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("password", password);

    startTransition(() => {
      formAction(formData); // ✅ CORRECT
    });
  };

  return (
    <div className={styles.signupform}>
      <h2 className="text-[38px] ms-20 pt-10">Signup</h2>

      <form onSubmit={handleSubmit} className={`pt-10 ms-20 ${styles.forms}`}>
        <div className="w-[400px] p-6 border rounded">
          <input
            placeholder="Name"
            className="border w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <input
            placeholder="Mobile"
            className="border w-full p-2 mt-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}

          <input
            placeholder="Email"
            className="border w-full p-2 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}

          <button
            disabled={isPending}
            className="bg-red-600 text-white w-full py-2 mt-4 disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>

          {state.message && (
            <p
              className={`mt-3 ${
                state.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>

      <p className="mt-5 ms-20">
        Already have an account? <Link href="/login">Sign In</Link>
      </p>
    </div>
  );
}
