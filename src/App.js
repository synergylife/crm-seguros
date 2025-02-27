import { useState } from "react";
import { Card, Button, Table } from "@radix-ui/themes";

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
              <Table>
                <thead>
                  <tr>
                    <th>Día</th>
                    <th>Referidos</th>
                    <th>Contactados</th>
                    <th>Llamadas</th>
                    <th>Citas Obtenidas</th>
                    <th>Citas Planeadas</th>
                    <th>Nuevas</th>
                    <th>ANF Planeados</th>
                    <th>ANF Realizados</th>
                    <th>Citas Cierre Planeadas</th>
                    <th>Citas Cierre Realizadas</th>
                    <th>Solicitudes en Proceso</th>
                    <th>Solicitudes Emitidas</th>
                    <th>Total Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.day}</td>
                      {Object.keys(row).slice(1).map((field, i) => (
                        <td key={i}>
                          <input
                            type="number"
                            value={row[field]}
                            onChange={(e) => handleInputChange(index, field, e.target.value)}
                            className="border p-1 w-16"
                          />
                        </td>
                      ))}
                      <td>{Object.values(row).slice(1).reduce((a, b) => a + b, 0)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td><b>Total Semana</b></td>
                    {Object.keys(initialData[0]).slice(1).map((field, i) => (
                      <td key={i}><b>{calculateTotal(field)}</b></td>
                    ))}
                    <td><b>{Object.keys(initialData[0]).slice(1).reduce((sum, field) => sum + calculateTotal(field), 0)}</b></td>
                  </tr>
                </tfoot>
              </Table>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CRM;
