import ComplaintDetailsComponent from "@/components/home/ComplaintDetailsComponent";
import { type Metadata } from "next";

export type paramsType = Promise<{ id: string }>;

type Props = {
  params: paramsType;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Complaint #${id}`,
    description: "View details of a specific complaint",
  };
}

const ComplaintDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  return <ComplaintDetailsComponent id={id} />;
};

export default ComplaintDetailsPage;
