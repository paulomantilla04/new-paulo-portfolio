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

interface ProjectRequestEmailProps {
  projectType: string;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  company?: string;
  howFound?: string;
}

export default function ProjectRequestEmail({
  projectType,
  features,
  budget,
  timeline,
  description,
  name,
  email,
  company,
  howFound,
}: ProjectRequestEmailProps) {
  return (
    <Html lang="es">
      <Head>
        <meta name="color-scheme" content="dark only" />
        <meta name="supported-color-schemes" content="dark only" />
        <style type="text/css" dangerouslySetInnerHTML={{ __html: darkModeCss }} />
      </Head>
      <Preview>💡 Nueva idea de proyecto de {name}</Preview>
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
            💡 Nueva idea de proyecto
          </Heading>
          <Text
            className="text-muted"
            style={{ color: "#888888", marginBottom: "32px" }}
          >
            Recibiste una solicitud desde tu portafolio.
          </Text>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              TIPO DE PROYECTO
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px" }}
            >
              {projectType}
            </Text>
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              FUNCIONALIDADES
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px" }}
            >
              {features.join(", ")}
            </Text>
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              PRESUPUESTO
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px" }}
            >
              {budget}
            </Text>
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              TIEMPO ESTIMADO
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px" }}
            >
              {timeline}
            </Text>
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              DESCRIPCIÓN
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px", lineHeight: "1.6" }}
            >
              {description}
            </Text>
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section>
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              CONTACTO
            </Text>
            <Text
              className="text-white"
              style={{ color: "#ffffff", marginTop: "4px" }}
            >
              {name}
            </Text>
            <Link
              className="accent-link"
              href={`mailto:${email}`}
              style={{ color: "#2CFF68" }}
            >
              {email}
            </Link>
            {company && (
              <Text
                className="text-white"
                style={{ color: "#ffffff", marginTop: "4px" }}
              >
                {company}
              </Text>
            )}
            {howFound && (
              <Text
                className="text-muted"
                style={{ color: "#888888", fontSize: "13px" }}
              >
                Me encontró a través de: {howFound}
              </Text>
            )}
          </Section>

          <Hr className="hr" style={{ borderColor: "#222222" }} />

          <Section
            className="card"
            style={{
              backgroundColor: "#111111",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "24px",
            }}
          >
            <Text
              className="text-muted"
              style={{ color: "#888888", fontSize: "12px", margin: "0" }}
            >
              Responde directamente a{" "}
              <Link
                className="accent-link"
                href={`mailto:${email}`}
                style={{ color: "#2CFF68" }}
              >
                {email}
              </Link>{" "}
              para contactar a {name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
