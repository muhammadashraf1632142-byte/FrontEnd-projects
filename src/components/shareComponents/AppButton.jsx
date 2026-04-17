import { Button } from "@heroui/react";
import React from "react";

export default function AppButton(props) {
  return (
    <Button {...props} >
        {props.children}
    </Button>
  );
}
