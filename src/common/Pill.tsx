import { Box } from "grommet";
import { FC } from "react";

interface PillProps {
  text: string;
  borderColor?: string;
}

export const Pill: FC<PillProps> = ({ text, borderColor = "light-3" }) => (
  <Box
    round="small"
    pad={{ horizontal: "medium", vertical: "small" }}
    border={{ color: borderColor }}
  >
    {text}
  </Box>
);
