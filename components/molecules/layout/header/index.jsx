"use client";
import React, { useState } from "react";
import Image from "next/image";
// import AdminDropDown from "@/components/ui/adminDropDown";
// import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import Link from "next/link";
import CustomImage from "../../customImage";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import CustomInput from "@/components/atoms/customInput";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrgOpen, setIsOrgOpen] = useState(false);
  return (
    <header className="sticky top-0 bg-white border-b border-borderPrimary">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-4 h-auto lg:h-[5.75rem] py-6 lg:py-0 justify-between">
          <Link href="/">
            <CustomImage
              src="/images/header/alium-logo.svg"
              width={288}
              height={44}
              alt="Alium Logo"
            />
          </Link>
          <div className="flex items-center gap-6 relative">
            {/* Notification Icon  */}

            <button
              type="button"
              className="relative inline-flex items-center text-white"
            >
              <div className="size-7">
                <CustomImage
                  src="/images/header/bell.svg"
                  width={24}
                  height={24}
                  alt="Notification Icon"
                  className="responsive-image-cover"
                />
              </div>
              <span className="absolute -top-2 -right-1 flex items-center justify-center w-[0.875rem] h-[0.875rem] text-[0.625rem] font-bold text-white bg-primary-blue outline outline-2 outline-white p-2 rounded-full">
                2
              </span>
            </button>
            {/* Admin  */}
            <div className="flex items-center gap-4">
              {/* Admin Name  */}
              <div className="text-end">
                <h6 className="font-bold text-black-primary">John Doe</h6>
                <small className="text-sm font-medium text-black-primary opacity-60">
                  Admin
                </small>
              </div>
              {/* Admin Image  */}
              <div className="flex items-center justify-between relative gap-4">
                <CustomImage
                  src="/images/header/user-image.svg"
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="Admin Image"
                />
                <button onClick={() => setIsOpen(true)}>
                  <Icons.DownIcon className={`size-4 transition-all ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {/* profile Menu  */}
              <div className={cn("absolute p-4 bg-white shadow1 border border-borderPrimary rounded-lg top-[70px] right-0 min-w-[17.5rem] min-h-10 overflow-hidden ", isOpen ? "block" : "hidden")}
              >
                <div className="">
                  <button className="flex items-center justify-end ml-auto" onClick={() => setIsOpen(false)}>
                    <Icons.close className="size-6" />
                  </button>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      {/* Profile picture */}
                      <CustomImage
                        src="/images/header/user-image.svg"
                        alt="Profile"
                        width={62}
                        height={62}
                        className="rounded-full w-12 h-12"
                      />
                      <div>
                        <h6 className="font-bold text-black-primary">Neeraj Sharma</h6>
                        <p className="edgecase text-tricorn-black font-medium">
                          johndoe@gmail.com
                        </p>
                        <p className="edgecase text-gray-light font-medium">Admin</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white-smoke rounded-lg px-5 pr-3 py-4 mt-4">
                    {/* Profile options */}
                    <button className="w-full text-left text-tricorn-black font-medium pb-4 border-b border-borderPrimary flex gap-2 items-center">
                      <CustomImage
                        src="/images/header/user.svg"
                        width={20}
                        height={20}
                        alt="user"
                      />
                      Profile
                    </button>

                    {/* Organisation Dropdown */}
                    <div className="mt-4 border-b border-borderPrimary pb-4">
                      <div className="flex items-center justify-between"
                        onClick={() => setIsOrgOpen(!isOrgOpen)}
                      >
                        <div className="flex gap-2">
                          <CustomImage
                            src="/images/header/building.svg"
                            width={20}
                            height={20}
                            alt="building"
                          />
                          <span>Organisation</span>
                        </div>
                        <Icons.DownIcon className={`size-4 transition-all ${isOrgOpen ? "rotate-180" : ""}`} />
                      </div>
                      <div
                        className={`flex flex-col -ml-2 px-4 py-3 rounded-md bg-white text-tricorn-black font-medium space-y-3 mt-3 ${isOrgOpen ? "block" : "hidden"}`}
                      >
                        <CustomInput
                          type="radio"
                          label="Organisation 1"
                          name="paymentMethod"
                          value="online"
                          // onChange={onChange}
                          // checked={formData.paymentMethod === "online"}
                          variant="inputStyle3"
                          containerStyle="flex items-center flex-row-reverse justify-end gap-2"
                          labelStyle
                        />
                        <CustomInput
                          type="radio"
                          label="Organisation 1"
                          name="paymentMethod"
                          value="online"
                          // onChange={onChange}
                          // checked={formData.paymentMethod === "online"}
                          variant="inputStyle3"
                          containerStyle="flex items-center flex-row-reverse justify-end gap-2"
                          labelStyle
                        />
                      </div>
                    </div>
                    {/* Logout */}
                    <div className="mt-4">
                      <button className="w-full text-left text-akabeni font-medium flex items-center gap-2 pl-2">
                        <CustomImage
                          src="/images/header/logout.svg"
                          width={20}
                          height={20}
                          alt="log out image"
                        />
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
