"use server";

import { cookies } from "next/headers";

export async function logout() {
  cookies().delete("token");
}
<form action={logout}>
  <button>Logout</button>
</form>
