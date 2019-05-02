import jwt from 'jsonwebtoken'

export default function redirectToLogin() {
  if (window.location.pathname === '/login') return false
  const hasToken = localStorage.getItem('token')
  if (!hasToken) return true

  var decoded = jwt.decode(localStorage.getItem('token'));
  try {
    if (decoded.timestamp < (new Date().getTime() + 1) / 1000) {
      return true;
    }
  } catch (err) {
    return false;
  }
}