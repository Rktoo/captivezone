"use client"
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { NetworkData } from "../../types/NetworkData";
import Speedometer from "../components/Speedometer";

export default function Home() {
  const [networkData, setNetworkData] = useState<NetworkData>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    connectionSpeed: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  let socket: Socket;

  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("networkData", (data: NetworkData) => {
      setNetworkData(data);
      setLoading(!loading);
    });

    return () => {
      socket.off('networkData');
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl text-center flex flex-row gap-1">Suivi <span className="hidden md:block">des performances Réseau </span>en temps réel</h1>
      {loading ? <div className="flex flex-col items-center gap-2 ">
        <div
          className="relative border-2 border-white w-10 h-10 rounded-full overflow-hidden animate-spin select-none z-10"
        >
          <span className="z-20 w-[1.12rem] absolute top-0 left-0 bg-black text-transparent">a</span>
          <span className="z-20 w-4 absolute top-0 right-0 bg-green-400 text-transparent">b</span>
          <span className="z-20 w-[1.12rem] absolute -bottom-[0.4rem] right-0 bg-yellow-400 text-transparent">c</span>
          <span className="z-20 w-[1.1rem] absolute -bottom-[0.4rem] left-0 bg-red-400 text-transparent">d</span>
        </div>
        <h3 className="animate-pulse">Chargement</h3>
      </div>
        :
        <div className="flex  justify-center items-center flex-wrap p-10 gap-4 ">
          <Speedometer label="Vitesse de connexion" value={Number(networkData.connectionSpeed)} maxValue={100} image="/images/connection.png" width={100}/>
          <Speedometer label="Taux de download" value={networkData.downloadSpeed} maxValue={100} image="/images/download.png" width={100}/>
          <Speedometer label="Taux d'upload" value={networkData.uploadSpeed} maxValue={100} image="/images/upload.png" width={80}/>
        </div>
      }
    </div>
  );
}
