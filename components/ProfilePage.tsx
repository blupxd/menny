"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Loader2, Save, UploadCloud } from "lucide-react";
import PersonalForm from "./forms/PersonalForm";
import { Button } from "./ui/button";
import { updateUser } from "@/lib/handlers";
import { useSession } from "next-auth/react";

const ProfilePage = ({ userData }: any) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    lastname: "",
    image: "",
  });

  const { update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const saveChanges = async () => {
    setLoading(true); // Start loading
    const changes = await updateUser(
      data.name,
      data.lastname,
      data.email,
      data.image
    );

    // Check if the update was successful
    if (changes === true) {
      await update({
        name: data.name,
        email: data.email,
        image: data.image,
        lastname: data.lastname,
      });
      setLoading(false);
      setTimeout(() => {
        location.replace('/dashboard/profile')
      }, 100);
    
    }
    // If successful, update the local state with the new user data
  };
  useEffect(() => {
    setData({
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      image: userData.image,
    });
  }, [userData, update]);
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="w-24 border-2 border-gray-900 flex items-center justify-center h-24 rounded-2xl relative overflow-hidden">
          {userData.image ? (
            <Image
              src={userData.image}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          ) : (
            <p className="text-5xl text-gray-600">
              {userData.name[0] || "U"}
              {userData.lastname[0] || "N"}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">
            {userData.name} {userData.lastname}
          </h1>
          <p className="text-sm text-gray-700">id: {userData.id}</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:items-end md:justify-between">
        <div className="flex flex-col mt-4">
          <h1 className="text-xl font-semibold">Your profile page</h1>
          <p className="text-sm font-light">
            Update your profile photo and details here
          </p>
        </div>
        <Button
          onClick={saveChanges}
          variant="secondary"
          className="flex items-center max-w-max md:mt-0 mt-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Save changes <Save className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Separator className="my-4" />
      <div className="flex md:flex-row flex-col md:items-center md:space-x-24">
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm text-purple-300">
            Personal data
          </h1>
          <p className="font-light text-xs">
            Change your name, lastname or email
          </p>
        </div>
        <PersonalForm
          setData={(e: any) =>
            setData((prevData: any) => ({
              ...prevData,
              ...e,
            }))
          }
          email={userData.email}
          name={userData.name}
          lastName={userData.lastname}
        />
      </div>
      <Separator className="my-4" />
      <div className="flex md:flex-row flex-col md:items-center md:space-x-24">
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm text-purple-300">
            Profile Image
          </h1>
          <p className="font-light text-xs">
            Change or upload your first profile image (optional)
          </p>
        </div>
        <div className="flex md:flex-row flex-col items-start md:space-x-4">
          <div className="w-16 border-2 border-gray-900 flex items-center justify-center h-16 rounded-2xl relative overflow-hidden">
            {userData.image ? (
              <Image
                src={userData.image}
                alt="Profile picture"
                fill
                className="object-cover"
              />
            ) : (
              <p className="text-3xl text-gray-600">
                {userData.name[0] || "U"}
                {userData.lastname[0] || "N"}
              </p>
            )}
          </div>
          <div className="border py-6 px-12 font-thin items-center rounded-lg flex flex-col">
            <div className="rounded-full mb-2 max-w-max flex items-center justify-center p-2 bg-gray-800">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-xs">
              <span className="font-normal underline hover:cursor-pointer">
                Click to upload
              </span>{" "}
              or drag and drop an image
            </p>
            <p className="text-xs">
              SVG,PNG or JPG(max. 1000x1000, limit 3.5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
