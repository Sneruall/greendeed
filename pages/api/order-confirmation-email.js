const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

async function handler(req, res) {
  //   const shipping = req.body.sessionData.total - req.body.sessionData.subtotal;

  const order = {
    order_number: '123',
    order_date: '123',
    name: 'name',
    email: 'email',
    line1: 'line1',
    line2: 'line2',
    postal_code: '2323',
    city: 'city',
    country: 'netherlands',
    products: JSON.stringify({}),
    subtotal: 12,
    total: 12,
    shipping: 12,
  };

  const data = {
    from: 'noreply@soloswim.nl',
    templateId: 'd-924d5ca262a4459493df9909ebe332d9',
    personalizations: [
      {
        to: {
          name: `laurens`,
          email: `laurens@vr-house.nl`,
        },
        bcc: {
          email: 'info@soloswim.nl',
        },
        dynamic_template_data: {
          subject: `Bedankt voor je bestelling ${order.name}`,
          order_number: `${order.order_number}`,
          order_date: `${order.order_date}`,
          name: `${order.name}`,
          line1: `${order.line1}`,
          line2: `${order.line2}`,
          postal_code: `${order.postal_code}`,
          city: `${order.city}`,
          country: `${order.country}`,
          subtotal: `${order.subtotal.toFixed(2)}`,
          total: `${order.total.toFixed(2)}`,
          shipping: `${order.shipping.toFixed(2)}`,
          products: JSON.parse(order.products),
        },
      },
    ],
  };

  // Checking to see whether line2 value is equal to null
  //   if (data.personalizations[0].dynamic_template_data.line2 === 'null') {
  //     delete data.personalizations[0].dynamic_template_data.line2;
  //   }

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
