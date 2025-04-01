import Auth from "../components/Auth"
import Quote from "../components/Quote"

function Signup() {
  return (
    <div>
        <div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2">
          <Auth type="signup"/>
          <Quote/>
        </div>
    </div>
  )
}

export default Signup