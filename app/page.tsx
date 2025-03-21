"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import Menu from "@/app/components/Menu";
import MenuItem from "@/app/components/MenuItem";
import Select from "@/app/components/Select";
import TopAppBar from "@/app/components/TopAppBar";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("1");

  return (
    <div>
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Page name</h1>
      </TopAppBar>
      <Select value={value} onChange={(value) => setValue(value as string)}>
        <Menu className="p-16">
          <MenuItem value="1">นักเรียน/นักศึกษา</MenuItem>
          <MenuItem value="2">นักศึกษาต่างมหาลัย</MenuItem>
          <MenuItem value="3">นิสิตปัจจุบัน</MenuItem>
        </Menu>
      </Select>
    </div>
  );
}
