import NavigationCard from "@/app/home/components/NavigationCard";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Navigation: StyleableFC = ({ className, style }) => (
  <nav className={cn(`space-y-4`, className)} style={style}>
    <NavigationCard
      title="Intania Quest"
      body="เจาะลึกภาควิชาแบบจัดเต็มผ่านเวิร์กชอปสุดเข้มข้น!"
      href="/workshops"
    />
    <NavigationCard
      title="Coming Soon"
      body="ใกล้ถึงงานแล้ว ตื่นเต้นๆ ! อย่าลืมกลับมาดูทีหลังด้วยนะ"
    />
  </nav>
);

export default Navigation;
