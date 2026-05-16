import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

const darkModeCss = `
  :root {
    color-scheme: dark only;
    supported-color-schemes: dark only;
  }
  /* Force dark colors in Gmail / Apple Mail / Outlook dark mode */
  [data-ogsc] body,
  [data-ogsb] body { background-color: #0a0a0a !important; }
  u + .body .gmail-fix { display: none; }
  @media (prefers-color-scheme: light) {
    body, .body, .container, .card { background-color: #0a0a0a !important; }
    .text-white { color: #ffffff !important; }
    .text-muted { color: #888888 !important; }
    .text-faint { color: #444444 !important; }
    .text-accent, .accent-link { color: #2CFF68 !important; }
    .hr { border-color: #222222 !important; }
  }
  @media (prefers-color-scheme: dark) {
    body, .body, .container, .card { background-color: #0a0a0a !important; }
    .text-white { color: #ffffff !important; }
    .text-muted { color: #888888 !important; }
    .text-faint { color: #444444 !important; }
    .text-accent, .accent-link { color: #2CFF68 !important; }
    .hr { border-color: #222222 !important; }
  }
`;

interface ProjectConfirmationEmailProps {
  name: string;
  projectType: string;
}

export default function ProjectConfirmationEmail({
  name,
  projectType,
}: ProjectConfirmationEmailProps) {
  return (
    <Html lang="es">
      <Head>
        <meta name="color-scheme" content="dark only" />
        <meta name="supported-color-schemes" content="dark only" />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: darkModeCss }} />
      </Head>
      <Preview>¡Recibí tu idea, {name}! Te contactaré pronto 🚀</Preview>
      <Body
        className="body"
        style={{ backgroundColor: "#0a0a0a", fontFamily: "sans-serif", margin: 0 }}
      >
        <Container
          className="container"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "32px",
            backgroundColor: "#0a0a0a",
          }}
        >
          <Heading
            className="text-accent"
            style={{ color: "#2CFF68", marginBottom: "8px" }}
          >
            ¡Gracias por compartir tu idea! 🚀
          </Heading>

          <Text
            className="text-white"
            style={{ color: "#ffffff", fontSize: "16px", lineHeight: "1.6" }}
          >
            Hola {name},
          </Text>

          <Text
            className="text-muted"
            style={{ color: "#888888", fontSize: "14px", lineHeight: "1.6" }}
          >
            Recibí tu solicitud para un proyecto de tipo{" "}
            <span className="text-accent" style={{ color: "#2CFF68" }}>
              {projectType}
            </span>
            . Estoy revisando los detalles y me pondré en contacto contigo a la
            brevedad posible.
          </Text>

          <Hr className="hr" style={{ borderColor: "#222222", margin: "24px 0" }} />

          <Text
            className="text-muted"
            style={{ color: "#888888", fontSize: "13px", lineHeight: "1.6" }}
          >
            Mientras tanto, puedes conocer más sobre mi trabajo en{" "}
            <Link
              className="accent-link"
              href="https://paulomantilla.dev"
              style={{ color: "#2CFF68" }}
            >
              paulomantilla.dev
            </Link>
          </Text>

          <Hr className="hr" style={{ borderColor: "#222222", margin: "24px 0" }} />

          <Section
            className="card"
            style={{
              backgroundColor: "#111111",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              Si tienes alguna duda adicional, escríbeme directamente a{" "}
              <Link
                className="accent-link"
                href="mailto:paulomantillaa@gmail.com"
                style={{ color: "#2CFF68" }}
              >
                paulomantillaa@gmail.com
              </Link>
            </Text>
          </Section>

          <Text
            className="text-faint"
            style={{ color: "#444444", fontSize: "11px", marginTop: "24px" }}
          >
            — Paulo Mantilla ·{" "}
            <Link
              className="text-faint"
              href="https://paulomantilla.dev"
              style={{ color: "#444444", textDecoration: "underline" }}
            >
              paulomantilla.dev
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
