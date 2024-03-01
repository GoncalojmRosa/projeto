import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Map } from "../components/map";
import { NavBar } from "../components/navbar";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="container flex mx-auto py-24">
        <div className="grid grid-cols-3 gap-4 h-full w-screen">
          <div className="col-span-1 bg-green-400 rounded-md h-16 flex flex-1 items-center justify-center relative">
            <CheckCircle2 size={20} className="absolute right-0 top-0 m-1" />
            <span className="text-4xl">44</span>
          </div>
          <div className="col-span-1 bg-yellow-400 rounded-md h-16 flex flex-1 items-center justify-center relative">
            <AlertTriangle size={20} className="absolute right-0 top-0 m-1" />

            <span className="text-4xl">33</span>
          </div>
          <div className="col-span-1 bg-red-400 rounded-md h-16 flex flex-1 items-center justify-center relative">
            <AlertOctagon size={20} className="absolute right-0 top-0 m-1" />

            <span className="text-4xl">22</span>
          </div>
          <div className="col-span-3">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
