import React, { Children } from "react";

type ChildrenProps = {
  isTrue?: boolean;
};

type Props = {
  children: React.ReactElement<ChildrenProps>[];
};

const Show = (props: Props) => {
  let when: any = null;
  let otherwise: any = null;

  Children.forEach(props.children, (children) => {
    if (children.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children.props.isTrue === true) {
      when = children;
    }
  });

  return when || otherwise;
};

type WhenProps = {
  isTrue: boolean;
  children: React.ReactNode;
};
Show.When = ({ isTrue, children }: WhenProps) => isTrue && children;
Show.Else = ({ children }: { children: React.ReactNode }) => children;

export default Show;
