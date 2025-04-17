import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { BiSolidPencil } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { getUserName } from "../../utils/helpers";
import {
  addProfilePicApi,
  removeProfilePic,
  updateUserDetailApi,
} from "../../network/api/user";
import { ApiResType } from "../../types/enum";
import { addProductApi, getSignedUrlApi } from "../../network/api/product";

export default function ProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [updating, setUpdating] = useState(false);
  const { token, user, setUser } = useAuth();
  const [updatingImage, setUpdatingImage] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setFName(user?.first_name || "");
    setLName(user?.last_name || "");
  }, [user]);

  const onImage = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageUrl(URL.createObjectURL(file));

    try {
      setUpdatingImage(true);
      const res = await getSignedUrlApi({
        token,
        file_name: file.name,
        type: "profile_pic",
      });

      if (res.type == ApiResType.SUCCESS) {
        await fetch(res.data.url, {
          method: "PUT",
          body: file,
        });
      }

      const res1 = await addProfilePicApi({
        token,
        profile_pic: res.data.path,
      });
      setUpdatingImage(false);

      if (res1.type === ApiResType.SUCCESS) {
        setUser((s) => ({ ...s, profile_pic: URL.createObjectURL(file) }));
      }

      if (res.type === ApiResType.ERROR) {
        toast.error(res.message);
      }

      e.target.value = null;
    } catch (err) {
      toast.error("Something went wrong");
      setUpdatingImage(false);
      console.log("Err", err);
    }
  };

  const onUpdate = async (e: any) => {
    e.preventDefault();
    try {
      setUpdating(true);

      const res = await updateUserDetailApi({
        token,
        first_name: fName,
        last_name: lName,
      });
      setUpdating(false);

      console.log(res?.data);
      if (res.type === ApiResType.SUCCESS) {
        setUser((s) => ({ ...s, first_name: fName, last_name: lName }));
        onClose();
      }
      if (res.type === ApiResType.ERROR) {
        toast.error(res.message);
      }
    } catch (err) {
      setUpdating(false);
      console.log("Err", err);
      toast.error("Somethng went wrong while updating");
    }
  };

  async function onRemove() {
    try {
      let res = await removeProfilePic({ token });
      if (res.type === ApiResType.SUCCESS) {
        setUser((s) => ({ ...s, profile_pic: "" }));
      }
      if (res.type === ApiResType.ERROR) {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err, "something went wrong while removing profile pic");
      toast.error("something went wrong while removing profile pic");
    }
  }

  const img = imageUrl || user?.profile_pic;

  return (
    <Modal size={"md"} isOpen={open} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            My Profile
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="flex flex-col items-center mb-2">
                <div
                  className={`bg-gray-100 ring-1 ring-gray-200 hover:ring-primary-100 h-[72px] group cursor-pointer relative aspect-square overflow-hidden rounded-full mb-4 mx-auto flex justify-center items-center ${
                    updatingImage && "pointer-events-none"
                  }`}
                >
                  {img ? (
                    <Image
                      alt="User image"
                      src={img}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Avatar
                      name={getUserName(user)}
                      classNames="h-full text-lg"
                    />
                  )}

                  <div className="bg-black/60 group-hover:opacity-[1] opacity-[0] transition-all h-[100%] flex justify-center items-center absolute bottom-0 w-full left-0 z-[3]">
                    <BiSolidPencil size={24} className="text-white" />
                  </div>
                  <input
                    onChange={onImage}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="absolute w-full h-full z-[4]  left-0 top-0 cursor-pointer opacity-0"
                  />
                  {updatingImage && (
                    <div className="flex  justify-center items-center bg-black/70 absolute z-[7] top-0 left-0 h-full w-full">
                      <Spinner color="white" />
                    </div>
                  )}
                </div>
                {user?.profile_pic && (
                  <div>
                    <Button
                      onPress={onRemove}
                      size="sm"
                      variant="flat"
                      color="danger"
                    >
                      Remove Profile Pic
                    </Button>
                  </div>
                )}
              </div>

              <form className="flex flex-col gap-6 mb-4" onSubmit={onUpdate}>
                <Input
                  required
                  isRequired
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  type="text"
                  label="First Name"
                  placeholder="Your first name"
                  labelPlacement="outside"
                />
                <Input
                  required
                  isRequired
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  type="text"
                  label="Last Name"
                  placeholder="Your last name"
                  labelPlacement="outside"
                />

                <div className="flex gap-2">
                  <Button color={"primary"} type="submit" isLoading={updating}>
                    Save
                  </Button>
                  <Button onPress={onClose} type="button" variant="light">
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}
