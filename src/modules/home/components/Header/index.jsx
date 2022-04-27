/* eslint-disable react/no-children-prop */
import Container from "../Container";
import Box from "../Box";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Header({ container }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(container);
  });

  const renderContent = () => {
    return content?.map(
      (item) =>
        item.type === "container" && (
          <Container
            key={item.id}
            parentId={item.parentId}
            children={item.items}
          />
        )
    );
  };

  return <>{renderContent()}</>;
}

const mapStateToProps = (state) => ({ container: state.containerReducer });

export default connect(mapStateToProps)(Header);
