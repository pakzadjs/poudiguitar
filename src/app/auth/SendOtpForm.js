import TextField from "@/common/TextField";
import { Button } from "@nextui-org/react";

export default function SendOtpForm({ phoneNumber, onChange, onSubmit, isLoading }) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="لطفا شماره موبایل خود را وارد کنید"
          name="phoneNumber"
          onChange={onChange}
          value={phoneNumber}
          type={"tel"}
        />
        <Button
          type="submit"
          color="primary"
          variant="shadow"
          className="w-full"
          isLoading={isLoading && true}
        >
          ارسال کد تایید
        </Button>
      </form>
    </div>
  );
}
