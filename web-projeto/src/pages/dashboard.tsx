import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Map } from "../components/map";
import { NavBar } from "../components/navbar";
import { NewDetection } from "@/components/new-detection";

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="container mx-auto py-8 px-4 lg:px-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Crosswalk Detection Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-green-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-green-800">
                Crosswalks Detected
              </p>
              <p className="text-3xl font-bold text-green-800">44</p>
            </div>
          </div>
          <div className="bg-yellow-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <AlertTriangle size={32} className="text-yellow-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-yellow-800">
                Crosswalks with Minor Damage
              </p>
              <p className="text-3xl font-bold text-yellow-800">33</p>
            </div>
          </div>
          <div className="bg-red-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <AlertOctagon size={32} className="text-red-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-red-800">
                Crosswalks with Major Damage
              </p>
              <p className="text-3xl font-bold text-red-800">22</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 lg:px-0 col-span-3 mt-8 lg:mt-0">
        <div className="flex justify-end relative z-10">
          <NewDetection />
        </div>
        <div className="relative z-0">
          <Map />
        </div>
      </div>
    </div>
  );
}
