"use client";
import { useProductDetail } from "../../../context/ProductProvider";
import Link from "next/link";
import { Scroll } from "lucide-react";
import { tv } from "tailwind-variants";
import { usePathname } from "next/navigation";
import { content } from "../../variants";
import { MapIcon, MegaphoneIcon } from "@heroicons/react/24/solid";
import { Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useAuth } from "../../../../../../context/AuthContext";
import Avatar from "../../../../../(components)/Avatar";
import { useEffect, useState } from "react";
import { BiSolidExit } from "react-icons/bi";
import { FaEdit, FaPen } from "react-icons/fa";
import ProfileModal from "../../../../../(components)/ProfileModal";
import { useDomainCtx } from "../../../context/DomainCtxProvider";
import { Role } from "../../../../../../types/enum";
import { DOMAIN_TOPBAR_HEIGHT } from "../../../../../../utils/ui";
import ToggleTheme from "../../../../../(components)/ToggleTheme";

export default function TopBar() {
  const { productDetail } = useProductDetail();
  const { setLoginOpen } = useDomainCtx();
  const { token, user } = useAuth();
  const pathname = usePathname();
  const [dropIt, setDropIt] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    console.log(productDetail, "productDetail");
  }, [productDetail]);

  if (pathname.includes("sso/success")) return <></>;

  return (
    <div style={{ height: DOMAIN_TOPBAR_HEIGHT + "px" }} className="sticky z-20 top-0 bg-foreground-100 dark:bg-content1  ">
      <div className={content()}>
        {/* TOP  */}
        <div className="flex justify-between items-center h-domainNavbar">
          {/* BRAND  */}
          <div className="flex gap-3 items-center">
            <img className="h-[38px] rounded-md overflow-hidden" src={productDetail?.logo_url} alt="Logo" />
            <h4 className="font-semibold  ">{productDetail?.product_detail?.title}</h4>

            {token && (Role.ADMIN === user?.role || Role.OWNER == user?.role) && (
              <a
                target="_blank"
                href={`https://epicxplorer.com/product/${productDetail.slug}/settings/general`}
                className="text-foreground-400 hover:text-foreground-800 inline-flex transition-all h-[32px] aspect-square mb-1 items-center justify-center cursor-pointer"
              >
                <FaPen />
              </a>
            )}
          </div>
          <div className="flex gap-1 items-center">
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
                onClick={() => {
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

        {/* SECONDARY  */}
        <div className="mt-2 flex">
          <div className="flex gap-2">
            {Boolean(productDetail?.product_dashboard_setting?.enable_submissions) && (
              <Link
                href="/roadmap"
                className={linkV({
                  state: pathname.includes("roadmap") ? "active" : "n",
                })}
              >
                <MapIcon height={18} />
                <span>Roadmap</span>
              </Link>
            )}
            {/* {Boolean(productDetail?.product_dashboard_setting?.enable_announcements) && (
              <Link
                href="/announcements"
                className={linkV({
                  state: pathname.includes("announcements") ? "active" : "n",
                })}
              >
                <MegaphoneIcon height={18} />
                <span>Announcements</span>
              </Link>
            )} */}
            {Boolean(productDetail?.product_dashboard_setting?.enable_changelogs) && (
              <Link
                href="/changelogs"
                className={linkV({
                  state: pathname.includes("changelogs") ? "active" : "n",
                })}
              >
                <Scroll height={18} />
                <span>Changelogs</span>
              </Link>
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
