import { Button, Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";

export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();

    function func()  {
        console.log(data);
    }
    return(
        <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
            <Button onClick={func}></Button>
        </Container>
    )
}