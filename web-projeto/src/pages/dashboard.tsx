import { TableCrosswalks } from "@/components/component/table-crosswalks";
import {
  Crosswalk,
  CrosswalksResponse,
  deleteCrosswalk,
  getCrosswalks,
} from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { AlertOctagon, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Map } from "../components/map";
import { NavBar } from "../components/navbar";

export interface TableCrosswalksProps {
  crosswalks?: Crosswalk[] | undefined;
  filteredCrosswalks?: Crosswalk[] | undefined;
  handleDetectionRepair: (crosswalkId: string) => void;
  setPage?: (page: number) => void;
  maxItems?: number;
}

const MAX_ITEMS = 4 as const;

export function Dashboard() {
  const [page, setPage] = useState<number>(0);
  const [crosswalks, setCrosswalks] = useState<Crosswalk[]>([]);
  const [dataResponse, setDataResponse] = useState<CrosswalksResponse>({
    crosswalks: [],
    semDesgasteCount: 0,
    desgasteModeradoCount: 0,
    desgasteSeveroCount: 0,
  });
  const { data, isLoading, status, error } = useQuery<CrosswalksResponse>({
    queryKey: ["crosswalks"],
    queryFn: getCrosswalks,
  });
  useEffect(() => {
    if (status === "success") {
      const startIndex = page * MAX_ITEMS;
      const endIndex = (page + 1) * MAX_ITEMS;
      const slicedCrosswalks = data.crosswalks.slice(startIndex, endIndex);
      setDataResponse(data);
      setCrosswalks(slicedCrosswalks);
    }
  }, [status, data, page]);

  const handleDetectionRepair = useCallback(async (crosswalkId: string) => {
    console.log(crosswalkId);
    await deleteCrosswalk(crosswalkId).then((deletedCrosswalk) => {
      setDataResponse((prevState) => {
        if (!prevState) return prevState;
        const newCrosswalks = prevState.crosswalks.filter(
          (cw) => cw.id !== crosswalkId
        );
        setCrosswalks(newCrosswalks);
        return {
          ...prevState,
          crosswalks: newCrosswalks,
          semDesgasteCount:
            prevState.semDesgasteCount -
            (deletedCrosswalk.state === "SEM_DESGASTE" ? 1 : 0),
          desgasteModeradoCount:
            prevState.desgasteModeradoCount -
            (deletedCrosswalk.state === "DESGASTE_MODERADO" ? 1 : 0),
          desgasteSeveroCount:
            prevState.desgasteSeveroCount -
            (deletedCrosswalk.state === "DESGASTE_SEVERO" ? 1 : 0),
        };
      });
    });
    toast.success("Crosswalk has been repaired");
  }, []);
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <NavBar />
      <div className="container mx-auto py-8 px-4 lg:px-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-green-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-green-800">
                Crosswalks with No Damage
              </p>
              <p className="text-3xl font-bold text-green-800">
                {" "}
                {dataResponse?.semDesgasteCount}{" "}
              </p>
            </div>
          </div>
          <div className="bg-yellow-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <AlertTriangle size={32} className="text-yellow-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-yellow-800">
                Crosswalks with Minor Damage
              </p>
              <p className="text-3xl font-bold text-yellow-800">
                {dataResponse?.desgasteModeradoCount}
              </p>
            </div>
          </div>
          <div className="bg-red-200 rounded-md shadow-lg p-6 flex items-center justify-center">
            <AlertOctagon size={32} className="text-red-600 mr-2" />
            <div>
              <p className="text-lg font-semibold text-red-800">
                Crosswalks with Major Damage
              </p>
              <p className="text-3xl font-bold text-red-800">
                {dataResponse?.desgasteSeveroCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto py-8 px-4 lg:px-0 col-span-3 mt-8 lg:mt-0">
        <div className="relative z-0">
          <Map crosswalks={crosswalks} />
        </div>
      </section>
      <section>
        <TableCrosswalks
          crosswalks={dataResponse.crosswalks}
          filteredCrosswalks={crosswalks}
          handleDetectionRepair={handleDetectionRepair}
          setPage={setPage}
          maxItems={MAX_ITEMS}
        />
      </section>
    </div>
  );
}
