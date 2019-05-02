import axios from 'axios';


const getTransactionDetail = async (transactionId) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/transaction', { transactionId })
    .then(response => resolve(response.data))
    .catch(error => reject(error));
  })
}

export {
  getTransactionDetail
}