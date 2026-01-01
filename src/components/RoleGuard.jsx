import { useAuth } from "../context/AuthContext";

export default function RoleGuard({ allow, children }) {
  const { role } = useAuth();

  if (!allow.includes(role)) return null;

  return children;
}
