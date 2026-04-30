import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// Get your public key from https://dashboard.emailjs.com/account/security
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send contact form email using EmailJS
 * @param {Object} formData - Form data object containing name, email, phone, subject, message
 * @returns {Promise} Promise that resolves when email is sent
 */
export const sendContactEmail = async (formData) => {
  try {
    // Validate credentials are set
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' || !EMAILJS_PUBLIC_KEY) {
      console.error('Missing VITE_EMAILJS_PUBLIC_KEY in environment variables');
      return {
        success: false,
        message: 'Email service not configured. Please contact admin.',
        error: 'Missing public key',
      };
    }
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE' || !EMAILJS_SERVICE_ID) {
      console.error('Missing VITE_EMAILJS_SERVICE_ID in environment variables');
      return {
        success: false,
        message: 'Email service not configured. Please contact admin.',
        error: 'Missing service ID',
      };
    }
    if (EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE' || !EMAILJS_TEMPLATE_ID) {
      console.error('Missing VITE_EMAILJS_TEMPLATE_ID in environment variables');
      return {
        success: false,
        message: 'Email service not configured. Please contact admin.',
        error: 'Missing template ID',
      };
    }

    const fullName = formData.name?.trim() || 'No name provided';
    const emailAddress = formData.email?.trim() || 'No email provided';
    const phoneNumber = formData.phone?.trim() || 'No phone provided';
    const subjectLine = formData.subject?.trim() || 'No subject provided';
    const messageBody = formData.message?.trim() || 'No message provided';

    const templateParams = {
      // Common EmailJS variables and aliases so the template can use whichever names it expects.
      name: fullName,
      email: emailAddress,
      phone: phoneNumber,
      phone_number: phoneNumber,
      contact_phone: phoneNumber,
      caller_phone: phoneNumber,
      subject: subjectLine,
      email_subject: subjectLine,
      mail_subject: subjectLine,
      message: messageBody,
      from_name: fullName,
      from_email: emailAddress,
      reply_to: emailAddress,
      user_name: fullName,
      user_email: emailAddress,
      user_phone: phoneNumber,
      user_subject: subjectLine,
      user_message: messageBody,
      contact_subject: subjectLine,
      to_email: 'sbsonlineuse@gmail.com',
      to_name: 'SBS Online Use',
    };

    console.log('Sending email with:', { 
      serviceId: EMAILJS_SERVICE_ID, 
      templateId: EMAILJS_TEMPLATE_ID,
      to: templateParams.to_email 
    });

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return {
      success: true,
      message: 'Email sent successfully!',
      response,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      text: error.text,
      status: error.status,
    });

    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.';
    
    if (error.status === 401 || error.message?.includes('authentication')) {
      errorMessage = 'Authentication failed. Please check your EmailJS credentials.';
    } else if (error.status === 422 || error.message?.includes('validation')) {
      errorMessage = 'Email validation error. Please check all fields are filled correctly.';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Network error. Please check your internet connection.';
    }

    return {
      success: false,
      message: errorMessage,
      error: error.message,
    };
  }
};

export default {
  sendContactEmail,
};
