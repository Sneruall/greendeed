const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req, res) {
  //   const shipping = req.body.sessionData.total - req.body.sessionData.subtotal;

  const data = {
    from: 'noreply@soloswim.nl',
    templateId: 'd-f7f18c73dac342408b74f103bd4afdf0',
    personalizations: [
      {
        to: {
          name: req.body.companyName,
          email: `${req.body.email}`,
        },
        bcc: {
          email: 'l.c.vanroomen@gmail.com',
        },
        dynamic_template_data: {
          subject: `Job submitted successfully: ${req.body.jobTitle}`,
          companyName: req.body.companyName,
          jobTitle: req.body.jobTitle,
          jobType: req.body.jobType,
          id: req.body.id,
          companyId: req.body.companyId,
          price: req.body.price,
          invoiceInfo: req.body.invoiceInfo,
        },
      },
    ],
  };

  mail
    .send(data)
    .then((response) => {
      if (response[0].statusCode == '202') {
        res.status(200).json({ message: 'ok' });
      } else {
        res
          .status(response[0].statusCode)
          .json({ message: 'error', statusCode: response[0].statusCode });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(response[0].statusCode)
        .json({ message: 'error', error: error });
    });
}

export default handler;
