export default function refresh(spec) {
  console.log(spec)
  return function(req, res) {
    console.log(res)
  }

}
