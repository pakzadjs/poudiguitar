"use client";
import { Fragment } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toPersianNumbers, toPersianNumbersWithColon } from "@/utils/toPersianNumbers";

import { BiTimeFive } from "react-icons/bi";

export default function Lessons({ product }) {
  return (
    <Fragment>
      {product?.lessons.map((lesson) => {
        return (
          <Accordion
            key={lesson?._id}
            sx={{ bgcolor: "#113A63", borderRadius: "10px", marginBottom: "5px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: "10px" }}
            >
              <Typography
                sx={{
                  fontFamily: `vazir`,
                  color: "#dcdcdc",
                  paddingX: "8px",
                  fontWeight: "800",
                }}
              >
                {lesson?.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lesson?.body.map((body, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-[#365d85] my-2 p-3 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <span>{toPersianNumbers(i + 1)}-</span>
                      <Typography sx={{ fontFamily: `vazir`, color: "#a9cbef" }}>
                        <div className="max-sm:text-xs">{body?.title}</div>
                      </Typography>
                    </div>

                    <div className="text-[#a9cbef] flex items-center gap-2 max-sm:gap-1">
                      <span className="text-sm max-sm:text-xs max-sm:mr-2">
                        {toPersianNumbersWithColon(body?.duration)} دقیقه
                      </span>
                      <BiTimeFive
                        size={20}
                        className="text-yellow-300 max-sm:w-6 max-sm:h-6"
                      />
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Fragment>
  );
}
