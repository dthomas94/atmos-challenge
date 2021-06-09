import React, { FC } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter } from "grommet";
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
    <Card>
      <CardHeader direction="row">
        <img src={heroImg} />
        <Button
          icon={<Favorite color="red" />}
          hoverIndicator
          onClick={onHeartClick}
        />
      </CardHeader>
      <CardBody pad="small">
        <span>{heading}</span>
        <span>{subheading}</span>
        {tags && tags.map((tag) => <Pill text={tag} />)}
      </CardBody>
    </Card>
  );
};
