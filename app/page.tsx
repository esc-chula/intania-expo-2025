"use client";

import Button from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import Menu from "@/app/components/Menu";
import MenuItem from "@/app/components/MenuItem";
import Select from "@/app/components/Select";
import TopAppBar from "@/app/components/TopAppBar";
import { useState } from "react";

export default function Home() {
  const [value1, setValue1] = useState<string[]>(["เลือก"]);
  const [value2, setValue2] = useState<string[]>(["เลือก"]);

  return (
    <div>
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Page name</h1>
      </TopAppBar>
      <Select value={value1} onChange={(value) => setValue1(value as string[])}>
        <Menu className="p-16">
          <MenuItem value="นักเรียน/นักศึกษา">นักเรียน/นักศึกษา</MenuItem>
          <MenuItem value="นักศึกษาต่างมหาลัย">นักศึกษาต่างมหาลัย</MenuItem>
          <MenuItem value="นิสิตปัจจุบัน">นิสิตปัจจุบัน</MenuItem>
        </Menu>
      </Select>
      <Select value={value2} onChange={(value) => setValue2(value as string[])}>
        <Menu className="p-16">
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Menu>
      </Select>
    </div>
  );
}
