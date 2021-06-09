import { Box } from "grommet";
import { FC } from "react";

import { useAppSelector, useAppDispatch } from "../reduxConfigurations/hooks";
import { InfoCard } from "../common/InfoCard";
import { saveHome, unsaveHome } from "../reduxConfigurations/homes/homesSlice";

export const Homes: FC = () => {
  const dispatch = useAppDispatch();
  const homes = useAppSelector((state) => state.homes.value);

  console.log(homes);

  return (
    <Box direction="row-responsive" wrap style={{ columnGap: 20 }}>
      {homes.map((currentHome) => {
        const subheading = `${currentHome.numBeds} beds - ${currentHome.numBaths} baths - ${currentHome.sqft}`;
        return (
          <InfoCard
            key={currentHome.homePlanId}
            heading={currentHome.name}
            id={currentHome.homePlanId}
            heroImg={currentHome.image}
            tags={currentHome.tags}
            subheading={subheading}
            description={currentHome.description}
            onHeartClick={() => {
              if (currentHome.saved) {
                dispatch(unsaveHome(currentHome));
              } else {
                dispatch(saveHome(currentHome));
              }
            }}
          />
        );
      })}
    </Box>
  );
};
