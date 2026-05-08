import type React from "react";
import { useAuth } from "../../context/auth/authContext";

export default function DashboardWelcome(): React.ReactElement {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(" ")[0] ?? "there";

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        {greeting}, {firstName} 👋
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Here's what's happening with your crops today.
      </p>
    </div>
  );
}
