import { Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";

export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();
    return(
        <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
            <Card>
{/*                {data?.map(data.)}
 */}            </Card>
        </Container>
    )
}