import { Box } from "grommet";
import { FC } from "react";

import { useAppSelector, useAppDispatch } from "../reduxConfigurations/hooks";
import { InfoCard } from "../common/InfoCard";
import { saveLot, unsaveLot } from "../reduxConfigurations/lots/lotsSlice";
import { acresToSquareFeet } from "../utils/dimensions";

export const Lots: FC = () => {
  const dispatch = useAppDispatch();
  const lots = useAppSelector((state) => state.lots.value);

  console.log(lots);

  return (
    <Box>
      {lots.map((currentLot) => {
        const subheading = `${currentLot.acres} acres - ${acresToSquareFeet(
          currentLot.acres
        ).toLocaleString()} sqft`;
        return (
          <InfoCard
            key={currentLot.lotId}
            heading={currentLot.address}
            id={currentLot.lotId}
            heroImg={currentLot.image}
            subheading={subheading}
            description={currentLot.description}
            onHeartClick={() => {
              if (currentLot.saved) {
                dispatch(unsaveLot(currentLot));
              } else {
                dispatch(saveLot(currentLot));
              }
            }}
          />
        );
      })}
    </Box>
  );
};
