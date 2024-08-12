import { AuthorType } from "@/types";
import React from "react";
import SettingsMenu from "../settings";

type Props = {
  user: AuthorType;
};

function SettingsPage({ user }: Props) {
  return (
    <div>
      <h1 className="heading">Settings</h1>
      <SettingsMenu />
    </div>
  );
}

export default SettingsPage;
