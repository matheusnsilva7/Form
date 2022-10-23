import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";

import "./Message.css";

const Message = (props) => {
  const [loading, setLoading] = useState(false);
  const timer = useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fragment>
      {createPortal(
        <div className="main-div" onClick={props.onClick}>
          {!loading && <LoadingIndicator />}
          {loading && (
            <div className="container-div">
              <h1 className="message-title">{props.message}</h1>
            </div>
          )}
        </div>,
        document.getElementById("message")
      )}
    </Fragment>
  );
};

export default Message;
