import { Barcode } from "lucide-react";

export function NavBar() {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex items-center space-x-2">
        <Barcode />
        <h1>CrosSafe</h1>
      </div>
    </div>
  );
}
