export default function revoke(spec) {
  console.log(spec)
  return function(req, res) {
    console.log(res)
  }

}
