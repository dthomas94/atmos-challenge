import React, { FC } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
} from "grommet";
import { Favorite } from "grommet-icons";
import { Pill } from "./Pill";

interface InfoCardProps {
  id: number;
  heroImg: string;
  heading: string;
  subheading: string;
  tags?: Array<string>;
  description: string;
  onHeartClick: () => void;
}

export const InfoCard: FC<InfoCardProps> = ({
  id,
  heroImg,
  heading,
  subheading,
  tags,
  description,
  onHeartClick,
}) => {
  return (
    <Card pad="small" style={{ width: "100%", maxWidth: 500 }}>
      <CardHeader direction="row">
        <Box direction="row" justify="center" width="100%">
          <img height="100%" width="100%" src={heroImg} />
        </Box>
        <Button
          icon={<Favorite color="red" />}
          hoverIndicator
          alignSelf="start"
          onClick={onHeartClick}
        />
      </CardHeader>
      <CardBody pad="small">
        <Heading responsive size="small">
          {heading}
        </Heading>
        <Text>{subheading}</Text>
        {tags && (
          <Box direction="row" style={{ columnGap: 10 }}>
            {tags.map((tag) => (
              <Pill key={tag} text={tag} />
            ))}
          </Box>
        )}
        <Text>{description}</Text>
      </CardBody>
    </Card>
  );
};
