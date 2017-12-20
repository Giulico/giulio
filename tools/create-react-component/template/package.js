module.exports = (params) => `

{
  "name": "${params.name.toLowerCase()}",
  "version": "0.0.0",
  "private": true,
  "main": "./${params.name}.js"
}

`.trim();