import { Outlet } from 'react-router-dom'
import Footer from '../Common/Footer'
import Header from '../Common/Header'

function UserLayout() {
  return (
    <>
    {/* {Header} */}
    <Header/>
    {/* {Main content} */}
    <main>
      <Outlet/>
    </main>
    {/* {Footer} */}
    <Footer/>
    </>
  )
}

export default UserLayout