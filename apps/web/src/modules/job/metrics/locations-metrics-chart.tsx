"use client";

import { COUNTRIES } from "@/lib/constants/countries";
import { BarList } from "@tremor/react";
import ReactCountryFlag from "react-country-flag";

interface LocationsMetricsChartProps {
  data: { country: string; count: number }[];
}

const LocationsMetricsChart: React.FC<LocationsMetricsChartProps> = ({
  data,
}) => {
  const countriesData = data.map(({ country, count }) => ({
    name: COUNTRIES[country] || country,
    value: count,
    icon: function CountryFlag() {
      return (
        <div className="flex items-center mr-2">
          <ReactCountryFlag countryCode={country} />
        </div>
      );
    },
  }));

  return <BarList className="mt-4" data={countriesData} />;
};

export default LocationsMetricsChart;
