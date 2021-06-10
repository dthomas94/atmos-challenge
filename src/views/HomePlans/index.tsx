import { Box } from "grommet";
import { FC } from "react";

import {
  useAppSelector,
  useAppDispatch,
} from "../../reduxConfigurations/hooks";
import { InfoCard } from "../../common/InfoCard";
import {
  saveHome,
  unsaveHome,
} from "../../reduxConfigurations/homes/homesSlice";
import { Link } from "react-router-dom";

export const homeSubheading = (
  numBeds: number,
  numBaths: number,
  sqft: number
) => `${numBeds} beds - ${numBaths} baths - ${sqft}`;

export const Homes: FC = () => {
  const dispatch = useAppDispatch();
  const homes = useAppSelector((state) => state.homes.value);

  return (
    <Box direction="row-responsive" wrap style={{ columnGap: 20 }}>
      {homes.map((currentHome) => {
        const {
          homePlanId,
          name,
          image,
          tags,
          saved,
          description,
          numBeds,
          numBaths,
          sqft,
        } = currentHome;
        return (
          <Link
            key={homePlanId}
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/homes?homePlanId=${currentHome.homePlanId}`,
              state: { homePlanId: currentHome.homePlanId },
            }}
          >
            <InfoCard
              heading={name}
              id={homePlanId}
              heroImg={image}
              tags={tags}
              subheading={homeSubheading(numBeds, numBaths, sqft)}
              saved={saved}
              description={description}
              onHeartClick={() => {
                if (saved) {
                  dispatch(unsaveHome(currentHome));
                } else {
                  dispatch(saveHome(currentHome));
                }
              }}
            />
          </Link>
        );
      })}
    </Box>
  );
};
