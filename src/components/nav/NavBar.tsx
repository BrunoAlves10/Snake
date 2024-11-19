import { useNavigate } from "react-router-dom";
import Logo from "../../assets/SSSNAKE.png"

export function NavBar() {
  const selected = [
    {
      title: "Jogar",
      selected: true,
      path: '/'
    },
    {
      title: "Tutorial",
      selected: false,
      path: '/tutorial'
    },
    {
      title: "Créditos",
      selected: false,
      path: '/creditos'
    }
  ]
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center justify-between mb-2">
      <img src={Logo} alt="" />
      <span className="bg-slate-200 px-4 py-1 rounded-lg flex flex-row items-center gap-4 cursor-pointer">
        {
          selected.map((item) => {
            return <div onClick={() => navigate(item.path)} className={item.selected ? "text-white bg-slate-600 px-3 py-[3px] rounded-lg" : ""}>{item.title}</div>
          })
        }
      </span>
  </div>
  )
}