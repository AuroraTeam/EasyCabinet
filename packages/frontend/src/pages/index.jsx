import { useNavigate } from "@solidjs/router";
import { isAuthed, isLoaded } from "../api";
import { createEffect } from "solid-js";

export default function Index() {
  const navigate = useNavigate();

  createEffect(() => {
    if (!isLoaded()) {
      return;
    }

    if (!isAuthed()) {
      navigate("/login", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  });

  return <>Loading...</>;
}
