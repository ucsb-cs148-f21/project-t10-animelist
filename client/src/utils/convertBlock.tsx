import _ from "lodash";
import { BlockInput } from "../generated/graphql";

// recursively remove __typename and additionalData fields since those fields are not present in
// the BlockInput type
const removeExtraneousFields = (obj) => {
  for (const property in obj) {
    if (property === '__typename' || property === 'additionalData') {
      delete obj[property];
    } else if (typeof obj[property] === 'object' && obj[property] != null) {
      removeExtraneousFields(obj[property]);
    }
  }
}

const convertBlockToBlockInput = (block) => {
  let convertedBlock: BlockInput = _.cloneDeep(block);
  removeExtraneousFields(convertedBlock);
  return convertedBlock;
}

export { convertBlockToBlockInput };