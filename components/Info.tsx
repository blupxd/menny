import React from "react";
import GradientLink from "./GradientLink";

const Info = () => {
  const steps = [
    {
      label: "Create your menu",
      description: "Give your menu a name and start designing it",
    },
    {
      label: "Customise your menu",
      description: "Add your products to your menu",
    },
    {
      label: "Finish your menu",
      description: "Make your final changes to your menu and publish it",
    },
    {
      label: "Get your QR code",
      description:
        "Download and print your menu QR code",
    },
  ];
  return (
    <div className="mt-12 flex flex-col">
      <div className="grid items-center lg:space-y-0 space-y-12 lg:space-x-12 shadow-sm shadow-gray-800 md:grid-cols-2 border-purple-800/20 border px-10 py-12 md:py-24 rounded-xl bg-gradient-to-tr from-purple-950/10 to-cyan-600/10">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold">
            Create Your Menu in No Time
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Quickly build and customize your restaurant or café menu with ease.
            Menny allows you to generate professional menus and QR codes in just
            a few clicks—no technical skills required!
          </p>
          <GradientLink
            className="max-w-max mt-4 py-2 text-sm font-normal"
            href="/about"
          >
            Learn more
          </GradientLink>
        </div>

        <ul className="flex flex-col gap-y-6">
          {steps.map((step, idx) => (
            <li key={idx} className="flex space-x-2">
              <h1 className="text-5xl font-black bg-gradient-to-br from-gray-300 to-purple-300 bg-clip-text text-transparent">{idx + 1}.</h1>
              <div className="flex flex-col">
                <h2 className="text-xl bg-gradient-to-br from-gray-500 to-purple-300 bg-clip-text text-transparent font-semibold">{step.label}</h2>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Info;
