import { AggregateDataView } from "@/components/aggregate/AggregateDataView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aggregate Data | Buddha Shanti Municipality Survey",
  description:
    "View and analyze aggregated survey data for Buddha Shanti Municipality",
};

export default function AggregatePage() {
  return <AggregateDataView />;
}
