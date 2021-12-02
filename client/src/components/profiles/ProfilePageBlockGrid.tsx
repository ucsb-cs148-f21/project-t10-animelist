import { Grid } from "@chakra-ui/react";
import React from "react";
import { Block } from "../../generated/graphql";
import ProfilePageBlock from "./ProfilePageBlock";

interface Props {
  blocks: Block[][];
}

const ProfilePageBlockGrid: React.FC<Props> = ({ blocks }) => {
  return (
    <Grid
      width="100%"
      templateRows='repeat(2, auto)'
      gap={4}
    >
      {
        blocks.map(row =>
          <div>{row.map(block => <ProfilePageBlock block={block} />)}</div>
        )
      }
    </Grid>
  );
}

export default ProfilePageBlockGrid;