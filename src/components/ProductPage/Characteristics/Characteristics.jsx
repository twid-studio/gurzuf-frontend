"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useEffect, useRef, useState } from "react";

import "./Characteristics.scss";
import clsx from "clsx";
import { motion } from "framer-motion";
import { sectionScrollAnim } from "@/lib/helpers/sectionScrollAnim";

export default function Characteristics() {
  const [tableOpenned, setTableOpenned] = useState(false);
  const [tableHeight, setTableHeight] = useState(0)

  const { data: allData } = useContext(DataContext);
  const { characteristics: data } = allData;

  const tableRef = useRef();
  const hidenTableRef = useRef();

  const margin = sectionScrollAnim(tableRef);

  // Check if we need to show expand/collapse functionality
  const showExpandButton = data?.table && data.table.length >= 15;
  const visibleRows = showExpandButton ? 12 : data?.table?.length || 0;

  useEffect(() => {
    if (hidenTableRef.current && showExpandButton) {
      // Convert pixel height to vw
      const pixelHeight = hidenTableRef.current.scrollHeight;
      const vwHeight = (pixelHeight / window.innerWidth) * 100;
      setTableHeight(tableOpenned ? vwHeight + 1 : 0);
    }
  }, [tableOpenned, showExpandButton]);

  return (
    <section className="characteristics">
      <div className="characteristics__title-wrapper container">
        <h1 className="characteristics__title">{data?.title}</h1>
        <p className="regular">{data?.text}</p>
      </div>

      <motion.div className="table-wrapper" ref={tableRef}>
        <div className="table">
          <div className="top-table" id="top-table">
            {data?.table.slice(0, visibleRows).map((item, index) => (
              <TableRow item={item} key={index} />
            ))}

            <span className="top-table__anchor" id="top-table-anchor"></span>
          </div>
          {showExpandButton && (
            <>
              <div
                className="table-hiden"
                style={{ height: `${tableHeight}vw` }}
                ref={hidenTableRef}
                id="hiden-table"
              >
                {data?.table.slice(12).map((item, index) => (
                  <TableRow item={item} key={index} />
                ))}
              </div>
              <button 
                className="table__button" 
                onClick={() => setTableOpenned(!tableOpenned)}
                data-scroll-anchor={!tableOpenned ? "#top-table-anchor" : undefined}
              >
                <h3>{tableOpenned ? "Згорнути" :"Розгорнути"}</h3>
                <svg
                  className="arrow"
                  viewBox="0 0 16 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ rotate: tableOpenned ? "180deg" : "0deg" }}
                >
                  <path
                    d="M0.049716 13.0483L1.56676 11.5142L8.00142 17.782L14.4276 11.5142L15.9531 13.0483L8.00142 21L0.049716 13.0483Z"
                    fill="#E3E3E3"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
        {data?.notes.active && (
          <div className="notes container">
            <p>{data?.notes?.title}</p>
            <div className="list">
              {data?.notes?.list.map((note, index) => (
                <div className="list__item" key={index}>
                  <p className="list__item-text">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

const TableRow = ({ item }) => {
  if (item.type === "multiline") {
    return (
      <div className="row multiline-row">
        {item.lines.map((line, index) => (
          <div
            className={clsx("line", {
              "line--title": !line.value,
            })}
            key={index}
          >
            <div className="left">
              <p className="line__title">{line.title}</p>
              {line.subtitle && (
                <p className="line__subtitle small-text shadow">
                  {line.subtitle}
                </p>
              )}
            </div>
            {line.value && (
              <p className="row__value line__value">{line.value}</p>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="left">
          <p>{item.title}</p>
          {item?.subtitle && (
            <p className="row__subtitle small-text shadow">{item.subtitle}</p>
          )}
        </div>
        {item.value && <p className="row__value">{item.value}</p>}
      </div>
    );
  }
};
