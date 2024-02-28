import { Barcode } from "lucide-react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center space-x-2">
        <Barcode />
        <Link to={"/"}>CrosSafe</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/about"}>About</Link>

        <h1>Contact</h1>
      </div>
    </div>
  );
}
