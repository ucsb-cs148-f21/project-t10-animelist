import {
  ChakraProvider,
  ColorModeScript
} from "@chakra-ui/react";
import theme from "./Theme";

export const Chakra = ({ children }) => {

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      {children}
    </ChakraProvider>
  )
}

export default Chakra;