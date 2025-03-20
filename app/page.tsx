import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";

export default function Home() {
  return (
    <div>
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Page name</h1>
      </TopAppBar>
    </div>
  );
}