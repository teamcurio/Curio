import React, { useRef, useEffect } from "react";
import { Box, Button, Spacer, Stack, useColorMode, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { StarIcon } from "@chakra-ui/icons"
import NavBar from './NavBar';


const fadeIn = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
  `;

// const arr = [
//   { show: "block", url: "https://source.unsplash.com/WLUHO9A_xik/1440x960" },
//   { show: "none", url: "https://source.unsplash.com/DNE9iZ1Kqzk/1440x960" },
//   { show: "none", url: "https://source.unsplash.com/6ccJQ5qPFvY/1440x960" },
//   { show: "none", url: "https://source.unsplash.com/qTLyiHW1nIc/1440x960" },
//   { show: "none", url: "https://source.unsplash.com/fxX__3GRtsg/1440x960" }
// ];
const ImageContainer = (props) => {
  console.log(props);

  const arr = props.imgArr

  const [value, setValue] = React.useState(1);
  const [delay, setDelay] = React.useState(5000);

  const { colorMode, toggleColorMode } = useColorMode();

  const handleChange = e => {
    if (e.target.id === "+") {
      value === 4 ? setValue(0) : setValue(value + 1);
      arr.map(i => {
        return (i.show = "none");
      });
      arr[value].show = "block";
    } else {
      console.log(value - 1);
      if (value - 1 === -1) {
        setValue(4);
      } else {
        setValue(value - 1);
      }
      arr.map(i => {
        return (i.show = "none");
      });
      arr[value].show = "block";
    }
  };
  useInterval(() => {
    // Your custom logic here
    value === 4 ? setValue(1) : setValue(value + 1);
    arr.map(i => {
      return (i.show = "none");
    });
    arr[value].show = "block";
  }, delay);
  return (
    <>
    <NavBar />
      <div>
        <Text align='center' mt='40px' color='black'>Title</Text>
      </div>
      <Stack direction={['column, row']} spacing='24px'>
        <Spacer></Spacer>
        <button style={{ outline: 'none' }} onClick={handleChange} id="-">{`<<<`}</button>
        <Spacer></Spacer>
        {arr.map((item, key) => {
          return (
            <Box
              backgroundColor="#222"
              backgroundImage={`url(${item.url})`}
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              width="80vw"
              height="60vh"
              animation={`${fadeIn} ease 3s`}
              display={item.show}
              key={key}
              mt='10px'
              ml='auto'
              mr='auto'
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backdropFilter: "contrast(.8)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "inherit",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {/* <div style={{ color: "#fff" }}>hola</div>
                  <div style={{ color: "#fff" }}>hola</div> */}
                </div>
              </div>
            </Box>
          );
        })}
        <Spacer></Spacer>
        <button style={{ outline: 'none' }} onClick={handleChange} id="+">
          {`>>>`}{" "}
        </button>
        <Spacer></Spacer>
      </Stack>
      <Box backgroundColor="white"
        border='1px solid black'
        backgroundSize="cover"
        width="80vw"
        height="21vh"
        mt='10px'
        ml='auto'
        mr='auto'>
        <VStack>
          <Text align='center'>Artist</Text>
          <Text align='center'>Date</Text>
          <Text align='center'>Description</Text>
        </VStack>
        <HStack justifyContent='space-between'>
          <Button align='left' onClick={toggleColorMode}>
            Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
          </Button>
          {/* <Spacer></Spacer>
          <Spcaer></Spcaer> */}
          <IconButton aria-label="favorite" icon={<StarIcon />} />
          {/* </Button> */}
        </HStack>
      </Box>
    </>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


export default ImageContainer;