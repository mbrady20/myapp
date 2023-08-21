import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Container,
  GridItem,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";

export default function PetQuiz() {
  const [sydCount, setSydCount] = useState(Number);
  const [lokCount, setLokCount] = useState(Number);
  const [stuCount, setStuCount] = useState(Number);
  const [elCount, setElCount] = useState(Number);
  const [sydText, setSydneyText] = useState(4);
  const [lokText, setLokiText] = useState(4);
  const [stuText, setStuText] = useState(4);
  const [elText, setElText] = useState(4);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  function submitButton() {
    console.log(sydText);
    if (
      sydText == lokText ||
      sydText == stuText ||
      sydText == elText ||
      lokText == stuText ||
      lokText == elText ||
      stuText == elText
    )
      onOpen();
  }

  function sydneyClick() {
    setSydCount(sydCount + 1);

    setSydneyText((sydCount % 4) + 1);
  }

  function lokClick() {
    setLokCount(lokCount + 1);

    setLokiText((lokCount % 4) + 1);
  }

  function stuClick() {
    setStuCount(stuCount + 1);

    setStuText((stuCount % 4) + 1);
  }

  function elClick() {
    setElCount(elCount + 1);

    setElText((elCount % 4) + 1);
  }
  return (
    <Container>
      <Center>
        <SimpleGrid columns={2} spacing={10}>
          <GridItem rowSpan={1}>
            <button onClick={() => sydneyClick()}>
              <img src="sydney.png" width={150} alt = "Sydney"></img>
            </button>
            <Text>{sydText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => lokClick()}>
              <img src="loki.png" width={150} alt = "Loki"></img>
            </button>
            <Text>{lokText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => stuClick()}>
              <img src="stuart.png" width={150} alt = "Stuart"></img>
            </button>
            <Text>{stuText}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => elClick()}>
              <img src="gato.png" width={150} alt = "El Gato"></img>
            </button>
            <Text>{elText}</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Center>
              <Button onClick={submitButton}>Submit!</Button>
            </Center>
          </GridItem>
        </SimpleGrid>
      </Center>
      <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Please make sure you've given each pet a different ranking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Change my answer!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
