// import { h, Component, ComponentChildren } from 'preact';

// import './modal.scss';

// interface Props {
//     show: boolean;
//     children: ComponentChildren;
// }

// export class Modal extends Component<Props> {
//     constructor(props: Props) {
//         super(props);
//     }

//     render({ show, children }: Props) {
//         return (
//             show && (
//                 <div className="modal">
//                     <div className="modal-background" />
//                     <div className="modal-content">
//                         <div className="box">{children}</div>
//                     </div>
//                 </div>
//             )
//         );
//     }
// }

import React from "react";

import "./modal.scss";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ show, children }) => {
  return show ? (
    <div className="modal">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>
    </div>
  ) : null;
};
