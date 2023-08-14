import TextField from "@/common/TextField";
import { Button } from "@nextui-org/react";

export default function SendOtpForm({ phoneNumber, onChange, onSubmit }) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="لطفا شماره موبایل خود را وارد کنید"
          name="phoneNumber"
          onChange={onChange}
          value={phoneNumber}
        />
        <Button type="submit" color="primary" variant="shadow" className="w-full">
          ارسال کد تایید
        </Button>
      </form>
    </div>
  );
}
