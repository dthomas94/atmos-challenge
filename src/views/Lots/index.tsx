import { Box } from "grommet";
import { FC } from "react";
import { InfoCard } from "../../common/InfoCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../reduxConfigurations/hooks";
import { saveLot, unsaveLot } from "../../reduxConfigurations/lots/lotsSlice";
import { acresToSquareFeet } from "../../utils/dimensions";
import { Link } from "react-router-dom";
import "./Lots.scss";

export const lotSubheading = (acres: number) =>
  `${acres} acres - ${acresToSquareFeet(acres).toLocaleString()} sqft`;

export const Lots: FC = () => {
  const dispatch = useAppDispatch();
  const lots = useAppSelector((state) => state.lots.value);

  return (
    <Box direction="row-responsive" wrap style={{ columnGap: 20 }}>
      {lots.map((currentLot) => {
        const { lotId, image, address, saved, description, acres } = currentLot;
        return (
          <Link
            style={{ textDecoration: "none" }}
            key={lotId}
            to={{
              pathname: `/lots?lotId=${currentLot.lotId}`,
              state: { lotId: currentLot.lotId },
            }}
          >
            <InfoCard
              heading={address}
              id={lotId}
              heroImg={image}
              subheading={lotSubheading(acres)}
              saved={saved}
              description={description}
              onHeartClick={() => {
                if (saved) {
                  dispatch(unsaveLot(currentLot));
                } else {
                  dispatch(saveLot(currentLot));
                }
              }}
            />
          </Link>
        );
      })}
    </Box>
  );
};
