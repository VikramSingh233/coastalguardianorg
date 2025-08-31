import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, reason, description } = body;

    // Validate required fields
    if (!name || !email || !reason || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send email notification only (skip database for now)
    try {
      const mailUser = process.env.MAIL_USER || 'dnsingh655@gmail.com';
      const mailPassword = process.env.MAIL_PASSWORD || 'mrsnyksmoxjhurjj';
      
      if (!mailUser || !mailPassword) {
        console.error('❌ Email credentials not configured in environment variables');
        throw new Error('Email configuration missing');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailUser,
          pass: mailPassword
        }
      });

      const mailOptions = {
        from: mailUser,
        to: mailUser,
        subject: `New Contact Form Submission - ${reason}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
            <div style="background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #007bff; margin-bottom: 20px;">Contact Details</h2>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">👤 Name:</h3>
                <p style="font-size: 16px; color: #666; margin: 0;">${name}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">📧 Email:</h3>
                <p style="font-size: 16px; color: #666; margin: 0;">${email}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">🎯 Reason:</h3>
                <p style="font-size: 16px; color: #666; margin: 0;">${reason}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #333; margin-bottom: 10px;">💬 Message:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                  <p style="font-size: 16px; color: #333; margin: 0; line-height: 1.6;">${description}</p>
                </div>
              </div>
              
              <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="color: #155724; margin-top: 0;">📅 Submission Details:</h4>
                <p style="color: #155724; margin-bottom: 5px;">• Submitted: ${new Date().toLocaleString()}</p>
                <p style="color: #155724; margin-bottom: 0;">• Status: Email only (Database disabled)</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px;">
                  This message was sent from the COASTAL Guardian contact form.
                </p>
              </div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Contact form email sent successfully');

    } catch (emailError) {
      console.error('❌ Failed to send contact form email:', emailError);
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: "Contact form submitted successfully - Email sent!",
        emailSent: true,
        note: "Database storage is currently disabled"
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Contact form submission error:', error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
