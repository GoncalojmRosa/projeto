import { NavBar } from "../components/navbar";
import Raspberry from "../assets/raspberry.jpg";
export function Home() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">CrosSafe</h1>
          <p className="text-lg mt-2">
            Your go-to solution for identifying damaged crosswalks.
          </p>
        </header>

        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-10">
          <p className="md:w-1/2 text-lg text-left">
            Utilizing IoT technology, particularly Raspberry Pi devices equipped
            with advanced object detection models, our app swiftly detects and
            flags damaged crosswalks.
          </p>
          <img src={Raspberry} alt="Raspberry Pi" className="md:w-96 h-auto" />
        </div>

        <p className="mt-10 text-lg">
          These detections are seamlessly uploaded and visualized within the
          app, offering invaluable insights to help entities prioritize and
          strategize future maintenance efforts, including timely repainting.
          Welcome to the future of crosswalk safety with CrosSafe.
        </p>
      </div>
    </div>
  );
}
