export function Clientes({ user }) {
  return (
    <div>
      <h2>Clientes</h2>
      <button>Crear cliente</button>
      {user.rol === "administrador" && (
        <>
          <button>Modificar cliente</button>
          <button>Borrar cliente</button>
        </>
      )}
    </div>
  );
}