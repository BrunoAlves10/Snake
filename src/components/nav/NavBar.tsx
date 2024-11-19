import { NavLink } from "react-router-dom";
import Logo from "../../assets/SSSNAKE.png"

export function NavBar() {
  const selected = [
    {
      title: "Jogar",
      path: '/'
    },
    {
      title: "Tutorial",
      path: '/tutorial'
    },
    {
      title: "Créditos",
      path: '/creditos'
    }
  ]
  return (
    <div className="w-full flex items-center justify-between mb-2">
      <img src={Logo} alt="" />
      <span className="bg-slate-300 px-4 py-1 rounded-lg flex flex-row items-center gap-1 cursor-pointer">
        {
          selected.map((item) => {
            return (
              <NavLink to={item.path} style={({isActive}) => {
                return {
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 8,
                  color: isActive ? "#e2e8f0" : "",
                  backgroundColor: isActive ? "#475569" : ""
                }
              }}>{item.title}</NavLink>
            )
          })
        }
      </span>
  </div>
  )
}