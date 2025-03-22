"use client";

import Button from "@/app/components/Button";
import FormItem from "@/app/components/FormItem";
import Icon from "@/app/components/Icon";
import MenuItem from "@/app/components/MenuItem";
import Select from "@/app/components/Select";
import TopAppBar from "@/app/components/TopAppBar";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  return (
    <div className="pt-20 space-y-3">
      <TopAppBar>
        <Button appearance="text">
          <Icon name="arrow_back" />
        </Button>
        <h1>Page name</h1>
      </TopAppBar>
      <FormItem label="ประเภท">
        <Select value={category} onChange={setCategory}>
          <MenuItem value="student">นักเรียน/นักศึกษา</MenuItem>
          <MenuItem value="university">นักศึกษาต่างมหาลัย</MenuItem>
          <MenuItem value="cuOrAlumni">นิสิตปัจจุบัน</MenuItem>
        </Select>
      </FormItem>
      <FormItem label="สาขาที่สนใจ">
        <Select value={majors} maxChoices={null} onChange={setMajors}>
          <MenuItem value="civil">วิศวกรรมโยธา</MenuItem>
          <MenuItem value="electrical">วิศวกรรมไฟฟ้า</MenuItem>
          <MenuItem value="mechanical">วิศวกรรมเครื่องกล</MenuItem>
          <MenuItem value="automotive">วิศวกรรมยานยนต์</MenuItem>
          <MenuItem value="industrial">วิศวกรรมอุตสาหการ</MenuItem>
          <MenuItem value="environmental">วิศวกรรมสิ่งแวดล้อม</MenuItem>
          <MenuItem value="metallurgical">วิศวกรรมโลหะ</MenuItem>
          <MenuItem value="petroleum">วิศวกรรมปิโตรเลียม</MenuItem>
          <MenuItem value="nuclear">วิศวกรรมนิวเคลียร์</MenuItem>
          <MenuItem value="surveying">วิศวกรรมสำรวจ</MenuItem>
          <MenuItem value="chemical">วิศวกรรมเคมี</MenuItem>
          <MenuItem value="computer">วิศวกรรมคอมพิวเตอร์</MenuItem>
          <MenuItem value="cedt">CEDT</MenuItem>
          <MenuItem value="rai">Robotics & AI</MenuItem>
          <MenuItem value="ice">ICE</MenuItem>
          <MenuItem value="nano">NANO</MenuItem>
          <MenuItem value="adme-v">ADME-V</MenuItem>
          <MenuItem value="semi">SEMI</MenuItem>
          <MenuItem value="chpe">ChPe</MenuItem>
        </Select>
      </FormItem>
    </div>
  );
}
