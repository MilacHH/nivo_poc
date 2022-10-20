import { useEffect, useState } from "react";
import moment from "moment";

import { useAuth } from ".";
import { apiRequest } from "../axios";
import { Serie } from "@nivo/line";
import { generateSerie } from "../helpers/serie";

export const useBandiwdth = (days: number) => {
  const [bandwidth, setBandwidth] = useState<Serie[]>([]);

  const { token } = useAuth();
  useEffect(() => {
    apiRequest("POST", "/bandwidth", {
      session_token: token,
      from: moment().subtract(days, "days").valueOf(),
      to: moment().valueOf(),
    }).then((response) => {
      const cdnDatas: [[number, number]] = response.data.cdn;
      const p2pDatas: [[number, number]] = response.data.p2p;
      const formatedCdnDatas = [
        generateSerie(
          "Http",
          cdnDatas.map((data) => ({
            x: moment(data[0]).format("YYYY-MM-DD-HH"),
            y: data[1],
          }))
        ),
        generateSerie(
          "P2p",
          p2pDatas.map((entry) => ({
            x: moment(entry[0]).format("YYYY-MM-DD-HH"),
            y: entry[1],
          }))
        ),
      ];
      setBandwidth(formatedCdnDatas);
    });
  }, [token, days]);

  return [bandwidth];
};
