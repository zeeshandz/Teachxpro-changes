import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { 
      email, 
      firstName,
      lastName,
      courseName,
      amount,
      paymentId,
      orderId
    } = await req.json()

    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .details { margin: 20px 0; }
          .footer { text-align: center; padding: 20px 0; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Enrollment Confirmation</h1>
          </div>
          <div class="content">
            <p>Dear ${firstName} ${lastName},</p>
            <p>Thank you for enrolling in ${courseName}. Your payment has been successfully processed.</p>
            
            <div class="details">
              <h3>Payment Details:</h3>
              <p><strong>Amount Paid:</strong> ₹${amount}</p>
              <p><strong>Payment ID:</strong> ${paymentId}</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
            </div>

            <p>You will receive further instructions about accessing your course materials shortly.</p>
            
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
          </div>
          <div class="footer">
            <p>teachXpro - Professional Development</p>
          </div>
        </div>
      </body>
      </html>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY') || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'info@teachxpro.com',
        to: email,
        subject: `Enrollment Confirmation - ${courseName}`,
        html: emailTemplate
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API error:', error)
      throw new Error(error.message || 'Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})