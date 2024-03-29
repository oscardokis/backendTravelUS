function testHandlerAuth (err, req, res, next) {
  const cookies = req.cookies.jwt
  if (cookies) {
    console.log('cookies', cookies)
    next()
  } else {
    console.log(err)
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = testHandlerAuth;