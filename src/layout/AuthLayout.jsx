import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container px-10 md:items-center md:grid md:grid-cols-2 md:gap-10">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout