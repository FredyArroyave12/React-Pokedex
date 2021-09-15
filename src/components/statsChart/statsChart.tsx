import React from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { Bar } from 'react-chartjs-2';

interface baseStat {
  value: string | number;
  index: number;
  array: string[];
}
interface pokemons {
  id: number;
  stats: string[];
  name: string;
  url: string;
}
const StatsChart = (props: {
  pokemonData: {
    pokemons: pokemons[];
    firstPokemon: number;
    secondPokemon: number;
    isComparing: boolean;
  };
}) => {
  const firstPokemon =
    props.pokemonData.pokemons[props.pokemonData.firstPokemon];
  const secondPokemon =
    props.pokemonData.pokemons[props.pokemonData.secondPokemon];

  const datasetKeyProvider = () => {
    let key = 'chart_' + firstPokemon.id;
    if (secondPokemon) {
      key += '_' + secondPokemon.id;
    }
    return key;
  };

  const data = {
    labels: firstPokemon.stats.map(({ stat }: baseStat[]) => stat.name),
    datasets: [
      {
        label: firstPokemon.name,
        data: firstPokemon.stats.map(({ base_stat }: baseStat[]) => base_stat),
        backgroundColor: '#008080',
        borderWidth: 3,
        hidden: false,
      },
    ],
  };

  if (props.pokemonData.isComparing) {
    data.datasets = [
      ...data.datasets,
      {
        label: secondPokemon.name,
        data: secondPokemon.stats.map(({ base_stat }: baseStat[]) => base_stat),
        backgroundColor: '#3F26BF',
        borderWidth: 3,
        hidden: !props.pokemonData.isComparing,
      },
    ];
  }

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  return (
    <div className=" w-80 md:w-96">
      <Bar
        id="stats_chart"
        data={data}
        options={options}
        datasetKeyProvider={() => datasetKeyProvider}
      />
    </div>
  );
};

const mapStateToProps = (state: RootStateOrAny) => {
  return state;
};

export default connect(mapStateToProps)(StatsChart);
