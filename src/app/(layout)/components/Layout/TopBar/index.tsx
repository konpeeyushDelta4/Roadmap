"use client";
import { tv } from "tailwind-variants";
import { usePathname } from "next/navigation";
import { content } from "../../variants";
import { Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useAuth } from "../../../../../context/AuthContext";
import Avatar from "../../../../(components)/Avatar";
import { useState } from "react";
import { BiSolidExit } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import ProfileModal from "../../../../(components)/ProfileModal";
import ToggleTheme from "../../../../(components)/ToggleTheme";
import Link from "next/link";

export default function TopBar() {

  const { token, user, setLoginOpen } = useAuth();
  const pathname = usePathname();
  const [dropIt, setDropIt] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (pathname.includes("sso/success")) return <></>;

  return (
    <div  className="sticky z-20 top-0 bg-foreground-100 dark:bg-content1">
      <div className={content()}>
        {/* TOP  */}
        <div className="flex justify-between items-center h-domainNavbar">
          {/* BRAND  */}
          <div className="flex items-center">
            <Link href="/roadmap" className="font-semibold text-lg hover:text-primary transition-colors">
              YourGPT RoadMap
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <ToggleTheme />
            {token ? (
              <Popover isOpen={dropIt} onOpenChange={(open) => setDropIt(open)} showArrow offset={10}>
                <PopoverTrigger>
                  <Button isIconOnly disableRipple radius="full">
                    <Avatar name={user?.first_name || user?.username || ""} image={user?.profile_pic || ""} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <UserMenu
                    onProfile={() => setProfileOpen(true)}
                    onClose={() => {
                      setDropIt(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Button
                size="sm"
                onPress={() => {
                  setLoginOpen(true);
                }}
                className="flex"
                color="primary"
                radius="full"
              >
                Login/SignUp
              </Button>
            )}
          </div>
        </div>
      </div>
      {profileOpen && <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />}
    </div>
  );
}

const linkV = tv({
  base: "text-foreground-500 hover:text-primary font-medium py-2.5 text-small flex gap-1 px-4 transition-all rounded-t-medium",
  variants: {
    state: {
      active: "text-primary hover:text-primary bg-background",
      n: "hover:bg-background/30",
    },
  },
});

function UserMenu({ onClose, onProfile }: { onClose: () => void; onProfile: () => void }) {
  const { onLogout, user } = useAuth();
  return (
    <>
      <Listbox
        aria-label="User Menu"
        onAction={(key) => {
          onClose();
        }}
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80"
        itemClasses={{
          base: "first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 py-3  min-w-[160px] px-4",
        }}
      >
        <ListboxItem onPress={onProfile} key="editProfile" startContent={<FaEdit size={18} />}>
          {"Edit Profile"}
        </ListboxItem>

        <ListboxItem
          onPress={() => {
            onLogout();
          }}
          className="text-danger"
          color="danger"
          variant="faded"
          key="logout"
          startContent={<BiSolidExit size={18} />}
        >
          {"Logout"}
        </ListboxItem>
      </Listbox>
    </>
  );
}
