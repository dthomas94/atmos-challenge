import { Box, Heading } from "grommet";
import { FC, useEffect, useState } from "react";
import { InfoCard } from "../common/InfoCard";
import { Modal } from "../common/Modal";
import { getCompatibleEntities as getCompatibleHomes } from "../reduxConfigurations/combinations/combinationsSlice";
import { useAppDispatch, useAppSelector } from "../reduxConfigurations/hooks";
import {
  ModifiedLot,
  saveLot,
  unsaveLot,
} from "../reduxConfigurations/lots/lotsSlice";
import { acresToSquareFeet } from "../utils/dimensions";
import { filter } from "lodash";
import { saveHome, unsaveHome } from "../reduxConfigurations/homes/homesSlice";
import { homeSubheading } from "./Homes";
import { useHistory } from "react-router-dom";

export const lotSubheading = (acres: number) =>
  `${acres} acres - ${acresToSquareFeet(acres).toLocaleString()} sqft`;

export const Lots: FC = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const lots = useAppSelector((state) => state.lots.value);
  const homes = useAppSelector((state) => state.homes.value);
  const combinations = useAppSelector((state) => state.combinations.value);

  const compatibleCombinations = combinations
    .filter((combo) => combo.compatible)
    .map((combo) => combo.homePlanId);
  const compatibleHomes = filter(homes, (o) =>
    compatibleCombinations.includes(o.homePlanId)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lotCurrentlyViewing, setLotCurrentlyViewing] =
    useState<undefined | ModifiedLot>(undefined);

  const openModal = (lot: ModifiedLot) => {
    history.push(`?lotId=${lot.lotId}`);
    setIsModalOpen(true);
    setLotCurrentlyViewing(() => {
      dispatch(getCompatibleHomes({ id: lot.lotId, entityType: "lot" }));
      return lot;
    });
  };

  const closeModal = () => {
    history.push(`/lots`);
    setIsModalOpen(false);
    setLotCurrentlyViewing(undefined);
  };

  console.log(lots);

  return (
    <Box direction="row-responsive" wrap style={{ columnGap: 20 }}>
      {lots.map((currentLot) => {
        const { lotId, image, address, saved, description, acres } = currentLot;
        return (
          <InfoCard
            onCardClick={() => openModal(currentLot)}
            key={lotId}
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
        );
      })}

      {!!lotCurrentlyViewing && (
        <Modal
          isOpen={isModalOpen}
          onCloseModal={closeModal}
          style={{
            content: { width: "75%", margin: "0 auto" },
          }}
        >
          <Box direction="row" justify="center">
            <Box>
              <img src={lotCurrentlyViewing.image} width="100%" height="100%" />
            </Box>
            <InfoCard
              hasHeader={false}
              key={lotCurrentlyViewing.lotId}
              heading={lotCurrentlyViewing.address}
              id={lotCurrentlyViewing.lotId}
              subheading={lotSubheading(lotCurrentlyViewing.acres)}
              saved={lotCurrentlyViewing.saved}
              description={lotCurrentlyViewing.description}
              onHeartClick={() => {
                if (lotCurrentlyViewing.saved) {
                  dispatch(unsaveLot(lotCurrentlyViewing));
                } else {
                  dispatch(saveLot(lotCurrentlyViewing));
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
      )}
    </Box>
  );
};
