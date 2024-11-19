import { NavBar } from "../components/nav/NavBar"

export function Tutorial() {
  return (
    <div className="bg-gradient flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <NavBar/>
          <div className="w-[1100px] h-[500px] bg-slate-300 rounded-2xl"></div>
        </div>
      </div>
  )
}