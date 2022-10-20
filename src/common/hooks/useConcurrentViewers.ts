import { useEffect, useState } from "react";
import moment from "moment";

import { useAuth } from ".";
import { apiRequest } from "../axios";
import { Serie } from "@nivo/line";
import { generateSerie } from "../helpers/serie";

export const useConcurrentViewers = (days: number) => {
  const [concurrentViewers, setConcurrentViewers] = useState<Serie[]>([]);

  const { token } = useAuth();
  useEffect(() => {
    apiRequest("POST", "/audience", {
      session_token: token,
      from: moment().subtract(days, "days").valueOf(),
      to: moment().valueOf(),
    }).then((response) => {
      const audienceDatas: [[number, number]] = response.data.audience;
      const formatedAudienceDatas = [
        generateSerie(
          "Audience",
          audienceDatas.map((data) => ({
            x: moment(data[0]).format("YYYY-MM-DD-HH"),
            y: data[1],
          }))
        )
      ];
      setConcurrentViewers(formatedAudienceDatas);
    });
  }, [token, days]);

  return [concurrentViewers];
};
