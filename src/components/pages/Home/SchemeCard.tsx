import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import { Scheme } from "~/server/db/schema";

type Props = {
  schemeData: Scheme;
};

function SchemeCard({ schemeData }: Props) {
  return (
    <Link href={`${schemeData.id}`}>
      <Card className="flex items-center justify-start">
        <Image
          src={schemeData.schemeImage}
          alt={schemeData.name}
          className="m-3 h-20 rounded-md"
          width={80}
          height={80}
        />
        <div className="flex flex-col gap-1">
          <CardTitle className="font-normal">{schemeData.name}</CardTitle>
          <CardDescription>{schemeData.department}</CardDescription>
          <CardDescription className="text-xs font-bold">
            Last Date:{" "}
            <span className="font-normal">
              {schemeData.lastDate.toDateString()}
            </span>
          </CardDescription>
        </div>
      </Card>
    </Link>
  );
}

export default SchemeCard;
