import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Users, Baby, Music, Church, Building2, Star, UserPlus, User, Mic2, BookOpen } from "lucide-react"

const groups = [
  { name: "Church Members", icon: Users },
  { name: "Children", icon: Baby },
  { name: "Choir", icon: Music },
  { name: "Communicants", icon: Church },
  { name: "Development", icon: Building2 },
  { name: "Elim", icon: Star },
  { name: "Kama", icon: UserPlus },
  { name: "MU", icon: User },
  { name: "Kayo", icon: User },
  { name: "PCC", icon: User },
  { name: "Praise and Worship", icon: Mic2 },
  { name: "Titus", icon: BookOpen },
]

export function Sidebar() {
  return (
    <SidebarComponent>
      <SidebarHeader>
        <h2 className="text-xl font-bold">Church Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Church Groups</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groups.map((group) => (
                <SidebarMenuItem key={group.name}>
                  <SidebarMenuButton asChild>
                    <a href={`#${group.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <group.icon className="mr-2 h-4 w-4" />
                      <span>{group.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  )
}

