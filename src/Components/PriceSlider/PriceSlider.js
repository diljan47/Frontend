// PriceSlider.js
import React from "react";
import "rsuite/dist/rsuite-no-reset.min.css";
import { RangeSlider, Row, Col, InputGroup, InputNumber } from "rsuite";

const PriceSlider = ({ priceRange, setPriceRange }) => {
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
      }}
    >
      <Col style={{ width: "100%" }} md={5} xs={5}>
        <RangeSlider
          progress
          value={priceRange}
          onChange={(value) => {
            setPriceRange(value);
          }}
          min={0}
          max={1000}
        />
      </Col>
      <Col style={{ width: "100%" }} md={8} xs={12}>
        <InputGroup>
          <InputNumber
            min={0}
            max={1000}
            value={priceRange[0]}
            onChange={(nextValue) => {
              const [start, end] = priceRange;
              if (nextValue > end) {
                return;
              }
              setPriceRange([nextValue, end]);
            }}
          />
          <InputGroup.Addon>to</InputGroup.Addon>
          <InputNumber
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(nextValue) => {
              const [start, end] = priceRange;
              if (start > nextValue) {
                return;
              }
              setPriceRange([start, nextValue]);
            }}
          />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default PriceSlider;
