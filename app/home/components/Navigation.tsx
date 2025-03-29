import NavigationCard from "@/app/home/components/NavigationCard";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";

const Navigation: StyleableFC = ({ className, style }) => (
  <nav className={cn(`space-y-4`, className)} style={style}>
    <NavigationCard
      title="Explore the map"
      body="คณะวิศวะมีตึกอะไรบ้าง น่าตาเป็นยังไง มีโซนอะไรบ้าง มาดูกันเลย!"
      href="/map"
    />
    <NavigationCard
      title="Activity schedule"
      body="เวทีกลางเรามีกิจกรรมตลอดทั้งวัน ทั้งสนุก ทั้งสาระ!"
      href="/schedule"
    />
    <NavigationCard
      title="Intania Quest"
      body="เจาะลึกภาควิชาแบบจัดเต็มผ่านเวิร์กชอปสุดเข้มข้น!"
      href="/quest"
    />
    <NavigationCard
      title="Intania Arena"
      body="เตรียมพบกับสุดยอด 5 การแข่งขันปลุกพลังแห่งนักวิศวะ!"
      href="/arena"
    />
    <NavigationCard
      title="Find your major"
      body="แต่ละภาควิชาเรียนอะไร มีสาขาอะไรบ้าง มาเลือก “ดวงดาว” ที่ใช่กันเถอะ!"
      href="/majors"
    />
  </nav>
);

export default Navigation;
