import { FC, useEffect } from "react";
import { Box, Heading } from "grommet";
import { Modal } from "../../common/Modal";
import { InfoCard } from "../../common/InfoCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../reduxConfigurations/hooks";
import { filter } from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { homeSubheading } from "../HomePlans";
import {
  saveHome,
  unsaveHome,
} from "../../reduxConfigurations/homes/homesSlice";
import { saveLot, unsaveLot } from "../../reduxConfigurations/lots/lotsSlice";
import { lotSubheading } from "../Lots";
import { getCompatibleEntities as getCompatibleHomes } from "../../reduxConfigurations/combinations/combinationsSlice";

export const LotModal: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { state: locationState } = useLocation() as any;

  const homes = useAppSelector((state) => state.homes.value);
  const lots = useAppSelector((state) => state.lots.value);
  const combinations = useAppSelector((state) => state.combinations.value);

  const currentLot = lots.find((lot) => lot.lotId === locationState.lotId);

  useEffect(() => {
    if (currentLot) {
      dispatch(getCompatibleHomes({ id: currentLot.lotId, entityType: "lot" }));
    }
  }, []);

  const compatibleCombinations = combinations
    .filter((combo) => combo.compatible)
    .map((combo) => combo.homePlanId);
  const compatibleHomes = filter(homes, (o) =>
    compatibleCombinations.includes(o.homePlanId)
  );

  if (!currentLot) return null;
  return (
    <Modal
      isOpen
      onCloseModal={() => history.push("/lots")}
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
      <Box direction="row" justify="center">
        <Box>
          <img
            alt={`Lot - ${currentLot.lotId}`}
            src={currentLot.image}
            width="100%"
            height="100%"
          />
        </Box>
        <InfoCard
          hasHeader={false}
          key={currentLot.lotId}
          heading={currentLot.address}
          id={currentLot.lotId}
          subheading={lotSubheading(currentLot.acres)}
          saved={currentLot.saved}
          description={currentLot.description}
          onHeartClick={() => {
            if (currentLot.saved) {
              dispatch(unsaveLot(currentLot));
            } else {
              dispatch(saveLot(currentLot));
            }
          }}
        />
      </Box>
      <Box>
        <Heading textAlign="center">Compatible Home Plans</Heading>
        <Box direction="row">
          {compatibleHomes.map((compatibleHome) => {
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
            } = compatibleHome;
            return (
              <InfoCard
                key={homePlanId}
                heading={name}
                id={homePlanId}
                heroImg={image}
                tags={tags}
                subheading={homeSubheading(numBeds, numBaths, sqft)}
                saved={saved}
                description={description}
                onHeartClick={() => {
                  if (saved) {
                    dispatch(unsaveHome(compatibleHome));
                  } else {
                    dispatch(saveHome(compatibleHome));
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
