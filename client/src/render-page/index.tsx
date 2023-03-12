import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../App";
import { Table } from "./table";
import { Form } from "./form";

export function Page({ content, path }: { content: any[], path: string }): any {
  const params = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit('admin-message', { target: 'load', path, params });
  }, [location.pathname, path]);

  useEffect(() => {
    setLoading(false);
  }, [content.length])

  if (loading) {
    return <CircularProgress />
  }

  return content.map((component, id) => {
    if (component.type === 'html') {
      return <div key={id} dangerouslySetInnerHTML={{ __html: component.payload }} />
    }

    if (component.type === 'form') {
      return <Form key={id} config={component.config} />
    }

    if (component.type === 'table') {
      return <Table key={id} config={component.config} />
    }
  })
}