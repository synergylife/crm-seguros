import { useState } from "react";
import { Card, Button, Table } from "@radix-ui/themes";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const usersDB = [
  { id: 1, name: "Admin", role: "admin", email: "admin@example.com", password: "admin123" },
  { id: 2, name: "Asesor 1", role: "asesor", email: "asesor1@example.com", password: "asesor123", points: 0 }
];

const activities = [
  { name: "Nuevo prospecto frío", points: 1 },
  { name: "Nuevo prospecto referido", points: 3 },
  { name: "Reunión con centro de influencia", points: 2 },
  { name: "Contacto con la cara", points: 1 },
  { name: "Prospectos contactados", points: 1 },
  { name: "Programar cita nueva", points: 1 },
  { name: "Análisis de necesidades terminado", points: 2 },
  { name: "Entrevista de cierre completa", points: 2 },
  { name: "Ingresar venta nueva", points: 2 }
];

const CRM = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [advisorPoints, setAdvisorPoints] = useState(usersDB.reduce((acc, u) => ({ ...acc, [u.id]: u.points || 0 }), {}));

  const handleLogin = () => {
    const foundUser = usersDB.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const addPoints = (userId, points) => {
    setAdvisorPoints(prev => {
      const newPoints = prev[userId] + points;
      return { ...prev, [userId]: newPoints };
    });
  };

  return (
    <div className="p-6">
      {!user ? (
        <div>
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 ml-2" />
          <Button onClick={handleLogin}>Iniciar Sesión</Button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Dashboard CRM</h1>
          <p className="mt-2">Bienvenido, {user.name} ({user.role})</p>
          {user.role === "asesor" && (
            <Card className="mt-4 p-4">
              <h2 className="text-xl font-semibold">Metodología Tier 25</h2>
              <p>Puntos acumulados: {advisorPoints[user.id]}/25</p>
              {advisorPoints[user.id] >= 25 && <p className="text-green-600 font-bold mt-2">Felicidades, estás un paso más cerca de lograr tus objetivos</p>}
              {advisorPoints[user.id] >= 12 && advisorPoints[user.id] < 25 && <p className="text-blue-600 font-bold mt-2">La persistencia marca la diferencia</p>}
              {advisorPoints[user.id] >= 0 && advisorPoints[user.id] < 12 && <p className="text-red-600 font-bold mt-2">Mantén el enfoque en todo momento</p>}
              {activities.map((activity, index) => (
                <Button key={index} onClick={() => addPoints(user.id, activity.points)} className="m-2">
                  {activity.name} (+{activity.points} puntos)
                </Button>
              ))}
            </Card>
          )}
          {user.role === "admin" && (
            <Card className="mt-4 p-4">
              <h2 className="text-xl font-semibold">Listado de Asesores</h2>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {usersDB.filter(u => u.role === "asesor").map((advisor, index) => (
                    <tr key={index}>
                      <td>{advisor.id}</td>
                      <td>{advisor.name}</td>
                      <td>{advisorPoints[advisor.id]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CRM;
