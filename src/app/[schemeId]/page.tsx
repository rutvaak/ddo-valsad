import SchemeDetails from "~/components/pages/SchemePage/SchemeDetails";
import SchemeHeader from "~/components/pages/SchemePage/SchemeHeader";
import AddToRecent from "~/components/pages/shared/AddToRecent";
import BackButton from "~/components/pages/shared/BackButton";
import { api } from "~/trpc/server";

type Props = {
  params: {
    schemeId: string;
  };
};

async function page({ params }: Props) {
  const scheme = await api.scheme.getScheme.query({
    schemeId: params.schemeId,
  });
  if (!scheme) {
    return <p>404 - Scheme Not Found</p>;
  }

  return (
    <div>
      <AddToRecent schemeData={scheme} />
      <div className="bg-primary px-5 py-3">
        <BackButton className="h-6 w-6 text-primary-foreground" />
        <div className="mb-2 mt-3">
          <SchemeHeader schemeData={scheme} />
        </div>
      </div>
      <div className="container">
        <SchemeDetails schemeData={scheme} />
      </div>
    </div>
  );
}

export default page;
