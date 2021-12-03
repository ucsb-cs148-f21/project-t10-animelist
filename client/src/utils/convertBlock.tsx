import { BlockInput } from "../generated/graphql";

const convertBlockToBlockInput = (block) => {
  let convertedBlock: BlockInput = {
    width: block.width,
    type: block.type,
  };

  // need to manually copy fields to remove __typename field
  if (block.__typename === "UserListBlock") {
    convertedBlock.userListBlockInput = {
      listId: block.userListBlockInput.listId,
      maxEntries: block.userListBlockInput.maxEntries
    };
  } else if (block.__typename === "TextBlock") {
    convertedBlock.textBlockInput = {
      text: block.textBlockInput.text
    }
  }

  return convertedBlock;
}

export { convertBlockToBlockInput };