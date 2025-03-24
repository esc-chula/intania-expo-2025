"use client";

import Button from "@/app/components/Button";
import Field from "@/app/components/Field";
import FormItem from "@/app/components/FormItem";
import MenuItem from "@/app/components/MenuItem";
import Select from "@/app/components/Select";
import cn from "@/lib/helpers/cn";
import Major from "@/lib/models/Major";
import Province from "@/lib/models/Province";
import StudentVisitor from "@/lib/models/StudentVisitor";
import Visitor, { GENDER, VISITOR_CATEGORY } from "@/lib/models/Visitor";
import VisitorFactory from "@/lib/models/VisitorFactory";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";
import { list } from "radash";
import { useState } from "react";

/** A form for registering to the Intania Expo 2025. */
const RegisterForm: StyleableFC<{
  email?: string;
}> = ({ email, className, style }) => {
  const router = useRouter();

  const [category, setCategory] = useState<VISITOR_CATEGORY | null>(null);
  const [loading, setLoading] = useState(false);

  /** Create a new Visitor instance and save it to the database. */
  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    try {
      const visitor = VisitorFactory.fromData(data);
      const { ok } = await visitor.save();
      if (ok) {
        router.push("/home");
        return;
      }
    } catch (_) {}
    setLoading(false);
    router.push("/terms");
  }

  return (
    <form
      action={handleSubmit}
      className={cn(
        `[&_h2]:text-title-md [&_h2]:leading-title-md space-y-6
        transition-opacity *:space-y-3 [&_h2]:text-center [&_h2]:font-bold
        [&_h2]:italic`,
        loading && `opacity-25 [&_.iex-select_.grow]:opacity-0`,
        className,
      )}
      style={style}
    >
      <section aria-label="ข้อมูลส่วนตัว">
        <FormItem label="ชื่อ">
          <Field name="name" required />
        </FormItem>
        <FormItem label="นามสกุล">
          <Field name="surname" required />
        </FormItem>
        <FormItem label="เพศสภาพ">
          <Select name="gender" required>
            {Object.values(GENDER).map((gender) => (
              <MenuItem key={gender} value={gender}>
                {Visitor.getGenderDisplayName(gender)}
              </MenuItem>
            ))}
          </Select>
        </FormItem>
        <FormItem label="ประเภท">
          <Select
            name="category"
            required
            onChange={([category]) => setCategory(category as VISITOR_CATEGORY)}
          >
            {Object.values(VISITOR_CATEGORY).map((category) => (
              <MenuItem key={category} value={category}>
                {Visitor.getCategoryDisplayName(category)}
              </MenuItem>
            ))}
          </Select>
        </FormItem>
      </section>

      <section aria-labelledby="h-contacts">
        <h2 id="h-contacts">ช่องทางการติดต่อ</h2>
        <FormItem label="อีเมล">
          <Field name="email" type="email" value={email} readOnly />
        </FormItem>
        <FormItem label="เบอร์โทรศัพท์">
          <Field name="phone" type="tel" required />
        </FormItem>
        {category === VISITOR_CATEGORY.Student && (
          <FormItem label="เบอร์ติดต่อฉุกเฉิน">
            <Field name="emergencyContact" type="tel" required />
          </FormItem>
        )}
      </section>

      {category === VISITOR_CATEGORY.Student && (
        <section aria-labelledby="h-student">
          <h2 id="h-student">ข้อมูลนักเรียน</h2>
          <FormItem label="ระดับชั้น ปี ‘67">
            <Select name="studentLevel" required>
              {list(1, 6)
                .toReversed()
                .map((level) => (
                  <MenuItem key={level} value={level.toString()}>
                    {`ม.${level} หรือเทียบเท่า (dek${74 - level})`}
                  </MenuItem>
                ))}
            </Select>
          </FormItem>
          <FormItem label="สาย (ม.ปลาย)">
            <Select name="studyStream">
              {Object.entries(StudentVisitor.STUDY_STREAMS).map(
                ([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormItem>
          <FormItem label="โรงเรียน">
            <Field name="school" required />
          </FormItem>
          <FormItem label="จังหวัด">
            <Select name="province" required>
              {Province.ALL.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormItem>
        </section>
      )}

      {category === VISITOR_CATEGORY.Student && (
        <section aria-labelledby="h-interest">
          <h2 id="h-interest">ความสนใจในวิศวะจุฬาฯ</h2>
          <FormItem label="สาขาที่สนใจ">
            <Select
              name="interestedFields"
              required
              maxChoices={Major.all.length}
            >
              {Major.all.map((major) => (
                <MenuItem key={major.slug} value={major.slug.toUpperCase()}>
                  {major.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormItem>
          <FormItem label="อันดับที่จะใส่ใน TCAS">
            <Field
              name="interestLevel"
              type="number"
              min={1}
              max={10}
              required
            />
          </FormItem>
        </section>
      )}

      {category === VISITOR_CATEGORY.Intania && (
        <section aria-labelledby="h-alumni">
          <h2 id="h-alumni">ข้อมูลนิสิตปัจจุบัน/นิสิตเก่า</h2>
          <FormItem label="ปีที่จบ/จะจบ (วศ.)">
            <Field name="alumniBatch" type="number" min={2500} required />
          </FormItem>
        </section>
      )}

      {category === VISITOR_CATEGORY.University && (
        <section aria-labelledby="h-university">
          <h2 id="h-university">ข้อมูลนิสิตจากมหาลัยอื่น</h2>
          <FormItem label="ชั้นปี">
            <Select name="universityYear" required>
              {list(1, 4).map((year) => (
                <MenuItem key={year} value={year.toString()}>
                  {`ปี ${year}`}
                </MenuItem>
              ))}
              <MenuItem value="OTHER">อื่น ๆ</MenuItem>
            </Select>
          </FormItem>
          <FormItem label="คณะ">
            <Field name="faculty" required />
          </FormItem>
          <FormItem label="มหาวิทยาลัย">
            <Field name="university" required />
          </FormItem>
        </section>
      )}

      {category === VISITOR_CATEGORY.Teacher && (
        <section aria-labelledby="h-teacher">
          <h2 id="h-teacher">ข้อมูลครู</h2>
          <FormItem label="โรงเรียน">
            <Field name="school" required />
          </FormItem>
          <FormItem label="จังหวัด">
            <Select name="province" required>
              {Province.ALL.map((province) => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormItem>
          <FormItem label="วิชาที่สอน">
            <Field name="subjectTaught" required />
          </FormItem>
        </section>
      )}

      <section aria-labelledby="h-expo">
        <h2 id="h-expo">Intania Expo 2025</h2>
        <FormItem label="วันที่เข้าร่วมงาน">
          <Select name="visitDate" required maxChoices={3}>
            <MenuItem value="2025-03-28">ศุกร์ 28 มีนาคม 2568</MenuItem>
            <MenuItem value="2025-03-29">เสาร์ 29 มีนาคม 2568</MenuItem>
            <MenuItem value="2025-03-30">อาทิตย์ 30 มีนาคม 2568</MenuItem>
          </Select>
        </FormItem>
        <FormItem label="กิจกรรมที่สนใจ">
          <Select
            name="interestedActivities"
            required
            maxChoices={Object.keys(Visitor.INTERESTED_ACTIVITIES).length}
          >
            {Object.entries(Visitor.INTERESTED_ACTIVITIES).map(
              ([value, label]) =>
                // Only show workshop to students
                (value !== "WOKRSHOP" ||
                  category === VISITOR_CATEGORY.Student) && (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ),
            )}
          </Select>
        </FormItem>
        <FormItem label="ช่องทางที่รู้จักงานนี้">
          <Select
            name="referralSource"
            required
            maxChoices={Object.keys(Visitor.REFERRAL_SOURCES).length}
          >
            {Object.entries(Visitor.REFERRAL_SOURCES).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormItem>
      </section>

      <section className="grid place-items-center pt-3">
        <Button appearance="tonal" type="submit">
          สมัครเลย
        </Button>
      </section>
    </form>
  );
};

export default RegisterForm;
