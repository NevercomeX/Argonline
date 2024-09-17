import { useParams } from "@remix-run/react";

export default function UserPage() {
  const { userId } = useParams(); // Obtén el valor de ":userId" desde la URL

  return <h1>User ID: {userId}</h1>;
}
