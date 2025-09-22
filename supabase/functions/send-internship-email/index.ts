import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log('Received request body:', body)

    const { email, firstName, lastName, collegeName, program, amount, paymentId, orderId } = body

    if (!email || !firstName || !lastName || !collegeName || !program || !amount || !paymentId || !orderId) {
      console.error('Missing required fields:', {
        hasEmail: !!email,
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasCollegeName: !!collegeName,
        hasProgram: !!program,
        hasAmount: !!amount,
        hasPaymentId: !!paymentId,
        hasOrderId: !!orderId
      })
      throw new Error('Missing required fields')
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      throw new Error('Email service configuration error')
    }

    console.log('Sending email to:', email)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'info@teachxpro.com',
        to: email,
        subject: 'Internship Application Payment Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Payment Confirmation</h2>
            <p>Dear ${firstName} ${lastName},</p>
            <p>Thank you for applying to our internship program. Your payment has been successfully processed.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #444; margin-top: 0;">Payment Details</h3>
              <p><strong>College:</strong> ${collegeName}</p>
              <p><strong>Program:</strong> ${program}</p>
              <p><strong>Amount Paid:</strong> ₹${amount}</p>
              <p><strong>Payment ID:</strong> ${paymentId}</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
            </div>

            <p>We will review your application and get back to you soon with further details about the internship program.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>Team TeachXPro</p>
          </div>
        `,
      }),
    })

    const responseData = await response.text()
    console.log('Resend API response:', {
      status: response.status,
      statusText: response.statusText,
      data: responseData
    })

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText} - ${responseData}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error in send-internship-email:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
}) 