import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import ProjectRequestEmail from "@/emails/ProjectRequestEmail";
import ProjectConfirmationEmail from "@/emails/ProjectConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectType,
      features,
      budget,
      timeline,
      description,
      name,
      email,
      company,
      howFound,
    } = body;

    const { data, error } = await resend.emails.send({
      from: "Portfolio <paulo@paulomantilla.dev>",
      to: "paulomantillaa@gmail.com",
      replyTo: email,
      subject: `💡 Nueva idea de proyecto — ${name}`,
      react: ProjectRequestEmail({
        projectType,
        features,
        budget,
        timeline,
        description,
        name,
        email,
        company,
        howFound,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    try {
      await resend.emails.send({
        from: "Paulo Mantilla <paulo@paulomantilla.dev>",
        to: email,
        subject: "¡Recibí tu idea! Te contactaré pronto 🚀",
        react: ProjectConfirmationEmail({
          name,
          projectType,
        }),
      });
    } catch (confirmError) {
      console.error("Confirmation email failed:", confirmError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
