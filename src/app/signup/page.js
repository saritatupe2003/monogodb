'use client'

import { useActionState } from "react"; // <-- updated import
import { SignUpAction } from "../actions/Signup";

const initialState = {
  error: "",
  success: ""
};

export default function Page() {
  const [state, formAction] = useActionState(SignUpAction, initialState); // <-- updated hook

  return (
    <form action={formAction} className="flex justify-center mt-20">
      <div className="w-[400px] p-6 border rounded">
        <h2 className="text-xl mb-4">Signup</h2>

        <input name="name" placeholder="Name" className="border w-full mb-2 p-2" />
        <input name="mobile" placeholder="Mobile" className="border w-full mb-2 p-2" />
        <input name="email" type="email" placeholder="Email" className="border w-full mb-2 p-2" />
        <input name="password" type="password" placeholder="Password" className="border w-full mb-2 p-2" />

        <button className="bg-red-600 text-white px-4 py-2 w-full">
          Submit
        </button>

        {state?.error && <p className="text-red-500 mt-2">{state.error}</p>}
        {state?.success && <p className="text-green-600 mt-2">{state.success}</p>}
      </div>
    </form>
  );
}
