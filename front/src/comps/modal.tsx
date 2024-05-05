import ReactDOM from "react-dom";


export function MyModal() {
    //to create a portal, use the createPortal function:
    return ReactDOM.createPortal(
      <div className="modal">
        <p>This is part of the modal</p>
      </div>,
      document.body
    );
  }