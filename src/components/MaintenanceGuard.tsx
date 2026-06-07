import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { MAINTENANCE_PATH, shouldAllowInteraction } from "@/lib/maintenance";

export function MaintenanceGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => navigate({ to: MAINTENANCE_PATH });

    const onClick = (event: MouseEvent) => {
      if (shouldAllowInteraction(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      redirect();
    };

    const onSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      event.stopPropagation();
      redirect();
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, [navigate]);

  return children;
}
