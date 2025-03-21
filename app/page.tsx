"use client";
import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import TopAppBar from "@/app/components/TopAppBar";
import MenuItem from "@/app/components/MenuItem";
import Menu from "@/app/components/Menu";
import Select from "./components/Select";

export default function Home() {
  return (
    <div>
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Page name</h1>
      </TopAppBar>
      <Select value="select" onChange={() => {}}>
        <Menu className="p-16">
          <MenuItem value="1">นักเรียน/นักศึกษา</MenuItem>
          <MenuItem value="2">นักศึกษาต่างมหาลัย</MenuItem>
          <MenuItem value="3">นิสิตปัจจุบัน</MenuItem>
        </Menu>
      </Select>
    </div>
  );
}
