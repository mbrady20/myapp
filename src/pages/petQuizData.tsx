"use client";
import { Button, Card, Container } from "@chakra-ui/react";
import { api } from "npm/utils/api";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function PetQuizData() {
  const { data } = api.example.getAll.useQuery();
  const [sydRank, setSydRank] = useState(0);
  const [lokRank, setLokRank] = useState(0);
  const [stuRank, setStuRank] = useState(0);
  const [elRank, setElRank] = useState(0);
  const [totRank, setTotRank] = useState(0);
  var sydCount;
  var lokCount;
  var stuCount;
  var elCount;

  useEffect(() => {
    let sydCount = 0;
    let lokCount = 0;
    let stuCount = 0;
    let elCount = 0;
    let count = 0;
    data?.forEach(
      (element: {
        sydneyRank: number;
        lokiRank: number;
        stuartRank: number;
        elGatoRank: number;
      }) => {
        count = count + 4;
        sydCount = 5 - element.sydneyRank + sydCount;
        lokCount = 5 - element.lokiRank + lokCount;
        stuCount = 5 - element.stuartRank + stuCount;
        elCount = 5 - element.elGatoRank + elCount;
      }
    );
    setSydRank(sydCount);
    setLokRank(lokCount);
    setStuRank(stuCount);
    setElRank(elCount);
    setTotRank(count);
  }, [data]);

  const data1 = [
    {
      name: "Sydney",
      total: (sydRank / totRank) * 100,
    },
    {
      name: "Loki",
      total: (lokRank / totRank) * 100,
    },
    {
      name: "Stuart",
      total: (stuRank / totRank) * 100,
    },
    {
      name: "El Gato",
      total: (elRank / totRank) * 100
    },
  ];
  function func() {
    console.log(data);
    console.log(data1);
    }
    

  return (
    <Container bg="blue.50" minWidth={"100vw"} minHeight={"100vh"}>
        <Button onClick={func}></Button>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={data1}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `%${value}`}
          />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}
