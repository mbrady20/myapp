"use client";
import { Button, Card, Container, Grid, GridItem } from "@chakra-ui/react";
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
  let sydCount = 0;
  let lokCount = 0;
  let stuCount = 0;
  let elCount = 0;
  let count = 0;

  useEffect(() => {
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
      total: (elRank / totRank) * 100,
    },
  ];

  return (
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={0}
      >
        <GridItem colSpan={1} height={"100vh"} bg="blue.100"></GridItem>
        <GridItem colSpan={9} height={"80vh"}>
          <ResponsiveContainer>
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
        </GridItem>
      </Grid>
  );
}
