import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY);

const generateEmailData = (body) => {
  return {
    from: 'noreply@greendeed.io',
    templateId: 'd-f7f18c73dac342408b74f103bd4afdf0',
    personalizations: [
      {
        to: {
          name: body.companyName,
          email: body.email,
        },
        bcc: {
          email: 'info@greendeed.io',
        },
        dynamic_template_data: {
          subject: `Job submitted successfully: ${body.jobTitle}`,
          companyName: body.companyName,
          jobTitle: body.jobTitle,
          jobType: body.jobType,
          id: body.id,
          companyId: body.companyId,
          price: body.price,
          invoiceInfo: body.invoiceInfo,
          fullName: body.fullName,
          companyData: body.companyData,
        },
      },
    ],
  };
};

async function handler(req, res) {
  const emailData = generateEmailData(req.body);

  try {
    const response = await mail.send(emailData);

    if (response[0].statusCode === 202) {
      res.status(200).json({ message: 'ok' });
    } else {
      res
        .status(response[0].statusCode)
        .json({ message: 'error', statusCode: response[0].statusCode });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error', error: error });
  }
}

export default handler;
