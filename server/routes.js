/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
const axios = require('axios');

module.exports = (app) => {
  // use the gzipped bundle
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz'; // eslint-disable-line
    res.set('Content-Encoding', 'gzip');
    next();
  });

  app.post('*/api/*', (req, res) => {
    const apiMapping = [
      { key: '/api/user/login', value: 'api/v3/merchant/user/login' },
      { key: '/api/transactions/report', value: 'api/v3/transactions/report' },
      { key: '/api/transaction/list', value: 'api/v3/transaction/list' },
      { key: '/api/transaction', value: 'api/v3/transaction' },
      { key: '/api/client', value: 'api/v3/client' }
    ]
    const endpoint = apiMapping.find(item => item.key === req.url)
    
    if (!endpoint) return res.status(400).send(req.url)

    requestURL = `https://sandbox-reporting.rpdpymnt.com/${endpoint.value}`;
    const headers = req.headers.authorization ? { headers: { "Authorization": req.headers.authorization } } : null
    
    axios.post(
      requestURL,
      { ...req.body },
      { ...headers }
    )
      .then(response => res.send(response.data))
      .catch(err => {
        console.log(err);
        res.status(400).send()
        // res.status(err.response.status).send(err.response.data)
      })
  })
}