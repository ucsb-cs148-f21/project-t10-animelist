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
          row.map(block => <ProfilePageBlock block={block} />)
        )
      }
    </Grid>
  );
}

export default ProfilePageBlockGrid;