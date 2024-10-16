"use client";
import MenuShow from "@/components/MenuShow";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPro, setIsPro] = useState<boolean>(false)// New state for loading
  const params = useParams();
  const fetchPlan = async () => {
    try {
      const res = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(res.ok) {
        const data = await res.json();
        if(data.plan === "premium" || data.plan === "standard") {
          setIsPro(true);
        }
      }
    }
      catch (error: unknown) {
        console.error(error);
    }
  }
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(`/api/menu/${params.menuId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    } catch (error: unknown) {
      console.error(error);
      setShowMenu(false);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
    fetchPlan()
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-16 h-16 text-purple-400 animate-spin"/>
      </div>
    );
  }

  return showMenu ? (
    <MenuShow isPro={isPro}/>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <h1 className="text-2xl text-center">Either this is not your menu or this menu does not exist</h1>
    </div>
  );
};

export default Page;
