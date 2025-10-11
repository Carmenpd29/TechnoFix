import { Fondo, Card, LogoFijo, Titulo, Texto, OptionHome } from "../../styles/HomeTemplateStyles";

export function HomeTemplate() {
  return (
    <Fondo>
      <Card>
        <LogoFijo>
          <img
            src="/TechnoFix/assets/Logo.png"
            alt="TechnoFix logo"
            style={{
              width: 200,
              height: "auto",
            }}
          />
        </LogoFijo>
        <Titulo>¡Bienvenid@ a TechnoFix!</Titulo>
        <Texto>
          Selecciona una opción para comenzar.
          <br />
          <br />
          <OptionHome>
            <p>
              - Gestiona tu usuario en tu nombre.
            </p>
            <p>
              <span>- Clientes</span> para gestión de clientes.
            </p>
            <p>
              <span>- Reparaciones</span> para gestión de reparaciones.
            </p>
          </OptionHome>
        </Texto>
      </Card>
    </Fondo>
  );
}
