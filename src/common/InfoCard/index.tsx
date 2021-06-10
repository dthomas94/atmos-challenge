import React, { FC } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Text,
  Box,
  Heading,
} from "grommet";
import { Favorite } from "grommet-icons";
import { Pill } from "../Pill";
import "./InfoCard.scss";
import cn from "classnames";

interface InfoCardProps {
  id: number;
  heroImg?: string;
  heading: string;
  subheading: string;
  tags?: Array<string>;
  description: string;
  onHeartClick: () => void;
  saved: boolean;
  onCardClick?: () => void;
  hasHeader?: boolean;
}

export const InfoCard: FC<InfoCardProps> = ({
  id,
  heroImg,
  heading,
  subheading,
  tags,
  description,
  saved,
  onHeartClick,
  onCardClick,
  hasHeader = true,
}) => {
  return (
    <Card
      pad="small"
      style={{ width: "100%", maxWidth: 500 }}
      onClick={onCardClick}
      className={cn("infoCard", hasHeader && "has-header", tags && "has-tags")}
    >
      {hasHeader && (
        <CardHeader className="infoCardHeader" direction="row" gap="none">
          <Box className="img-hero-container" direction="row" justify="center">
            <img alt="hero" height="100%" width="100%" src={heroImg} />
          </Box>
          <Button
            className="heartButton"
            icon={<Favorite color={saved ? "red" : "black"} />}
            hoverIndicator
            alignSelf="start"
            onClick={(e) => {
              e.preventDefault();
              onHeartClick();
            }}
          />
        </CardHeader>
      )}
      <CardBody className="infoCardBody" pad="small">
        <Box className="infoCardBodyTop">
          <Heading className="infoCardBodyHeading" responsive size="small">
            {heading}
          </Heading>
          <Text>{subheading}</Text>

          {tags && (
            <Box className="tags">
              {tags.map((tag) => (
                <Pill key={tag} text={tag} />
              ))}
            </Box>
          )}
        </Box>
        <Box className="infoCardBodyBottom">
          <Text>{description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};
