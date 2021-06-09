import { Box, Heading } from "grommet";
import { FC, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../reduxConfigurations/hooks";
import { InfoCard } from "../common/InfoCard";
import {
  ModifiedHomePlan,
  saveHome,
  unsaveHome,
} from "../reduxConfigurations/homes/homesSlice";
import { lotSubheading } from "./Lots";
import { saveLot, unsaveLot } from "../reduxConfigurations/lots/lotsSlice";
import { filter } from "lodash";
import { Modal } from "../common/Modal";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "../utils/hooks/routeHooks";
import { getCompatibleEntities as getCompatibleLots } from "../reduxConfigurations/combinations/combinationsSlice";

export const homeSubheading = (
  numBeds: number,
  numBaths: number,
  sqft: number
) => `${numBeds} beds - ${numBaths} baths - ${sqft}`;

export const Homes: FC = () => {
  let history = useHistory();
  //let query = useQuery();
  const dispatch = useAppDispatch();
  const lots = useAppSelector((state) => state.lots.value);
  const homes = useAppSelector((state) => state.homes.value);
  const combinations = useAppSelector((state) => state.combinations.value);
  const compatibleCombinations = combinations
    .filter((combo) => combo.compatible)
    .map((combo) => combo.lotId);
  const compatibleLots = filter(lots, (o) =>
    compatibleCombinations.includes(o.lotId)
  );
  const [homeCurrentlyViewing, setHomeCurrentlyViewing] =
    useState<undefined | ModifiedHomePlan>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(compatibleLots);
  const openModal = (home: ModifiedHomePlan) => {
    history.push(`?homeId=${home.homePlanId}`);
    setIsModalOpen(true);
    setHomeCurrentlyViewing(() => {
      dispatch(
        getCompatibleLots({ id: home.homePlanId, entityType: "homePlan" })
      );
      return home;
    });
  };

  const closeModal = () => {
    history.push(`/homes`);
    setIsModalOpen(false);
    setHomeCurrentlyViewing(undefined);
  };

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
          <InfoCard
            key={homePlanId}
            heading={name}
            id={homePlanId}
            heroImg={image}
            tags={tags}
            subheading={homeSubheading(numBeds, numBaths, sqft)}
            saved={saved}
            description={description}
            onCardClick={() => openModal(currentHome)}
            onHeartClick={() => {
              if (saved) {
                dispatch(unsaveHome(currentHome));
              } else {
                dispatch(saveHome(currentHome));
              }
            }}
          />
        );
      })}

      {!!homeCurrentlyViewing && (
        <Modal
          isOpen={isModalOpen}
          onCloseModal={closeModal}
          style={{
            content: { width: "75%", margin: "0 auto" },
          }}
        >
          <Box direction="row">
            <Box>
              <img
                src={homeCurrentlyViewing.image}
                width="100%"
                height="100%"
              />
            </Box>
            <InfoCard
              hasHeader={false}
              key={homeCurrentlyViewing.homePlanId}
              heading={homeCurrentlyViewing.name}
              id={homeCurrentlyViewing.homePlanId}
              subheading={homeSubheading(
                homeCurrentlyViewing.numBeds,
                homeCurrentlyViewing.numBaths,
                homeCurrentlyViewing.sqft
              )}
              saved={homeCurrentlyViewing.saved}
              description={homeCurrentlyViewing.description}
              onHeartClick={() => {
                if (homeCurrentlyViewing.saved) {
                  dispatch(unsaveHome(homeCurrentlyViewing));
                } else {
                  dispatch(saveHome(homeCurrentlyViewing));
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
      )}
    </Box>
  );
};
