import { useState } from "react";
import { Card, Button } from "@radix-ui/themes";

const usersDB = [
  { id: 1, name: "Admin", role: "admin", email: "admin@example.com", password: "admin123" },
  { id: 2, name: "Asesor 1", role: "asesor", email: "asesor1@example.com", password: "asesor123", points: 0 }
];

const initialData = [
  { day: "Lunes", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 },
  { day: "Martes", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 },
  { day: "Miércoles", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 },
  { day: "Jueves", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 },
  { day: "Viernes", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 },
  { day: "Sábado", referidos: 0, contactados: 0, llamadas: 0, citasObtenidas: 0, citasPlaneadas: 0, nuevas: 0, planeados: 0, realizados: 0, citasCierrePlaneadas: 0, citasCierreRealizadas: 0, solicitudesProceso: 0, solicitudesEmitidas: 0 }
];

const CRM = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(initialData);

  const handleLogin = () => {
    const foundUser = usersDB.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = Number(value);
    setData(newData);
  };

  const calculateTotal = (field) => {
    return data.reduce((sum, row) => sum + row[field], 0);
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
              <h2 className="text-xl font-semibold">Registro de Actividades</h2>
              <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Día</th>
                    <th className="border p-2">Referidos</th>
                    <th className="border p-2">Contactados</th>
                    <th className="border p-2">Llamadas</th>
                    <th className="border p-2">Citas Obtenidas</th>
                    <th className="border p-2">Citas Planeadas</th>
                    <th className="border p-2">Nuevas</th>
                    <th className="border p-2">ANF Planeados</th>
                    <th className="border p-2">ANF Realizados</th>
                    <th className="border p-2">Citas Cierre Planeadas</th>
                    <th className="border p-2">Citas Cierre Realizadas</th>
                    <th className="border p-2">Solicitudes en Proceso</th>
                    <th className="border p-2">Solicitudes Emitidas</th>
                    <th className="border p-2">Total Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td className="border p-2">{row.day}</td>
                      {Object.keys(row).slice(1).map((field, i) => (
                        <td key={i} className="border p-2">
                          <input
                            type="number"
                            value={row[field]}
                            onChange={(e) => handleInputChange(index, field, e.target.value)}
                            className="border p-1 w-16"
                          />
                        </td>
                      ))}
                      <td className="border p-2 font-bold">{Object.values(row).slice(1).reduce((a, b) => a + b, 0)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td className="border p-2 font-bold">Total Semana</td>
                    {Object.keys(initialData[0]).slice(1).map((field, i) => (
                      <td key={i} className="border p-2 font-bold">{calculateTotal(field)}</td>
                    ))}
                    <td className="border p-2 font-bold">{Object.keys(initialData[0]).slice(1).reduce((sum, field) => sum + calculateTotal(field), 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CRM;
