import { useSelector } from "react-redux";
import Container from "../src/modules/home/components/Container";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBuildModelFromJson } from "../src/utils/buildModel";
import { useJsonModelFromModel } from "../src/utils/buildJson";

export default function BoxContainersfromId() {
  const router = useRouter();
  const { slug } = router.query;
  const state = useSelector((state) => state.containerReducer);
  const [content, setContent] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`api/${slug}`);
      const result = await response.data;
      setData(result);
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  useJsonModelFromModel(data);
  useBuildModelFromJson(data[0], 0);

  useEffect(() => {
    setContent(state);
  });

  return (
    content.length > 0 &&
    content.map(
      (item) =>
        item.type === "container" && (
          <Container
            key={item.id}
            parentId={item.parentId}
            // eslint-disable-next-line react/no-children-prop
            children={item.items}
          />
        )
    )
  );
}
