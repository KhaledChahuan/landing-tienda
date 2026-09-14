// tiendacencocal.com quedó dado de baja: toda URL responde 410 para que Google la retire de sus
// resultados. 410 y no 404 porque le dice explícitamente que la baja es permanente.
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.status(410).send('410 Gone')
}
