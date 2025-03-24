import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import Ticket from "@/app/ticket/components/Ticket";
import VisitorFactory from "@/lib/models/VisitorFactory";
import { cookies } from "next/headers";

export default async function HomeTicket() {
  const { data: visitor } = await VisitorFactory.fetchFromCookies(
    await cookies(),
  );
  console.log(visitor);

  return (
    <div className="grid h-svh place-content-center">
      <TopAppBar appearance="minimal">
        <Button appearance="text" href="/home">
          <Icon name="arrow_back" />
        </Button>
      </TopAppBar>
      {visitor && <Ticket visitor={visitor} />}
    </div>
  );
}
