import Auth from "../components/Auth"
import Quote from "../components/Quote"


function Signin() {
  return (
    <div>
      <div className="lg:grid lg:grid-cols-2 lg:grid-rows-1">
          <Auth type="signin"/>
          <div className="hidden lg:block">
            <Quote/>
          </div>
      </div>
    </div>
  )
}

export default Signin

// div className="grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2">
//           <Auth type="signin"/>
//           <Quote/>
//         </div>