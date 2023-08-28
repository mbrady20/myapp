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
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "npm/utils/api";
import { currentUser, useUser } from "@clerk/nextjs";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { answerState, submittedState } from "../states/recoil_state";

export default function PetQuiz() {
  const [sydCount, setSydCount] = useState(4);
  const [lokCount, setLokCount] = useState(4);
  const [stuCount, setStuCount] = useState(4);
  const [elCount, setElCount] = useState(4);

  const [validInit, setValidInit] = useState(false);
  const [submitReady, setSubmitReady] = useState(false);
  const [alertText, setAlertText] = useState<string[]>(["", "", ""]);

  const sydText = 4;
  const sydTextRef = useRef(sydText);
  const lokText = 4;
  const lokTextRef = useRef(lokText);
  const stuText = 4;
  const stuTextRef = useRef(stuText);
  const elText = 4;
  const elTextRef = useRef(elText);

  const [isSubmitted, setIsSubmitted] = useRecoilState(submittedState);
  const [answer, setAnswer] = useRecoilState(answerState);

  const router = useRouter();
  const mutation = api.example.post.useMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState("");

  function submitButton() {
    if (
      sydTextRef.current == lokTextRef.current ||
      sydTextRef.current == stuTextRef.current ||
      sydTextRef.current == elTextRef.current ||
      lokTextRef.current == stuTextRef.current ||
      lokTextRef.current == elTextRef.current ||
      stuTextRef.current == elTextRef.current
    ) {
      setSubmitReady(false);
      setAlertText([
        "Please make sure you've given each pet a different ranking",
        "",
      ]);
    } else {
      setSubmitReady(true);
      setAlertText([
        "Do you want to submit this ranking?",
        `Sydney: ${sydTextRef.current}\nLoki: ${lokTextRef.current}\nStuart: ${stuTextRef.current}\nEl Gato: ${elTextRef.current}`,
      ]);
    }
    onOpen();
  }


  async function submitPost() {
    console.log(answer);
    console.log(sydTextRef.current);
    mutation.mutate({
      sydneyRank: sydTextRef.current,
      lokiRank: lokTextRef.current,
      stuartRank: stuTextRef.current,
      elGatoRank: elTextRef.current,
      initials: input,
    });
    setAnswer({
      syd: sydTextRef.current,
      lok: lokTextRef.current,
      stu: stuTextRef.current,
      el: elTextRef.current,
    });
    setIsSubmitted(true);
    await router.push("/petQuizData");
  }

  useEffect(() => {
    validityCheck();
  }, [input]);
  function validityCheck() {
    if (/^[A-Za-z]{2,3}$/.test(input)) setValidInit(true);
    else setValidInit(false);

    console.log(validInit);
    console.log(input);
  }
  function sydneyClick() {
    if (!isSubmitted) {
      setSydCount(sydCount + 1);

      sydTextRef.current = (sydCount % 4) + 1;
    }
  }

  function lokClick() {
    if (!isSubmitted) {
      setLokCount(lokCount + 1);

      lokTextRef.current = (lokCount % 4) + 1;
    }
  }

  function stuClick() {
    if (!isSubmitted) {
      setStuCount(stuCount + 1);

      stuTextRef.current = (stuCount % 4) + 1;
    }
  }

  function elClick() {
    if (!isSubmitted) {
      setElCount(elCount + 1);

      elTextRef.current = (elCount % 4) + 1;
    }
  }

  function columns() {
    if (submitReady) return 2;
    else return 1;
  }

  function sydImageCaptionNumber() {
    if (isSubmitted) return answer.syd;
    else return sydTextRef.current;
  }

  function lokImageCaptionNumber() {
    if (isSubmitted) return answer.lok;
    else return lokTextRef.current;
  }

  function stuImageCaptionNumber() {
    if (isSubmitted) return answer.stu;
    else return stuTextRef.current;
  }

  function elImageCaptionNumber() {
    if (isSubmitted) return answer.el;
    else return elTextRef.current;
  }
  return (
    <Container minWidth={"90vw"}>
      {!isSubmitted && (
        <div>
          <Center paddingBottom={"10px"} paddingTop={"20px"}>
            <Text fontSize={"4xl"} as={"b"}>
              Which pet is the cutest?
            </Text>
          </Center>
          <Center paddingBottom={"15px"}>
            <Text fontSize={"2xl"} textColor={"gray"}>
              Click on the images below to rank these pets.
            </Text>
          </Center>
        </div>
      )}
      {isSubmitted && (
        <Center paddingBottom={"30px"} paddingTop={"20px"}>
          <Text fontSize={"4xl"} as={"b"}>
            Your Ranking!
          </Text>
        </Center>
      )}
      <Center>
        <SimpleGrid columns={2} spacing={10}>
          <GridItem rowSpan={1}>
            <button onClick={() => sydneyClick()}>
              <Image
                src="/sydney2.png"
                width={150}
                height={80}
                alt="Sydney"
              ></Image>
            </button>
            <Text>Sydney: {sydImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => lokClick()}>
              <Image
                src="/loki.jpeg"
                width={150}
                height={80}
                alt="Loki"
              ></Image>
            </button>
            <Text>Loki: {lokImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => stuClick()}>
              <Image
                src="/stuart.png"
                width={150}
                height={80}
                alt="Stuart"
              ></Image>
            </button>
            <Text>Stuart: {stuImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem>
            <button onClick={() => elClick()}>
              <Image
                src="/elgato.png"
                width={150}
                height={80}
                alt="El Gato"
              ></Image>
            </button>
            <Text>El Gato {elImageCaptionNumber()}</Text>
          </GridItem>
          <GridItem colSpan={2}></GridItem>
        </SimpleGrid>
      </Center>
      <Center>
        {!isSubmitted && <Button onClick={submitButton}>Submit!</Button>}
        {!!isSubmitted && (
          <Button onClick={() => router.push("petQuizData")}>
            View Results!
          </Button>
        )}
      </Center>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text>{alertText[0]}
             </Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>{alertText[1]}</Text>
              {!!submitReady && (
                <FormControl>
                  <FormLabel>Please Enter Your Initials!</FormLabel>
                  <Input
                    placeholder="JMS"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value.toLocaleUpperCase);
                    }}
                    isInvalid={validInit}
                  ></Input>
 
                </FormControl>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <SimpleGrid columns={columns()} spacing={5}>
                <Button ref={cancelRef} onClick={onClose}>
                  Change my answer!
                </Button>
                {submitReady && (
                  <Button
                    colorScheme="telegram"
                    onClick={submitPost}
                    isDisabled={!validInit}
                  >
                    Submit!
                  </Button>
                )}
              </SimpleGrid>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
