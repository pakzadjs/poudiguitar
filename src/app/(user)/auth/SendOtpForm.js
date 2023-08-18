import TextField from "@/common/TextField";
import { Button } from "@nextui-org/react";

export default function SendOTPForm({ onSubmit, isLoading, formik }) {
  return (
    <form className="space-y-10" onSubmit={onSubmit}>
      <TextField
        label="لطفا شماره موبایل خود را وارد کنید"
        name="phoneNumber"
        type={"tel"}
        formik={formik}
      />
      <Button
        type="submit"
        color="primary"
        variant="shadow"
        className="w-full"
        isLoading={isLoading && true}
        isDisabled={!formik.isValid}
      >
        ارسال کد تایید
      </Button>
    </form>
  );
}
