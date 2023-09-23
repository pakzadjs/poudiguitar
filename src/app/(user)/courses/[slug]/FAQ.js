"use client";
import { Fragment } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ({ product }) {
  return (
    <Fragment>
      {product?.FAQ.map((q) => {
        return (
          <Accordion
            key={q?._id}
            sx={{
              bgcolor: "#113A63",
              borderRadius: "10px",
              marginBottom: "5px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ padding: "10px" }}
            >
              <Typography sx={{ fontFamily: `vazir`, color: "#dcdcdc" }}>
                {q?.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontFamily: `vazir`, color: "#a9cbef" }}>
                {q?.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Fragment>
  );
}
