export default {
  /**
   * validate the formdata
   * or get the formdata
   * @param {*} formdata
   */
  checkOrGetFormData(formdata) {
    const fileds = ['sender_email', 'sender_name', 'recipient_email', 'subject', 'message'];
    const result = [];
    let error = '';
    fileds.forEach((item) => {
      const value = formdata.get(item);
      console.debug(item, value);
      if (!value || value === '' || value === undefined || value === null) {
        error = `Request params :${item} error`;
      }
      result[item] = value;
    });
    if (error != '') {
      return null;
    }
    return result;
  },

  sendEmail(data) {
    fetch('https://api.mailchannels.net/tx/v1/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: data.recipient_email, name: data.recipient_email }]
          }
        ],
        from: {
          email: data.sender_email,
          name: data.sender_name
        },
        subject: data.subject,
        content: [
          {
            type: 'text/html',
            value: data.message
          }
        ]
      })
    });
  },
  async fetch(request) {
    if (request.method !== 'POST') {
      console.debug('Request method must be POST');
      return new Response('Request method must be POST');
    }

    const formdata = await request.formData();
    const data = this.checkOrGetFormData(formdata);
    if (!data) {
      return new Response('Request params error');
    }

    return this.sendEmail(data);
  }
};
