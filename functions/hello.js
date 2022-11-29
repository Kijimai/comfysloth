// domain/.netlify/functions/hello

const items = [
  { id: 1, name: "john" },
  { id: 2, name: "john" },
  { id: 3, name: "john" },
  { id: 4, name: "john" },
  { id: 5, name: "john" },
  { id: 6, name: "john" },
  { id: 7, name: "john" },
  { id: 8, name: "john" },
  { id: 9, name: "john" },
  { id: 10, name: "john" },
  { id: 11, name: "john" },
]

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    httpMethod: "GET",
    body: JSON.stringify(items),
  }
}
