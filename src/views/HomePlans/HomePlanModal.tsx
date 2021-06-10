import { FC, useEffect } from "react";
import { Box, Heading } from "grommet";
import { Modal } from "../../common/Modal";
import { InfoCard } from "../../common/InfoCard";
import { useAppSelector } from "../../reduxConfigurations/hooks";
import { filter } from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { homeSubheading } from ".";
import {
  saveHome,
  unsaveHome,
} from "../../reduxConfigurations/homes/homesSlice";
import { useDispatch } from "react-redux";
import { saveLot, unsaveLot } from "../../reduxConfigurations/lots/lotsSlice";
import { lotSubheading } from "../Lots";
import { getCompatibleEntities as getCompatibleLots } from "../../reduxConfigurations/combinations/combinationsSlice";

export const HomePlanModal: FC = () => {
  const history = useHistory();
  const { state: locationState } = useLocation() as any;
  const dispatch = useDispatch();
  const homes = useAppSelector((state) => state.homes.value);
  const lots = useAppSelector((state) => state.lots.value);
  const combinations = useAppSelector((state) => state.combinations.value);

  const currentHome = homes.find(
    (home) => home.homePlanId === locationState.homePlanId
  );

  useEffect(() => {
    if (currentHome) {
      dispatch(
        getCompatibleLots({
          id: currentHome.homePlanId,
          entityType: "homePlan",
        })
      );
    }
  }, []);

  const compatibleCombinations = combinations
    .filter((combo) => combo.compatible)
    .map((combo) => combo.lotId);
  const compatibleLots = filter(lots, (o) =>
    compatibleCombinations.includes(o.lotId)
  );

  if (!currentHome) return null;

  return (
    <Modal
      isOpen
      onCloseModal={() => history.push("/homes")}
      style={{
        content: {
          width: "75%",
          margin: "0 auto",
          borderRadius: "5px",
          borderColor: "transparent",
          padding: "10px",
        },
      }}
    >
      <Box direction="row">
        <Box>
          <img
            alt={`HomePlan - ${currentHome.homePlanId}`}
            src={currentHome.image}
            width="100%"
            height="100%"
          />
        </Box>
        <InfoCard
          hasHeader={false}
          key={currentHome.homePlanId}
          heading={currentHome.name}
          id={currentHome.homePlanId}
          subheading={homeSubheading(
            currentHome.numBeds,
            currentHome.numBaths,
            currentHome.sqft
          )}
          saved={currentHome.saved}
          description={currentHome.description}
          onHeartClick={() => {
            if (currentHome.saved) {
              dispatch(unsaveHome(currentHome));
            } else {
              dispatch(saveHome(currentHome));
            }
          }}
        />
      </Box>
      <Box>
        <Heading textAlign="center">Compatible Lots</Heading>
        <Box direction="row">
          {compatibleLots.map((compatibleLot) => {
            const { lotId, image, address, saved, description, acres } =
              compatibleLot;
            return (
              <InfoCard
                key={lotId}
                heading={address}
                id={lotId}
                heroImg={image}
                subheading={lotSubheading(acres)}
                saved={saved}
                description={description}
                onHeartClick={() => {
                  if (saved) {
                    dispatch(unsaveLot(compatibleLot));
                  } else {
                    dispatch(saveLot(compatibleLot));
                  }
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};
