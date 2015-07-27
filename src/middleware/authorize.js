export default function authorize(spec) {
  console.log(spec)
  return function(req, res) {
    console.log(res)
  }

}
