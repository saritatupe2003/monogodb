import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies(); //  IMPORTANT
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div style={{ padding: "30px" }}>
      

      <div style={{ marginTop: "20px" }}>
        <h2>Skill Assessment</h2>
        <p>Start MCQ based skill test</p>

        <a href="/assessment">
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Start MCQ Test
          </button>
        </a>
      </div>
    </div>
  );
}
