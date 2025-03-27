import NavigationCard from "@/app/home/components/NavigationCard";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Navigation: StyleableFC = ({ className, style }) => (
  <nav className={cn(`space-y-4`, className)} style={style}>
    <NavigationCard
      title="Explore the Map"
      body="คณะวิศวฯ มีตึกอะไรบ้าง น่าตาเป็นยังไง มีบูทอะไรบ้าง มาดูกันเลย"
      href="/map"
    />
    <NavigationCard
      title="Intania Quest"
      body="เจาะลึกภาควิชาแบบจัดเต็มผ่านเวิร์กชอปสุดเข้มข้น!"
      href="/workshops"
    />
  </nav>
);

export default Navigation;
