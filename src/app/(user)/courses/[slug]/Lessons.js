"use client";
import { Fragment, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Lessons({ product }) {
  return (
    <Fragment>
      {product?.lessons.map((lesson) => {
        return (
          <Accordion
            key={lesson?._id}
            sx={{ bgcolor: "#113A63", color: "white", border: "1px solid #113A63" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: "10px" }}
            >
              <Typography sx={{ fontFamily: `vazir`, color: "#dcdcdc" }}>
                {lesson?.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontFamily: `vazir`, color: "#dcdcdc" }}>
                {lesson?.body}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Fragment>
  );
}
