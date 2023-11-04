import Search from "~/components/pages/search/Search";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/server";

export async function page() {
  const schemes = await api.scheme.getAll.query();
  return (
    <div>
      <Search schemeData={schemes} />
    </div>
  );
}

export default page;
