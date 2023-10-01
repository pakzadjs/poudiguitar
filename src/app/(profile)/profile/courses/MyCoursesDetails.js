"use client";

import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import { HiExclamationCircle } from "react-icons/hi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import CopyToClipboard from "@/components/CopyToClipboard";
import { toLocalDateStringShort } from "@/utils/toLocalDate";

export default function MyCoursesDetails({ license, channel, product, createdAt }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <tr>
      <td className="table__td text-lg">{product?.title}</td>

      <td className="table__td">
        <CopyToClipboard copyText={license?.key} title={"کپی لایسنس"} />
      </td>

      <td className="table__td">
        <div>
          <Tooltip
            className="text-slate-900"
            showArrow={true}
            content="راهنمای استفاده از لایسنس"
            placement="bottom"
          >
            <button onClick={onOpen} className="flex items-center gap-1">
              <HiExclamationCircle size={25} />
              <p>اسپات پلیر</p>
            </button>
          </Tooltip>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            scrollBehavior="inside"
            backdrop="blur"
          >
            <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
              {(onClose) => (
                <>
                  <ModalHeader className="text-xl font-extrabold">
                    راهنمای دسترسی به دوره ها
                  </ModalHeader>
                  <ModalBody>
                    <ul className="flex flex-col gap-4">
                      <li>
                        <p className="mb-2">
                          1. بتدا از طریق لینک های زیر برنامه اسپات پلیر را متناسب با سیستم
                          عامل خود دانلود و سپس نصب کنید.
                        </p>

                        <div className="flex items-center gap-2">
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.exe"
                            className="btn__fourth"
                          >
                            نسخه ویندوز
                          </a>

                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.dmg"
                            className="btn__fourth"
                          >
                            نسخه مک
                          </a>

                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://app.spotplayer.ir/assets/bin/spotplayer/setup.apk"
                            className="btn__fourth"
                          >
                            نسخه اندروید
                          </a>
                        </div>
                      </li>

                      <li>
                        2. بعد از نصب نرم افزار، ثبت دوره جدید با علامت + را کلیک کنید و لایسنس
                        خودتون رو وارد کنید.
                      </li>
                      <li>
                        3. کادر کوچک پایینی (location) هم برای تغییر محل ذخیره سازی هست. حتما
                        محل ذخیره سازی تو درایو C نباشه تا بعد تغییر ویندوز لایسنس استفاده بشه.
                        کافیه روی کادر کلیک کنید تا محل ذخیره سازی رو به داریو دیگه تغییر بدین.
                      </li>
                      <li>4. روی تایید کلیک کنید.</li>
                      <li>
                        برای دیدن راهنمای کامل نرم افزار روی{" "}
                        <a
                          href="https://app.spotplayer.ir/player/help/register"
                          target="_blank"
                          className="font-extrabold text-white  bg-blue-500 hover:bg-blue-600 px-2 rounded-lg transition-all duration-250"
                        >
                          لینک
                        </a>{" "}
                        کلیک کنید.
                      </li>
                    </ul>

                    <div className="p-5">
                      <video
                        className="rounded-xl w-full h-full"
                        poster="/images/spotplayer.png"
                        preload="none"
                        controls
                      >
                        <source
                          src={`https://spotplayer.ir/assets/img/index/vid/v1.mp4?a9a3c3756c682e9a72c1cb739866112a`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="font-bold"
                    >
                      بستن
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </td>

      <td className="table__td">
        {channel ? (
          <Link
            href={`https://${channel}`}
            target="_blank rel=noopener"
            className="bg-slate-800/50 py-1 px-2 rounded-lg flex items-center justify-center gap-1"
          >
            <span>کانال دوره</span>
            <TbExternalLink size={20} />
          </Link>
        ) : (
          <span className="py-1 px-2">ندارد</span>
        )}
      </td>

      <td className="table__td">پوریا احمدی</td>

      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>
    </tr>
  );
}
