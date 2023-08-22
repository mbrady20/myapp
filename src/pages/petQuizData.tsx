import { api } from "npm/utils/api";

export default function PetQuizData() {

    const { data } = api.example.getAll.useQuery();
    return(
        <div>

        </div>
    )
}