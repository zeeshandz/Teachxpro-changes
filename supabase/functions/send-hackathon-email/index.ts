import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";
import { corsHeaders } from "../_shared/cors.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_email, user_name, hackathon_name, what_to_build, deliverables, submission_deadline } = await req.json();

    const whatToBuildHtml = what_to_build.map((item: { title: string; description: string }) => 
      `<li><strong>${item.title}:</strong> ${item.description}</li>`
    ).join('');

    const deliverablesHtml = deliverables.map((item: string) => 
      `<li>${item}</li>`
    ).join('');

    const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thanks for joining the ${hackathon_name}!</h2>
          <p>Hi ${user_name},</p>
          <p>We're excited to see what you build. Here are the key details to get you started:</p>
          
          <h3>What to Build</h3>
          <p>Apply your skills in the most interesting way. Surprise us with something we haven’t seen before! Orient your application into the following categories:</p>
          <ul>${whatToBuildHtml}</ul>
          
          <h3>What to Submit</h3>
          <p>To complete your submission, you will need the following:</p>
          <ul>${deliverablesHtml}</ul>
          <p><strong>Submission Deadline: ${submission_deadline}</strong></p>

          <h3>Let's get started!</h3>
          <ul>
            <li><strong>Get inspired:</strong> Visit our resources page for tutorials and documentation.</li>
            <li><strong>Join the Community:</strong> Hop on our Discord to collaborate with other developers.</li>
            <li><strong>Start early:</strong> You can edit your submission as many times as you’d like before the deadline.</li>
            <li><strong>Keep an eye on your inbox:</strong> We’ll be sending you regular updates and tips.</li>
          </ul>
          
          <p>Happy Building!</p>
          <p>Best,<br/>The TeachXpro Team</p>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: "info@teachxpro.com",
      to: user_email,
      subject: `Registration Confirmed for ${hackathon_name}`,
      html: emailHtml,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});