import { Map } from "./components/map";
import { NavBar } from "./components/navbar";

export function App() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl text-center">CrosSafe</h1>
          <p className="text-center">
            A simple app to help you cross the street safely
          </p>
        </div>
        <Map />
      </div>
    </div>
  );
}
