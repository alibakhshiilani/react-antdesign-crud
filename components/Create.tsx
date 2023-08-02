import Form, { useForm } from "antd/es/form/Form";
import { ICrudCreate } from "..";

const Create = (props: ICrudCreate) => {
  const { onFinish, children } = props;
  const form = useForm();
  return (
    <Form name="basic" onFinish={onFinish} autoComplete="on">
      {children}
    </Form>
  );
};

export default Create;
