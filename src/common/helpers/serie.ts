import { Serie, Datum } from "@nivo/line";

const generateSerie = (id: string, data: Datum[] = []): Serie => ({
  id,
  data,
});

const maxValue = (wholeData: Serie, axe: "x" | "y") =>
  Math.max.apply(
    Math,
    wholeData.data.map((o) => o[axe] as number)
  );

export { generateSerie, maxValue };
