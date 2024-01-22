import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { DefaultComponentProps } from "../../ts/global.interfaces";
import { useMediaQuery } from "react-responsive";
import React, { ReactElement } from "react";

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  className,
  children,
  texto,
  placement,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  if (isTabletOrMobile) return <div className={className}>{children}</div>;

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      rootClose
      overlay={<Tooltip className="position-fixed">{texto}</Tooltip>}
    >
      <div className={className}>{children}</div>
    </OverlayTrigger>
  );
};

interface CustomTooltipProps extends DefaultComponentProps {
  children: ReactElement;
  texto: string;
  placement?: "top" | "bottom" | "right" | "left";
}
