import Joao from "../assets/joao.jpg";
import Goncalo from "../assets/goncalo.jpg";
import { NavBar } from "../components/navbar";

export function About() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Project Idea</h1>
        <p className="text-lg">
          CrosSafe is a simple yet powerful app designed to help identify
          damaged crosswalks. Leveraging IoT technology, particularly Raspberry
          Pi devices equipped with advanced object detection models, CrosSafe
          swiftly detects and flags damaged crosswalks. The detections are
          seamlessly uploaded and visualized within the app, providing valuable
          insights for entities to prioritize and plan future maintenance
          efforts, including timely repainting.
        </p>
      </section>
      <section>
        <h1 className="text-3xl font-bold mb-4">The Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 flex items-center shadow-md">
            <img src={Joao} alt="Joao" className="mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">João</h2>
              <p className="text-lg mb-4">
                Responsible for the object detection models and integration with
                Raspberry Pi.
              </p>
              <ul className="text-gray-600">
                <li className="flex items-center mb-2">Web Development</li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 8.293a1 1 0 0 1 1.414 0L10 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  React Development
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 flex items-center shadow-md">
            <img src={Goncalo} alt="Goncalo" className="mr-4" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Gonçalo</h2>
              <p className="text-lg mb-4">
                Responsible for app development and integration with IoT devices
                and backend services.
              </p>
              <ul className="text-gray-600">
                <li className="flex items-center mb-2">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 8.293a1 1 0 0 1 1.414 0L10 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Web Development
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 8.293a1 1 0 0 1 1.414 0L10 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  React Development
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 8.293a1 1 0 0 1 1.414 0L10 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Backend Development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
