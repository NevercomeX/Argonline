import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después de registrarse

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleRegister = async (e: any) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:4001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Asegúrate de que se imprime el mensaje correcto
      if (data.user && data.user.id) {
        const userId = data.user.id; // Verifica que 'id' esté disponible
        localStorage.setItem("token", data.token); // Si hay un token
        navigate(`/users/${userId}/characters`); // Redirige al listado de personajes
      } else {
        throw new Error("User ID is undefined");
      }
    } else {
      alert("Error en el registro");
    }
  } catch (err) {
    console.error(err);
    alert("Error al registrar");
  }
};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                <input
          className="border p-2 mb-4 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
