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
    <Html>
      <Head />
      <Preview>💡 Nueva idea de proyecto de {name}</Preview>
      <Body style={{ backgroundColor: "#0a0a0a", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", padding: "32px" }}>
          <Heading style={{ color: "#2CFF68", marginBottom: "8px" }}>
            💡 Nueva idea de proyecto
          </Heading>
          <Text style={{ color: "#888", marginBottom: "32px" }}>
            Recibiste una solicitud desde tu portafolio.
          </Text>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              TIPO DE PROYECTO
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px" }}>{projectType}</Text>
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              FUNCIONALIDADES
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px" }}>
              {features.join(", ")}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              PRESUPUESTO
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px" }}>{budget}</Text>
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              TIEMPO ESTIMADO
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px" }}>{timeline}</Text>
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              DESCRIPCIÓN
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px", lineHeight: "1.6" }}>
              {description}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section>
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              CONTACTO
            </Text>
            <Text style={{ color: "#fff", marginTop: "4px" }}>{name}</Text>
            <Link href={`mailto:${email}`} style={{ color: "#2CFF68" }}>
              {email}
            </Link>
            {company && (
              <Text style={{ color: "#fff", marginTop: "4px" }}>{company}</Text>
            )}
            {howFound && (
              <Text style={{ color: "#888", fontSize: "13px" }}>
                Me encontró a través de: {howFound}
              </Text>
            )}
          </Section>

          <Hr style={{ borderColor: "#222" }} />

          <Section
            style={{
              backgroundColor: "#111",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "24px",
            }}
          >
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              Responde directamente a{" "}
              <Link href={`mailto:${email}`} style={{ color: "#2CFF68" }}>
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
