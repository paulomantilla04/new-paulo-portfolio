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

interface ProjectConfirmationEmailProps {
  name: string;
  projectType: string;
}

export default function ProjectConfirmationEmail({
  name,
  projectType,
}: ProjectConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>¡Recibí tu idea, {name}! Te contactaré pronto 🚀</Preview>
      <Body style={{ backgroundColor: "#0a0a0a", fontFamily: "sans-serif" }}>
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "32px" }}
        >
          <Heading style={{ color: "#2CFF68", marginBottom: "8px" }}>
            ¡Gracias por compartir tu idea! 🚀
          </Heading>

          <Text style={{ color: "#fff", fontSize: "16px", lineHeight: "1.6" }}>
            Hola {name},
          </Text>

          <Text style={{ color: "#888", fontSize: "14px", lineHeight: "1.6" }}>
            Recibí tu solicitud para un proyecto de tipo{" "}
            <span style={{ color: "#2CFF68" }}>{projectType}</span>. Estoy
            revisando los detalles y me pondré en contacto contigo a la brevedad
            posible.
          </Text>

          <Hr style={{ borderColor: "#222", margin: "24px 0" }} />

          <Text style={{ color: "#888", fontSize: "13px", lineHeight: "1.6" }}>
            Mientras tanto, puedes conocer más sobre mi trabajo en{" "}
            <Link
              href="https://paulomantilla.dev"
              style={{ color: "#2CFF68" }}
            >
              paulomantilla.dev
            </Link>
          </Text>

          <Hr style={{ borderColor: "#222", margin: "24px 0" }} />

          <Section
            style={{
              backgroundColor: "#111",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <Text style={{ color: "#888", fontSize: "12px", margin: "0" }}>
              Si tienes alguna duda adicional, escríbeme directamente a{" "}
              <Link
                href="mailto:paulomantillaa@gmail.com"
                style={{ color: "#2CFF68" }}
              >
                paulomantillaa@gmail.com
              </Link>
            </Text>
          </Section>

          <Text
            style={{ color: "#444", fontSize: "11px", marginTop: "24px" }}
          >
            — Paulo Mantilla · paulomantilla.dev
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
