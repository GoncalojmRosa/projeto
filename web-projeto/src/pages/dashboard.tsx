import { Map } from "../components/map";
import { NavBar } from "../components/navbar";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-green-400 rounded-md h-16 flex flex-1 items-center justify-center">
          <span className="text-4xl">44</span>
        </div>
        <div className="col-span-1 bg-yellow-400 rounded-md h-16 flex flex-1 items-center justify-center">
          <span className="text-4xl">33</span>
        </div>
        <div className="col-span-1 bg-red-400 rounded-md h-16 flex flex-1 items-center justify-center">
          <span className="text-4xl">22</span>
        </div>
        <div className="col-span-3">
          <Map />
        </div>
      </div>
    </div>
  );
}
